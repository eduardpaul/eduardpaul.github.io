/**
 * VGGish mel-spectrogram in pure JavaScript.
 *
 * Matches Apple's soundAnalysisPreprocessing(vggish) pipeline:
 *   16 kHz mono → 512-pt FFT, 25 ms window (400 samples), 10 ms hop (160 samples)
 *   64 mel bins, 125–7 500 Hz, log₁₀ compression, 96 frames per segment.
 *
 * Output tensor shape: Float32Array of length 96 × 64 (row-major, time × mel_bin).
 * Feed to ONNX model as (1, 1, 96, 64).
 */

const VGGISH = {
  SR:       16000,
  N_FFT:    512,
  WIN_LEN:  400,    // 25 ms
  HOP_LEN:  160,    // 10 ms
  N_MELS:   64,
  FMIN:     125.0,
  FMAX:     7500.0,
  N_FRAMES: 96,
};

// ── Hann window (length WIN_LEN, zero-padded to N_FFT) ───────────────────────
const _hannWindow = (() => {
  const w = new Float32Array(VGGISH.N_FFT);
  const half = (VGGISH.WIN_LEN - 1) / 2;
  const pad  = (VGGISH.N_FFT - VGGISH.WIN_LEN) >> 1;   // 56
  for (let i = 0; i < VGGISH.WIN_LEN; i++) {
    w[pad + i] = 0.5 * (1 - Math.cos(2 * Math.PI * i / (VGGISH.WIN_LEN - 1)));
  }
  return w;
})();

// ── Mel filterbank  (N_MELS × (N_FFT/2+1)) ───────────────────────────────────
const _melFilterbank = (() => {
  const hzToMel = hz => 2595 * Math.log10(1 + hz / 700);
  const melToHz = m  => 700 * (10 ** (m / 2595) - 1);

  const nFreqs  = VGGISH.N_FFT / 2 + 1;          // 257
  const melMin  = hzToMel(VGGISH.FMIN);
  const melMax  = hzToMel(VGGISH.FMAX);

  // N_MELS + 2 equally spaced mel breakpoints
  const melPts = new Float32Array(VGGISH.N_MELS + 2);
  for (let i = 0; i <= VGGISH.N_MELS + 1; i++) {
    melPts[i] = melMin + (melMax - melMin) * i / (VGGISH.N_MELS + 1);
  }

  // Convert to FFT bin indices
  const bins = new Int32Array(VGGISH.N_MELS + 2);
  for (let i = 0; i <= VGGISH.N_MELS + 1; i++) {
    bins[i] = Math.floor((VGGISH.N_FFT + 1) * melToHz(melPts[i]) / VGGISH.SR);
  }

  // Build triangular filters stored flat: fb[m * nFreqs + k]
  const fb = new Float32Array((VGGISH.N_MELS) * nFreqs);
  for (let m = 0; m < VGGISH.N_MELS; m++) {
    const lo = bins[m], ctr = bins[m + 1], hi = bins[m + 2];
    const offset = m * nFreqs;
    for (let k = lo; k < ctr; k++) {
      if (k >= 0 && k < nFreqs && ctr > lo)
        fb[offset + k] = (k - lo) / (ctr - lo);
    }
    for (let k = ctr; k <= hi; k++) {
      if (k >= 0 && k < nFreqs && hi > ctr)
        fb[offset + k] = (hi - k) / (hi - ctr);
    }
  }
  return fb;
})();

// ── Cooley–Tukey radix-2 FFT (in-place) ──────────────────────────────────────
function _fftInPlace(re, im) {
  const n = re.length;

  // Bit-reversal permutation
  let j = 0;
  for (let i = 1; i < n; i++) {
    let bit = n >> 1;
    while (j & bit) { j ^= bit; bit >>= 1; }
    j ^= bit;
    if (i < j) {
      let t = re[i]; re[i] = re[j]; re[j] = t;
          t = im[i]; im[i] = im[j]; im[j] = t;
    }
  }

  // Butterfly stages
  for (let len = 2; len <= n; len <<= 1) {
    const theta  = -2 * Math.PI / len;
    const baseRe = Math.cos(theta);
    const baseIm = Math.sin(theta);
    const half   = len >> 1;
    for (let i = 0; i < n; i += len) {
      let wRe = 1, wIm = 0;
      for (let k = 0; k < half; k++) {
        const u = i + k, v = u + half;
        const vRe = re[v] * wRe - im[v] * wIm;
        const vIm = re[v] * wIm + im[v] * wRe;
        re[v] = re[u] - vRe;  im[v] = im[u] - vIm;
        re[u] += vRe;          im[u] += vIm;
        const nRe = wRe * baseRe - wIm * baseIm;
        wIm      = wRe * baseIm + wIm * baseRe;
        wRe      = nRe;
      }
    }
  }
}

