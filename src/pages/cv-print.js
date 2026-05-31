import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Seo from '../components/seo';

const LANG_NAMES = { EN: 'English', ES: 'Spanish', RU: 'Russian' };

const formatDate = (d) => {
  if (!d) return 'Present';
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
};

// Render a markdown bullet-list string as <ul>/<li> JSX.
// Bold (**text**) is preserved via dangerouslySetInnerHTML (data is internal, not user input).
const BulletList = ({ text, tight = false, fontSize = '11px' }) => {
  const items = text
    .split('\n')
    .filter(l => l.trim().startsWith('- '))
    .map(l => l.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'));
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
      {items.map((html, i) => (
        <li key={i} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', marginBottom: tight ? '1px' : '4px' }}>
          <span style={{ color: '#2563eb', flexShrink: 0, marginTop: '1px', fontSize: '9px' }}>▪</span>
          <span style={{ fontSize, lineHeight: '1.35', color: '#334155' }} dangerouslySetInnerHTML={{ __html: html }} />
        </li>
      ))}
    </ul>
  );
};

const SectionTitle = ({ children }) => (
  <h2 style={{
    fontSize: '9px',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: '#1a2e4a',
    borderBottom: '2px solid #2563eb',
    paddingBottom: '4px',
    marginBottom: '10px',
    marginTop: 0,
  }}>
    {children}
  </h2>
);

const SidebarSection = ({ title, children }) => (
  <div style={{ marginBottom: '16px' }}>
    <h3 style={{
      fontSize: '8px',
      fontWeight: '800',
      textTransform: 'uppercase',
      letterSpacing: '0.12em',
      color: '#1a2e4a',
      borderBottom: '2px solid #2563eb',
      paddingBottom: '3px',
      marginBottom: '8px',
      marginTop: 0,
    }}>
      {title}
    </h3>
    {children}
  </div>
);

