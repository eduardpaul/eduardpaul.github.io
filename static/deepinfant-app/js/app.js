/**
 * DeepInfant Web Demo — main application.
 *
 * Flow:
 *  1. Load ONNX model via ONNX Runtime Web.
 *  2. User presses "Record": capture mic at native SR, resample to 16 kHz.
 *  3. Compute VGGish mel spectrogram (mel.js).
 *  4. Run ONNX inference → class probabilities.
 *  5. Render results.
 */

'use strict';

// ── Labels & emoji ─────────────────────────────────────────────────────────────
const LABELS = [
  { key: 'belly_pain',  label: 'Belly Pain',  emoji: '🤢' },
  { key: 'burping',     label: 'Needs Burping', emoji: '💨' },
  { key: 'cold_hot',   label: 'Cold / Hot',   emoji: '🌡️' },
  { key: 'discomfort', label: 'Discomfort',   emoji: '😣' },
  { key: 'hungry',     label: 'Hungry',       emoji: '🍼' },
  { key: 'lonely',     label: 'Lonely',       emoji: '🫂' },
  { key: 'scared',     label: 'Scared',       emoji: '😨' },
  { key: 'tired',      label: 'Tired',        emoji: '😴' },
  { key: 'unknown',    label: 'Unknown',      emoji: '❓' },
];

const MODEL_PATH    = 'model/DeepInfant_V2.onnx';
const RECORD_MS     = 3000;   // capture 3 seconds of audio per prediction
const TARGET_SR     = 16000;
const VGGISH_FRAMES = 96;
const VGGISH_MELS   = 64;

// ── State ──────────────────────────────────────────────────────────────────────
let ortSession   = null;
let isRecording  = false;
let mediaRecorder = null;
let animFrame    = null;
let analyserNode = null;
let audioCtx     = null;
let stream       = null;
let autoMode     = false;
let autoTimeout  = null;

// ── DOM refs ───────────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const statusEl     = $('status');
const btnRecord    = $('btn-record');
const btnAuto      = $('btn-auto');
const btnFile      = $('btn-file');
const fileInput    = $('file-input');
const waveCanvas   = $('waveform');
const waveCtx      = waveCanvas.getContext('2d');
const melCanvas    = $('mel-canvas');
const melCtx       = melCanvas.getContext('2d');
const modelBadge   = $('model-badge');
const topPickEl    = $('top-pick');
const topEmojiEl   = $('top-pick-emoji');
const topLabelEl   = $('top-pick-label');
const topConfEl    = $('top-pick-conf');
const altSectionEl = $('alt-section');
const altChipsEl   = $('alt-chips');

// ── Utilities ─────────────────────────────────────────────────────────────────
function setStatus(msg, type = 'info') {
  statusEl.textContent = msg;
  statusEl.className = 'status status-' + type;
}

function softmax(logits) {
  const max = Math.max(...logits);
  const exp = logits.map(x => Math.exp(x - max));
  const sum = exp.reduce((a, b) => a + b, 0);
  return exp.map(x => x / sum);
}

// ── ONNX model loading ────────────────────────────────────────────────────────
async function loadModel() {
  setStatus('Loading model…', 'info');
  modelBadge.textContent = 'Loading…';
  try {
    ort.env.wasm.wasmPaths = 'runtime/';
    // Explicitly list every WASM variant so the runtime never guesses a wrong path.
    // Without this, when SharedArrayBuffer is available (COOP/COEP headers) the
    // runtime picks ort-wasm-simd-threaded.wasm first; if that file is missing
    // it aborts with "both async and sync fetching of the wasm failed".
    ort.env.wasm.wasmPaths = {
      'ort-wasm.wasm':                'runtime/ort-wasm.wasm',
      'ort-wasm-simd.wasm':           'runtime/ort-wasm-simd.wasm',
      'ort-wasm-threaded.wasm':       'runtime/ort-wasm-threaded.wasm',
      'ort-wasm-simd-threaded.wasm':  'runtime/ort-wasm-simd-threaded.wasm',
    };
    ortSession = await ort.InferenceSession.create(MODEL_PATH, {
      executionProviders: ['wasm'],
      graphOptimizationLevel: 'all',
    });
    modelBadge.textContent = 'DeepInfant V2 ✓';
    modelBadge.classList.add('loaded');
    setStatus('Model ready. Press Record to start.', 'ok');
    btnRecord.disabled = false;
    btnAuto.disabled   = false;
    btnFile.disabled   = false;
  } catch (err) {
    modelBadge.textContent = 'Load failed';
    setStatus('Model failed to load: ' + err.message, 'error');
    console.error(err);
  }
}