// Reusable FFT buffers (avoid GC pressure during inference)
const _re = new Float32Array(VGGISH.N_FFT);
const _im = new Float32Array(VGGISH.N_FFT);

/**
 * Compute VGGish mel spectrogram from a 16 kHz mono Float32Array.
 *
 * @param {Float32Array} pcm16k  - mono audio at 16 000 Hz
 * @returns {Float32Array}       - shape (N_FRAMES × N_MELS) = (96 × 64), log₁₀ values
 */
function computeMelSpectrogram(pcm16k) {
  const { N_FFT, WIN_LEN, HOP_LEN, N_MELS, N_FRAMES } = VGGISH;
  const nFreqs  = N_FFT / 2 + 1;   // 257
  const padLen  = N_FFT >> 1;       // 256 — librosa center padding

  // Reflect-pad signal (mirrors librosa pad_mode='reflect')
  const padded  = new Float32Array(pcm16k.length + 2 * padLen);
  for (let i = 0; i < padLen; i++) {
    padded[padLen - 1 - i] = pcm16k[i] || 0;           // left reflect
  }
  padded.set(pcm16k, padLen);
  for (let i = 0; i < padLen; i++) {
    const src = pcm16k.length - 1 - i;
    padded[padLen + pcm16k.length + i] = src >= 0 ? pcm16k[src] : 0; // right reflect
  }

  const nTotal  = Math.max(0, Math.floor((padded.length - N_FFT) / HOP_LEN) + 1);
  const nFrames = Math.min(nTotal, N_FRAMES);

  const out = new Float32Array(N_FRAMES * N_MELS);   // default 0 → log10(1e-10) ≈ -10

  for (let t = 0; t < nFrames; t++) {
    const start = t * HOP_LEN;

    // Windowed frame
    _re.fill(0); _im.fill(0);
    for (let i = 0; i < N_FFT; i++) {
      const s = start + i;
      _re[i] = (s < padded.length ? padded[s] : 0) * _hannWindow[i];
    }

    _fftInPlace(_re, _im);

    // Power spectrum → mel filterbank → log10
    const base = t * N_MELS;
    for (let m = 0; m < N_MELS; m++) {
      const fbOffset = m * nFreqs;
      let energy = 0;
      for (let k = 0; k < nFreqs; k++) {
        energy += _melFilterbank[fbOffset + k] * (_re[k] * _re[k] + _im[k] * _im[k]);
      }
      out[base + m] = Math.log10(Math.max(energy, 1e-10));
    }
  }

  // Pad remaining frames with floor value (-10 ≈ log10(1e-10))
  for (let t = nFrames; t < N_FRAMES; t++) {
    const base = t * N_MELS;
    for (let m = 0; m < N_MELS; m++) out[base + m] = -10;
  }

  return out;
}

/**
 * Resample audio from any sample rate to 16 kHz using an OfflineAudioContext.
 * @param {Float32Array} pcm    - input samples
 * @param {number}       srcSR  - source sample rate
 * @returns {Promise<Float32Array>} - 16 kHz mono samples
 */
async function resampleTo16k(pcm, srcSR) {
  if (srcSR === 16000) return pcm;

  const targetLen  = Math.round(pcm.length * 16000 / srcSR);
  const offCtx     = new OfflineAudioContext(1, targetLen, 16000);
  const buf        = offCtx.createBuffer(1, pcm.length, srcSR);
  buf.copyToChannel(pcm, 0);

  const src = offCtx.createBufferSource();
  src.buffer = buf;
  src.connect(offCtx.destination);
  src.start();

  const rendered = await offCtx.startRendering();
  return rendered.getChannelData(0);
}