const RoleBlock = ({ job, role, continued = false }) => (
  <div style={{ marginBottom: '14px', pageBreakInside: 'avoid', breakInside: 'avoid' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3px' }}>
      <div>
        <p style={{ margin: 0, fontSize: '12px', fontWeight: '700', color: '#0f172a' }}>{role.name}</p>
        <p style={{ margin: 0, fontSize: '11px', fontWeight: '600', color: '#2563eb' }}>{job.organization.name}</p>
      </div>
      <span style={{ fontSize: '10px', color: '#64748b', whiteSpace: 'nowrap', marginLeft: '8px', paddingTop: '2px' }}>
        {formatDate(role.startDate)} – {formatDate(role.finishDate)}
      </span>
    </div>
    {role.challenges.map((ch, ci) => (
      <BulletList key={ci} text={ch.description} />
    ))}
  </div>
);

const CvPrintPage = () => {
  const { cvJson } = useStaticQuery(graphql`
    query CvPrintQuery {
      cvJson {
        aboutMe {
          profile {
            name
            surnames
            title
            description
            location { municipality country }
          }
          interestingFacts { topic fact }
          relevantLinks { type URL }
        }
        experience {
          jobs {
            organization { name }
            roles {
              name
              startDate
              finishDate
              challenges { description }
            }
          }
          publicArtifacts {
            details { name description URL }
            publishingDate
          }
        }
        knowledge {
          languages { name fullName level }
          hardSkills { skill { name } }
          softSkills { skill { name } }
          studies {
            studyType
            name
            startDate
            finishDate
            institution { name URL }
          }
        }
      }
    }
  `);

  const { aboutMe, experience, knowledge } = cvJson;
  const { profile, interestingFacts, relevantLinks } = aboutMe;
  const { jobs, publicArtifacts } = experience;
  const { languages, hardSkills, softSkills, studies } = knowledge;

  const certifications = [...studies]
    .filter(s => s.studyType === 'certification')
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  const sortedFacts = [...interestingFacts].sort((a, b) => a.fact.length - b.fact.length);

  const formalEducation = studies.filter(s => s.studyType === 'officialDegree');

  const linkedin = relevantLinks.find(l => l.type === 'linkedin')?.URL;
  const github = relevantLinks.find(l => l.type === 'github')?.URL;
  const website = relevantLinks.find(l => l.type === 'other')?.URL;

  // Page 1 shows 2 most recent roles, page 2 gets the rest
  const recentJobs = jobs.slice(0, 2);
  const olderJobs = jobs.slice(2);

  const descriptionParagraphs = profile.description.split('\n\n').filter(Boolean);

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const s = {
    page: {
      fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
      color: '#1e293b',
      background: 'white',
      maxWidth: '794px',
      margin: '0 auto',
    },
  };

  return (
    <>
      <style>{`
        @page { size: A4 portrait; margin: 0; }
        @media print {
          html, body { background: white !important; margin: 0 !important; padding: 0 !important; }
          .no-print { display: none !important; }
          .cv-root { background: white !important; padding: 0 !important; }
          .cv-paper { box-shadow: none !important; margin: 0 !important; max-width: 100% !important; }
          .cv-two-col { min-height: 0 !important; }
          .cv-page-break { page-break-before: always; break-before: page; }
          strong { font-weight: 700 !important; }
        }
        @media screen {
          .cv-root { background: #e2e8f0; padding: 32px 16px 64px; min-height: 100vh; }
        }
        strong { font-weight: 600; }
        .cv-paper * { box-sizing: border-box; }
      `}</style>

      {/* Screen-only toolbar */}
      <div className="no-print" style={{
        position: 'fixed', top: '16px', right: '16px', zIndex: 100,
        display: 'flex', gap: '8px',
      }}>
        <button
          onClick={handlePrint}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: '#1a2e4a', color: 'white',
            border: 'none', borderRadius: '8px',
            padding: '10px 18px', cursor: 'pointer',
            fontSize: '13px', fontWeight: '600',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"/>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
            <rect x="6" y="14" width="12" height="8"/>
          </svg>
          Print / Save PDF
        </button>
        <a
          href="/about"
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'white', color: '#374151',
            border: '1px solid #d1d5db', borderRadius: '8px',
            padding: '10px 16px', textDecoration: 'none',
            fontSize: '13px', fontWeight: '600',
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
          }}
        >
          ← Back
        </a>
      </div>

      <div className="cv-root">
        <div className="cv-paper" style={{ ...s.page, boxShadow: '0 8px 40px rgba(0,0,0,0.15)' }}>

          {/* ══════════════════════════  PAGE 1  ══════════════════════════ */}

          {/* Header band */}
          <header style={{
            background: 'linear-gradient(135deg, #1a2e4a 0%, #1e3f6f 100%)',
            padding: '32px 40px 28px',
            color: 'white',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: '26px', fontWeight: '800', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                  {profile.name} <span style={{ fontWeight: '300' }}>{profile.surnames}</span>
                </h1>
                <p style={{ margin: '6px 0 0', fontSize: '13.5px', fontWeight: '500', color: '#93c5fd', lineHeight: 1.3 }}>
                  {profile.title}
                </p>
                <p style={{ margin: '5px 0 0', fontSize: '11px', color: '#94a3b8' }}>
                  {profile.location?.municipality}, Spain
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end', flexShrink: 0 }}>
                {linkedin && (
                  <span style={{ fontSize: '10.5px', color: '#cbd5e1' }}>
                    <span style={{ color: '#60a5fa', marginRight: '4px', fontWeight: '600' }}>LinkedIn</span>
                    {linkedin.replace('https://', '')}
                  </span>
                )}
                {github && (
                  <span style={{ fontSize: '10.5px', color: '#cbd5e1' }}>
                    <span style={{ color: '#60a5fa', marginRight: '4px', fontWeight: '600' }}>GitHub</span>
                    {github.replace('https://', '')}
                  </span>
                )}
                {website && (
                  <span style={{ fontSize: '10.5px', color: '#cbd5e1' }}>
                    <span style={{ color: '#60a5fa', marginRight: '4px', fontWeight: '600' }}>Web</span>
                    {website.replace('https://', '')}
                  </span>
                )}
              </div>
            </div>

            {/* Inline skill pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '16px' }}>
              {hardSkills.map((hs, i) => (
                <span key={i} style={{
                  fontSize: '10px', fontWeight: '600',
                  background: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#e2e8f0',
                  borderRadius: '20px', padding: '2px 9px',
                }}>
                  {hs.skill.name}
                </span>
              ))}
            </div>
          </header>

          {/* Two-column body */}
          <div className="cv-two-col" style={{ display: 'flex', minHeight: '970px' }}>

            {/* ── Sidebar ── */}
            <aside style={{
              width: '210px', minWidth: '210px',
              background: '#f8fafc',
              borderRight: '1px solid #e2e8f0',
              padding: '22px 18px',
            }}>

              <SidebarSection title="Languages">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {languages.map((lang, i) => {
                    const profShort = lang.level.replace(' proficiency', '').replace('or bilingual', '/ bilingual');
                    return (
                      <div key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                          <span style={{ fontSize: '11px', fontWeight: '700', color: '#0f172a' }}>
                            {LANG_NAMES[lang.name] || lang.fullName}
                          </span>
                          <span style={{ fontSize: '9px', color: '#64748b' }}>
                            {lang.name === 'ES' ? 'Native' : lang.name === 'EN' ? 'Fluent' : 'Fluent'}
                          </span>
                        </div>
                        <div style={{ height: '4px', background: '#e2e8f0', borderRadius: '2px', marginTop: '3px' }}>
                          <div style={{
                            height: '100%', borderRadius: '2px', background: '#2563eb',
                            width: lang.name === 'ES' ? '100%' : '90%',
                          }} />
                        </div>
                        <p style={{ margin: '2px 0 0', fontSize: '9px', color: '#94a3b8' }}>{profShort}</p>
                      </div>
                    );
                  })}
                </div>
              </SidebarSection>

              <SidebarSection title="Professional Traits">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {softSkills.map((ss, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ color: '#2563eb', fontSize: '8px', flexShrink: 0 }}>●</span>
                      <span style={{ fontSize: '10.5px', color: '#334155' }}>{ss.skill.name}</span>
                    </div>
                  ))}
                </div>
              </SidebarSection>

              <SidebarSection title="Competency Areas">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {interestingFacts.map((fact, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '4px' }}>
                      <span style={{ color: '#2563eb', fontWeight: '700', fontSize: '11px', lineHeight: '1.3', flexShrink: 0 }}>›</span>
                      <span style={{ fontSize: '10px', color: '#334155', lineHeight: '1.4' }}>
                        {fact.topic.replace(' skills', '')}
                      </span>
                    </div>
                  ))}
                </div>
              </SidebarSection>

              <SidebarSection title="Preferred Roles">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {['Software Architect', 'Engineering Management', 'Tech Lead'].map((r, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <span style={{ color: '#2563eb', fontSize: '8px', flexShrink: 0 }}>◆</span>
                      <span style={{ fontSize: '10px', color: '#334155' }}>{r}</span>
                    </div>
                  ))}
                </div>
              </SidebarSection>

              <SidebarSection title="Education">
                {formalEducation.map((edu, i) => (
                  <div key={i}>
                    <p style={{ margin: 0, fontSize: '10px', fontWeight: '700', color: '#0f172a', lineHeight: '1.3' }}>{edu.name}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '9.5px', fontWeight: '600', color: '#2563eb' }}>{edu.institution.name}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '9px', color: '#64748b' }}>
                      {new Date(edu.startDate).getFullYear()} – {edu.finishDate ? new Date(edu.finishDate).getFullYear() : 'Present'}
                    </p>
                  </div>
                ))}
              </SidebarSection>

            </aside>

            {/* ── Main content ── */}
            <main style={{ flex: 1, padding: '22px 28px' }}>

              {/* Professional Summary */}
              <div style={{ marginBottom: '18px' }}>
                <SectionTitle>Professional Summary</SectionTitle>
                {descriptionParagraphs.map((p, i) => (
                  <p key={i} style={{ margin: i === 0 ? 0 : '6px 0 0', fontSize: '11px', lineHeight: '1.6', color: '#334155' }}>
                    {p}
                  </p>
                ))}
              </div>

              {/* Experience — page 1 (2 most recent roles) */}
              <div>
                <SectionTitle>Professional Experience</SectionTitle>
                {recentJobs.map((job, ji) =>
                  job.roles.map((role, ri) => (
                    <RoleBlock key={`${ji}-${ri}`} job={job} role={role} />
                  ))
                )}
              </div>

            </main>
          </div>

          {/* ══════════════════════════  PAGE 2  ══════════════════════════ */}
          <div className="cv-page-break" style={{ padding: '20px 40px 26px' }}>

            {/* Page 2 running header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              borderBottom: '3px solid #1a2e4a', paddingBottom: '8px', marginBottom: '20px',
            }}>
              <span style={{ fontSize: '13px', fontWeight: '800', color: '#1a2e4a', letterSpacing: '0.02em' }}>
                {profile.name} {profile.surnames}
              </span>
              <span style={{ fontSize: '10px', color: '#64748b', fontStyle: 'italic' }}>
                {profile.title}
              </span>
            </div>

            {/* Experience continued */}
            <div style={{ marginBottom: '20px' }}>
              <SectionTitle>Professional Experience (continued)</SectionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                {olderJobs.map((job, ji) =>
                  job.roles.map((role, ri) => (
                    <RoleBlock key={`p2-${ji}-${ri}`} job={job} role={role} />
                  ))
                )}
              </div>
            </div>

            {/* Core Competencies */}
            <div style={{ marginBottom: '20px', pageBreakInside: 'avoid', breakInside: 'avoid' }}>
              <SectionTitle>Core Competencies</SectionTitle>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 28px' }}>
                {sortedFacts.map((fact, i) => (
                  <div key={i} style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
                    <p style={{ margin: '0 0 3px', fontSize: '10px', fontWeight: '700', color: '#1a2e4a' }}>
                      {fact.topic}
                    </p>
                    <BulletList text={fact.fact} tight fontSize="9px" />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom section: Certifications full-width, then Achievements + Education side by side */}
            <div style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>

              {/* Certifications — 2-col internal grid to keep height compact */}
              <div style={{ marginBottom: '16px' }}>
                <SectionTitle>Certifications</SectionTitle>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 20px' }}>
                  {certifications.map((cert, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ margin: 0, fontSize: '9.5px', fontWeight: '600', color: '#0f172a', lineHeight: '1.3' }}>{cert.name}</p>
                        <p style={{ margin: '1px 0 0', fontSize: '8.5px', color: '#64748b' }}>{cert.institution.name}</p>
                      </div>
                      <span style={{ fontSize: '8.5px', color: '#94a3b8', marginLeft: '6px', whiteSpace: 'nowrap', paddingTop: '1px', flexShrink: 0 }}>
                        {new Date(cert.startDate).getFullYear()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Achievements — full width */}
              <div>
                <SectionTitle>Achievements & Recognition</SectionTitle>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 24px' }}>
                  {publicArtifacts.map((art, i) => (
                    <div key={i} style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <p style={{ margin: 0, fontSize: '10px', fontWeight: '600', color: '#0f172a', lineHeight: '1.3', flex: 1 }}>
                          {art.details.name}
                        </p>
                        <span style={{ fontSize: '9px', color: '#94a3b8', marginLeft: '6px', whiteSpace: 'nowrap' }}>
                          {new Date(art.publishingDate).getFullYear()}
                        </span>
                      </div>
                      {art.details.description && (
                        <p style={{ margin: '2px 0 0', fontSize: '9px', color: '#64748b', lineHeight: '1.4' }}>
                          {art.details.description.length > 120
                            ? art.details.description.slice(0, 120) + '…'
                            : art.details.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer watermark */}
            <div style={{
              marginTop: '28px', paddingTop: '10px',
              borderTop: '1px solid #e2e8f0',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <span style={{ fontSize: '9px', color: '#cbd5e1' }}>
                {profile.name} {profile.surnames} · {website}
              </span>
              <span style={{ fontSize: '9px', color: '#cbd5e1' }}>
                Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default CvPrintPage;

export const Head = ({ location }) => (
  <Seo
    title="Eduard Paul Lakida — CV"
    description="Printable CV for Eduard Paul Lakida, Lead Solutions Architect specializing in Microsoft 365, Azure, and SharePoint."
    pathname={location.pathname}
  />
);