// ── Waveform visualizer ───────────────────────────────────────────────────────
function startVisualizer(analyser) {
  const bufferLen  = analyser.frequencyBinCount;
  const dataArray  = new Uint8Array(bufferLen);

  function draw() {
    animFrame = requestAnimationFrame(draw);
    analyser.getByteTimeDomainData(dataArray);

    const w = waveCanvas.width, h = waveCanvas.height;
    waveCtx.clearRect(0, 0, w, h);
    waveCtx.fillStyle = '#0f172a';
    waveCtx.fillRect(0, 0, w, h);

    waveCtx.lineWidth   = 2;
    waveCtx.strokeStyle = '#38bdf8';
    waveCtx.beginPath();

    const sliceW = w / bufferLen;
    let x = 0;
    for (let i = 0; i < bufferLen; i++) {
      const v = dataArray[i] / 128.0;
      const y = (v * h) / 2;
      i === 0 ? waveCtx.moveTo(x, y) : waveCtx.lineTo(x, y);
      x += sliceW;
    }
    waveCtx.lineTo(w, h / 2);
    waveCtx.stroke();
  }
  draw();
}

function stopVisualizer() {
  if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }
  const w = waveCanvas.width, h = waveCanvas.height;
  waveCtx.clearRect(0, 0, w, h);
  waveCtx.fillStyle = '#0f172a';
  waveCtx.fillRect(0, 0, w, h);
  waveCtx.strokeStyle = '#1e293b';
  waveCtx.lineWidth = 1;
  waveCtx.beginPath();
  waveCtx.moveTo(0, h / 2);
  waveCtx.lineTo(w, h / 2);
  waveCtx.stroke();
}

// ── Mel spectrogram canvas ───────────────────────────────────────────────────
function drawMelCanvas(melData) {
  // melData: Float32Array (96 × 64), values are log10 (~-10 to 0)
  const W = melCanvas.width, H = melCanvas.height;
  const imgData = melCtx.createImageData(W, H);

  const tW = VGGISH_FRAMES, tH = VGGISH_MELS;
  const minV = -10, maxV = 0;

  for (let py = 0; py < H; py++) {
    for (let px = 0; px < W; px++) {
      const t = Math.floor(px * tW / W);
      const m = tH - 1 - Math.floor(py * tH / H);   // flip: low freq at bottom
      const val = melData[t * tH + m];
      const norm = Math.max(0, Math.min(1, (val - minV) / (maxV - minV)));

      // Inferno-like colormap: dark purple → orange → yellow
      const r = Math.round(norm < 0.5 ? norm * 2 * 200 : 200 + (norm - 0.5) * 2 * 55);
      const g = Math.round(norm < 0.5 ? norm * 2 * 50  : 50  + (norm - 0.5) * 2 * 205);
      const b = Math.round(norm < 0.5 ? 120 - norm * 2 * 120 : 0);

      const idx = (py * W + px) * 4;
      imgData.data[idx]   = r;
      imgData.data[idx+1] = g;
      imgData.data[idx+2] = b;
      imgData.data[idx+3] = 255;
    }
  }
  melCtx.putImageData(imgData, 0, 0);
}

// ── Inference ─────────────────────────────────────────────────────────────────
async function runInference(pcmFloat32, srcSR) {
  setStatus('Resampling…', 'info');
  const pcm16k = await resampleTo16k(pcmFloat32, srcSR);

  setStatus('Computing mel spectrogram…', 'info');
  const mel = computeMelSpectrogram(pcm16k);   // Float32Array (96 × 64)
  drawMelCanvas(mel);

  setStatus('Running inference…', 'info');

  // Build ONNX tensor: (1, 1, 96, 64)
  const tensor = new ort.Tensor('float32', mel, [1, 1, VGGISH_FRAMES, VGGISH_MELS]);
  const feeds  = { mel_spectrogram: tensor };
  const result = await ortSession.run(feeds);
  const logits = Array.from(result.logits.data);
  const probs  = softmax(logits);

  displayResults(probs);
  setStatus('Done! Press Record for another prediction.', 'ok');
}

// ── Results display ───────────────────────────────────────────────────────────
function displayResults(probs) {
  const sorted = LABELS.map((l, i) => ({ ...l, prob: probs[i] }))
                       .sort((a, b) => b.prob - a.prob);

  // ── Hero: top pick ───────────────────────────────────────────────────────────
  const top = sorted[0];
  topPickEl.classList.remove('empty');
  topEmojiEl.textContent = top.emoji;
  topLabelEl.textContent = top.label;
  topConfEl.textContent  = (top.prob * 100).toFixed(1) + '%';

  // ── Alternatives: next 3 as tooltip chips ───────────────────────────────────
  altChipsEl.innerHTML = sorted.slice(1, 4).map(item => {
    const pct = (item.prob * 100).toFixed(1) + '%';
    return `<button class="alt-chip" data-tooltip="${pct}"
                    role="listitem"
                    aria-label="${item.label} — ${pct}">
              <span class="alt-chip-emoji" aria-hidden="true">${item.emoji}</span>
              <span class="alt-chip-label">${item.label}</span>
            </button>`;
  }).join('');

  altSectionEl.hidden = false;
}

// ── Recording ─────────────────────────────────────────────────────────────────
async function startRecording() {
  if (isRecording) return;

  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  } catch (err) {
    setStatus('Microphone access denied: ' + err.message, 'error');
    return;
  }

  // Waveform visualizer
  audioCtx    = new AudioContext();
  analyserNode = audioCtx.createAnalyser();
  analyserNode.fftSize = 1024;
  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyserNode);
  startVisualizer(analyserNode);

  // Record audio chunks
  const chunks = [];
  mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = e => { if (e.data.size > 0) chunks.push(e.data); };

  mediaRecorder.onstop = async () => {
    stopVisualizer();
    stream.getTracks().forEach(t => t.stop());

    // Decode via AudioContext
    const blob    = new Blob(chunks, { type: mediaRecorder.mimeType });
    const arrBuf  = await blob.arrayBuffer();
    const decoded = await audioCtx.decodeAudioData(arrBuf);
    await audioCtx.close();

    // Mix to mono
    const mono = decoded.numberOfChannels > 1
      ? (() => {
          const L = decoded.getChannelData(0), R = decoded.getChannelData(1);
          return L.map((v, i) => (v + R[i]) * 0.5);
        })()
      : decoded.getChannelData(0);

    await runInference(mono, decoded.sampleRate);

    isRecording = false;
    btnRecord.textContent = '⏺ Record';
    btnRecord.classList.remove('recording');
    if (autoMode) scheduleNextCapture();
  };

  isRecording = true;
  btnRecord.textContent  = '⏹ Recording…';
  btnRecord.classList.add('recording');

  const remaining = (RECORD_MS / 1000).toFixed(0);
  setStatus(`Recording for ${remaining}s… keep the mic near the baby`, 'recording');

  mediaRecorder.start();

  // Countdown label
  let elapsed = 0;
  const timer = setInterval(() => {
    elapsed += 500;
    const left = ((RECORD_MS - elapsed) / 1000).toFixed(1);
    if (left > 0)
      setStatus(`Recording… ${left}s remaining`, 'recording');
  }, 500);

  setTimeout(() => {
    clearInterval(timer);
    if (mediaRecorder.state !== 'inactive') mediaRecorder.stop();
  }, RECORD_MS);
}

// ── Auto-loop mode ─────────────────────────────────────────────────────────────
function scheduleNextCapture() {
  autoTimeout = setTimeout(() => {
    if (autoMode) startRecording();
  }, 500);
}

function toggleAutoMode() {
  autoMode = !autoMode;
  if (autoMode) {
    btnAuto.textContent = '⏸ Stop Auto';
    btnAuto.classList.add('active');
    setStatus('Auto mode: continuously predicting…', 'ok');
    startRecording();
  } else {
    clearTimeout(autoTimeout);
    btnAuto.textContent = '🔄 Auto Mode';
    btnAuto.classList.remove('active');
    if (mediaRecorder && mediaRecorder.state !== 'inactive') mediaRecorder.stop();
  }
}

// ── File upload ───────────────────────────────────────────────────────────────
async function handleFileUpload(file) {
  if (!file) return;
  setStatus(`Processing ${file.name}…`, 'info');
  stopVisualizer();

  try {
    const arrBuf  = await file.arrayBuffer();
    const tmpCtx  = new AudioContext();
    const decoded = await tmpCtx.decodeAudioData(arrBuf);

    const mono = decoded.numberOfChannels > 1
      ? (() => {
          const L = decoded.getChannelData(0), R = decoded.getChannelData(1);
          return L.map((v, i) => (v + R[i]) * 0.5);
        })()
      : decoded.getChannelData(0);

    await tmpCtx.close();
    await runInference(mono, decoded.sampleRate);
  } catch (err) {
    setStatus('Could not decode audio file: ' + err.message, 'error');
  }
}

// ── Event wiring ──────────────────────────────────────────────────────────────
btnRecord.addEventListener('click', () => {
  if (!isRecording) startRecording();
});

btnAuto.addEventListener('click', toggleAutoMode);

btnFile.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', () => handleFileUpload(fileInput.files[0]));

// ── Tooltip: tap-to-toggle on touch devices ───────────────────────────────────
document.addEventListener('click', e => {
  const chip = e.target.closest('.alt-chip');
  document.querySelectorAll('.alt-chip.tooltip-open').forEach(el => {
    if (el !== chip) el.classList.remove('tooltip-open');
  });
  if (chip) chip.classList.toggle('tooltip-open');
});

// Resize canvas to actual display size
function resizeCanvases() {
  const dpr = window.devicePixelRatio || 1;
  [waveCanvas, melCanvas].forEach(c => {
    const rect = c.getBoundingClientRect();
    c.width  = rect.width  * dpr;
    c.height = rect.height * dpr;
    c.getContext('2d').scale(dpr, dpr);
  });
  stopVisualizer();
}
window.addEventListener('resize', resizeCanvases);

// ── Init ──────────────────────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  resizeCanvases();
  loadModel();
});
