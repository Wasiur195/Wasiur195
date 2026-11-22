import { useState } from 'react';

const LENS_CONTENT = {
  qa: {
    badge: 'DHAKA, BANGLADESH · QA & AUTOMATION LENS',
    headlinePrefix: 'Quality engineering that holds up ',
    headlineAccent: 'under real load.',
    summary:
      "I'm Wasiur Rahman—a Senior QA Engineer with 7+ years of experience across healthcare systems, SaaS, mobile apps, and WordPress ecosystems, specializing in test strategy, automation (Selenium, Playwright, Katalon), API validation (Postman), and security testing.",
    focusPoints: [
      'Automation & tooling: Selenium, Playwright, Katalon, IntelliJ IDEA, and Postman API testing',
      'Healthcare, AI & clinical platforms: Envision Next, Envision Hybrid, Petmatrix, Labportal, Radportal, CloudVision, Patient Portal, Join AI, MIRA AI, HRCT, Nucleus',
      'WordPress SaaS & commerce: BuddyBoss Ecommerce, BuddyBoss Platform, BuddyBoss Platform Pro',
    ],
    metrics: [
      { value: '7+ Yrs', title: 'QA & Delivery Experience', desc: 'Healthcare, SaaS, WordPress & mobile' },
      { value: '14+ Products', title: 'Platforms & Systems Tested', desc: 'Clinical, AI, ERP & BuddyBoss suite' },
      { value: '2 Wks → 10d', title: 'Faster Release Cadence', desc: '+40% coverage & -35% escaped defects' },
      { value: '50k+ Users', title: 'Global Scale Impact', desc: 'WordPress SaaS across 120+ countries' },
      { value: '12+ Gaps', title: 'Pre-Release Security Checks', desc: 'Vulnerability & data-protection reviews' },
      { value: '18% → 6%', title: 'Defect Re-Open Reduction', desc: 'Structured triage & clear root-cause logs' },
    ],
  },
  product: {
    badge: 'DHAKA, BANGLADESH · PRODUCT & RELEASE LENS',
    headlinePrefix: 'Product clarity from requirements ',
    headlineAccent: 'to confident release.',
    summary:
      "I'm Wasiur Rahman—a product-minded quality and release specialist with 7+ years of hands-on experience turning user feedback, competitor research, and cross-functional needs into clear SRS documents, user stories, and reliable rollouts.",
    focusPoints: [
      'SRS authoring, user stories, acceptance criteria, and user journey mapping',
      'Competitor & local market research (including bKash vs. Nagad & Safina localization)',
      'Cross-time-zone release coordination across engineering, QA, and stakeholders',
    ],
    metrics: [
      { value: '+30%', title: 'Story & Requirement Clarity', desc: 'Structured backlog refinement & user flows' },
      { value: '25–35%', title: 'Fewer Requirement Defects', desc: 'Earlier alignment before build & release' },
      { value: '14+ Products', title: 'Multi-Domain Exposure', desc: 'Healthcare, AI, ERP & SaaS workflows' },
      { value: '21 Features', title: 'Competitor UX Benchmark', desc: 'bKash vs. Nagad product & journey study' },
      { value: '100%', title: 'On-Time Release Discipline', desc: 'Structured UAT & release readiness gates' },
      { value: '50% Faster', title: 'Team Ramp-Up Time', desc: 'Clear documentation & workflow guides' },
    ],
  },
};

const CASE_DOSSIERS = [
  {
    id: 'miracle-healthcare-ai',
    domain: 'Healthcare & SaaS',
    title: 'Miracle Advance — Healthcare, Imaging, ERP & AI Suite',
    summary:
      'End-to-end QA, functional/regression validation, API checks, and security-aware testing across clinical, diagnostic, ERP, and AI platforms.',
    projects: [
      'Envision Next',
      'Envision Hybrid',
      'Petmatrix',
      'Labportal',
      'Radportal',
      'CloudVision',
      'Patient Portal',
      'Join AI',
      'MIRA AI',
      'HRCT',
      'Nucleus',
    ],
    context: 'Complex healthcare, imaging/lab portals, ERP operations, and AI-enabled workflows requiring dependable releases.',
    owned: 'Designed test scenarios, validated core workflows and APIs, executed regression and security checks, and coordinated release readiness.',
    outcome: 'Accelerated release cadence from 2 weeks to 10 days, increased coverage, and caught pre-production security and functional gaps early.',
  },
  {
    id: 'buddyboss-suite',
    domain: 'WordPress & Mobile',
    title: 'BuddyBoss — Ecommerce, Platform & Platform Pro',
    summary:
      'Comprehensive functional, regression, compatibility, and mobile/web release validation across BuddyBoss commerce and platform offerings.',
    projects: ['BuddyBoss Ecommerce', 'BuddyBoss Platform', 'BuddyBoss Platform Pro'],
    context: 'High-traffic WordPress community, commerce, and app ecosystems serving global users across web and mobile.',
    owned: 'Validated core user journeys, commerce and platform flows, cross-device behavior, and structured JIRA defect reporting.',
    outcome: 'Reduced defect re-open rates from 18% to 6% and improved team onboarding speed with clear test documentation.',
  },
  {
    id: 'bkash-nagad',
    domain: 'Product & Research',
    title: 'bKash vs. Nagad — 21-Feature Competitor & UX Analysis',
    summary:
      'Comparative product and user-experience research across 21 core features, synthesizing local user pain points and mobile payment habits.',
    projects: ['21-Feature UX Matrix', 'Mobile Payment Research'],
    context: 'Evaluating mobile financial service UX patterns and friction points for local smartphone users.',
    owned: 'Benchmarked 21 features side-by-side, reviewed public user feedback, and documented actionable product opportunities.',
    outcome: 'Published structured research repository at github.com/Wasiur195/Competitor-analysis-Bkash-and-Nagad.',
  },
  {
    id: 'safina-localization',
    domain: 'Product & Research',
    title: 'Safina Localization Initiative — Market to Delivery',
    summary:
      'End-to-end localization initiative spanning initial market and competitor research through operational rollout.',
    projects: ['Market Research', 'Localization Rollout'],
    context: 'Adapting product and service positioning to local user expectations and market realities.',
    owned: 'Led competitor analysis, requirement planning, and operational execution through delivery.',
    outcome: 'Delivered a localized offering at safinaintl.com grounded in practical user research.',
  },
];

const RELEASE_SCENARIOS = {
  healthcare: {
    label: 'Healthcare & Sensitive Data',
    gates: [
      'Verify role/session boundaries and sensitive patient/record access controls',
      'Run automated & API regression checks on critical clinical, lab & reporting flows',
      'Validate Android/iOS responsive layouts, login, and report views',
      'Confirm defect triage sign-off and rollback readiness before release',
    ],
  },
  saas: {
    label: 'SaaS & Web Release',
    gates: [
      'Validate core user journeys, permissions, and commerce/workflow states',
      'Execute regression, API (Postman), and integration checks across updated modules',
      'Verify requirement & SRS alignment with stakeholders prior to sign-off',
      'Check post-deploy smoke health and incident monitoring notes',
    ],
  },
  mobile: {
    label: 'Mobile App Rollout',
    gates: [
      'Test builds via TestFlight (iOS) and Play Console tracks (Android)',
      'Check push notifications, deep links, and screen/OS variations',
      'Re-verify previously logged defects with device/OS reproduction steps',
      'Confirm zero blocker UI or navigation regressions before rollout',
    ],
  },
};

const EXPERIENCE_TIMELINE = [
  {
    role: 'QA Engineer (Part-Time)',
    org: 'TenderBase UK · Remote',
    period: 'Jan 2026 – Oct 10, 2026',
    desc: 'Executed functional, regression, and integration testing, authored SRS documentation, and collaborated with UK stakeholders across time zones on tender and procurement SaaS workflows.',
  },
  {
    role: 'Senior QA Engineer & Release Lead',
    org: 'Miracle Advance Technologies Co., Ltd. · Remote',
    period: 'Jan 2024 – Present',
    desc: 'Led end-to-end QA, automation, API and security-aware testing, and SRS/user-story planning across Envision Next, Envision Hybrid, Petmatrix, Labportal, Radportal, CloudVision, Patient Portal, Join AI, MIRA AI, HRCT, and Nucleus.',
  },
  {
    role: 'QA Engineer',
    org: 'BuddyBoss · Remote',
    period: 'Sep 2022 – Jan 2024',
    desc: 'Handled web and iOS/Android mobile QA (TestFlight, Play Console), JIRA defect triage, and release verification across BuddyBoss Ecommerce, BuddyBoss Platform, and BuddyBoss Platform Pro.',
  },
  {
    role: 'Content Specialist (QA)',
    org: 'Miracle Advance Technologies Co., Ltd. · Remote',
    period: 'Feb 2021 – Sep 2022',
    desc: 'Led QA and user acceptance verification for digital experience and AI platforms, improving requirement alignment and reducing defect re-open rates.',
  },
  {
    role: 'Content Moderator & Technical Writer',
    org: 'NETSTAR (SG) PTE. LTD & StorePress · Remote',
    period: 'Jan 2020 – Feb 2021',
    desc: 'Moderated high-volume user content for policy compliance and authored user guides, FAQs, and release notes.',
  },
];

const SKILL_GROUPS = [
  {
    title: 'Automation & Testing Tools',
    items: [
      'Selenium',
      'Playwright',
      'Katalon',
      'IntelliJ IDEA',
      'Postman API Testing',
      'Functional & Regression',
      'Integration & UAT',
      'Risk-Based Testing',
    ],
  },
  {
    title: 'Security, Mobile & Web',
    items: [
      'Security Testing',
      'Vulnerability Assessment',
      'Basic Penetration Testing',
      'Android & iOS Testing',
      'TestFlight & Play Console',
      'Emulators & Simulators',
      'WordPress & SaaS',
    ],
  },
  {
    title: 'Product, Research & Workflows',
    items: [
      'SRS & User Stories',
      'Competitor & UX Analysis',
      'JIRA & Smart Task',
      'Git & Linux',
      'SQL',
      'Agile / Scrum',
    ],
  },
];

const EDUCATION_CERTS = [
  {
    title: 'Advanced Certificate for Management Professionals (ACMP 4.0)',
    meta: 'IBA, University of Dhaka · 2024–2025',
  },
  {
    title: 'BSc in Computer Science & Engineering',
    meta: 'BRAC University · Graduated 2019',
  },
  {
    title: 'Google Cybersecurity Professional Certificate (Coursera)',
    meta: '2024',
  },
  {
    title: 'Full Stack SQA & Software Test Automation — Road To SDET',
    meta: '2023',
  },
  {
    title: 'EF SET English Certificate — C1 Advanced',
    meta: '2025 · Bengali (Native), English (C1)',
  },
];

export default function App() {
  const [lens, setLens] = useState('qa');
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedId, setExpandedId] = useState('miracle-healthcare-ai');
  const [scenarioKey, setScenarioKey] = useState('healthcare');
  const [checkedGates, setCheckedGates] = useState({});
  const [copied, setCopied] = useState(false);

  const currentLens = LENS_CONTENT[lens];
  const filters = ['All', 'Healthcare & SaaS', 'WordPress & Mobile', 'Product & Research'];

  const visibleDossiers =
    activeFilter === 'All'
      ? CASE_DOSSIERS
      : CASE_DOSSIERS.filter((item) => item.domain === activeFilter);

  const currentGates = RELEASE_SCENARIOS[scenarioKey].gates;
  const completedCount = currentGates.filter((_, idx) => checkedGates[`${scenarioKey}-${idx}`]).length;

  const toggleGate = (idx) => {
    const key = `${scenarioKey}-${idx}`;
    setCheckedGates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('wasiurrahman195@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <header className="topbar">
        <div className="container topbar-inner">
          <a href="#" className="brand-link" aria-label="Wasiur Rahman Home">
            <span className="wr-logo-badge">WR</span>
            <span className="wr-brand-text">
              <span className="wr-brand-name">Wasiur Rahman</span>
              <span className="wr-brand-sub">SQAE · AUTOMATION · SECURITY</span>
            </span>
          </a>
          <nav className="nav-links">
            <a href="#work">Projects</a>
            <a href="#readiness">Release Check</a>
            <a href="#experience">Experience</a>
            <a href="#skills">Tools &amp; Skills</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <div className="hero-grid">
              <div>
                <div className="lens-bar" role="group" aria-label="Role perspective switcher">
                  <button
                    type="button"
                    className={`lens-btn ${lens === 'qa' ? 'active' : ''}`}
                    onClick={() => setLens('qa')}
                  >
                    QA &amp; Automation
                  </button>
                  <button
                    type="button"
                    className={`lens-btn ${lens === 'product' ? 'active' : ''}`}
                    onClick={() => setLens('product')}
                  >
                    Product &amp; Release
                  </button>
                </div>

                <div className="section-label">{currentLens.badge}</div>
                <h1 className="hero-title">
                  {currentLens.headlinePrefix}
                  <em>{currentLens.headlineAccent}</em>
                </h1>
                <p className="hero-copy">{currentLens.summary}</p>

                <div className="cta-row">
                  <a href="#work" className="btn-primary">
                    Explore Projects
                  </a>
                  <a
                    href="https://www.upwork.com/freelancers/~01f7bad0c8e3e7921e?mp_source=share"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                  >
                    Hire on Upwork
                  </a>
                  <button type="button" onClick={handleCopyEmail} className="btn-secondary">
                    {copied ? 'Copied Email!' : 'Copy Email'}
                  </button>
                </div>
              </div>

              <aside className="brief-card">
                <div className="brief-header">
                  <img src="/profile.jpg" alt="Wasiur Rahman" className="avatar-img" />
                  <div>
                    <div className="brief-name">Wasiur Rahman</div>
                    <div className="brief-meta">Dhaka, BD · +88 01910126196</div>
                  </div>
                </div>

                <ul className="brief-list">
                  {currentLens.focusPoints.map((pt) => (
                    <li key={pt}>{pt}</li>
                  ))}
                </ul>

                <div className="channel-pills">
                  <a
                    href="https://www.youtube.com/@wasiurrahman6735"
                    target="_blank"
                    rel="noreferrer"
                    className="channel-pill"
                  >
                    YouTube
                  </a>
                  <a
                    href="https://github.com/Wasiur195"
                    target="_blank"
                    rel="noreferrer"
                    className="channel-pill"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/wasiurrahman1102"
                    target="_blank"
                    rel="noreferrer"
                    className="channel-pill"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://www.facebook.com/wasiur.rifat/"
                    target="_blank"
                    rel="noreferrer"
                    className="channel-pill"
                  >
                    Facebook
                  </a>
                </div>
              </aside>
            </div>

            <div className="metrics-grid">
              {currentLens.metrics.map((m) => (
                <div className="metric-box" key={m.title}>
                  <div className="metric-val">{m.value}</div>
                  <div className="metric-title">{m.title}</div>
                  <div className="metric-desc">{m.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="work">
          <div className="container">
            <div className="section-label">Projects &amp; Case Dossiers</div>
            <h2 className="section-heading">Platforms, products &amp; research work</h2>
            <p className="section-sub">
              Filter by domain and expand any card to inspect the products covered, responsibilities, and impact.
            </p>

            <div className="filter-row">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`filter-chip ${activeFilter === f ? 'active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="dossier-list">
              {visibleDossiers.map((item) => {
                const isOpen = expandedId === item.id;
                return (
                  <article className="dossier-card" key={item.id}>
                    <div className="dossier-top">
                      <div>
                        <div className="dossier-tag">{item.domain}</div>
                        <h3 className="dossier-title">{item.title}</h3>
                        <p className="dossier-summary">{item.summary}</p>
                        <div className="project-chips">
                          {item.projects.map((proj) => (
                            <span className="project-chip" key={proj}>
                              {proj}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => setExpandedId(isOpen ? null : item.id)}
                      >
                        {isOpen ? 'Less' : 'Details'}
                      </button>
                    </div>

                    {isOpen && (
                      <div className="dossier-details">
                        <div>
                          <h4>Context</h4>
                          <p>{item.context}</p>
                        </div>
                        <div>
                          <h4>What I Did</h4>
                          <p>{item.owned}</p>
                        </div>
                        <div>
                          <h4>Outcome</h4>
                          <p>{item.outcome}</p>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="readiness">
          <div className="container">
            <div className="section-label">Interactive Workflow Check</div>
            <h2 className="section-heading">Release readiness checklist by context</h2>
            <p className="section-sub">
              Switch scenarios and check off verification steps to preview how release gates adapt to risk.
            </p>

            <div className="sim-box">
              <div className="sim-tabs">
                {Object.entries(RELEASE_SCENARIOS).map(([key, cfg]) => (
                  <button
                    key={key}
                    type="button"
                    className={`filter-chip ${scenarioKey === key ? 'active' : ''}`}
                    onClick={() => setScenarioKey(key)}
                  >
                    {cfg.label}
                  </button>
                ))}
              </div>

              <div className="sim-checks">
                {currentGates.map((gate, idx) => {
                  const isChecked = Boolean(checkedGates[`${scenarioKey}-${idx}`]);
                  return (
                    <label className="sim-item" key={gate}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleGate(idx)}
                      />
                      <span>{gate}</span>
                    </label>
                  );
                })}
              </div>

              <div className="sim-status">
                Gates verified: {completedCount} / {currentGates.length}
              </div>
            </div>
          </div>
        </section>

        <section id="experience">
          <div className="container">
            <div className="section-label">Career Timeline</div>
            <h2 className="section-heading">Roles across QA, release &amp; product support</h2>

            <div className="timeline">
              {EXPERIENCE_TIMELINE.map((exp) => (
                <div className="timeline-item" key={`${exp.org}-${exp.period}`}>
                  <div className="timeline-head">
                    <div>
                      <div className="timeline-role">{exp.role}</div>
                      <div className="timeline-org">{exp.org}</div>
                    </div>
                    <div className="timeline-date">{exp.period}</div>
                  </div>
                  <p>{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="container">
            <div className="section-label">Tools, Stack &amp; Credentials</div>
            <h2 className="section-heading">Automation, security, testing tools &amp; education</h2>

            <div className="two-col">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {SKILL_GROUPS.map((grp) => (
                  <div className="panel-card" key={grp.title}>
                    <h3>{grp.title}</h3>
                    <div className="tag-cloud">
                      {grp.items.map((tag) => (
                        <span className="tag-item" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="panel-card">
                <h3>Education &amp; Certifications</h3>
                <ul className="brief-list" style={{ marginTop: '12px' }}>
                  {EDUCATION_CERTS.map((ed) => (
                    <li key={ed.title}>
                      <strong>{ed.title}</strong>
                      <div className="brief-meta">{ed.meta}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer id="contact">
        <div className="container footer-grid">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="wr-logo-badge">WR</span>
            <div>
              <div className="brief-name">Wasiur Rahman</div>
              <div className="brief-meta">wasiurrahman195@gmail.com · +88 01910126196</div>
            </div>
          </div>

          <div className="footer-links">
            <a href="https://www.youtube.com/@wasiurrahman6735" target="_blank" rel="noreferrer">
              YouTube
            </a>
            <a
              href="https://www.upwork.com/freelancers/~01f7bad0c8e3e7921e?mp_source=share"
              target="_blank"
              rel="noreferrer"
            >
              Upwork
            </a>
            <a href="https://www.facebook.com/wasiur.rifat/" target="_blank" rel="noreferrer">
              Facebook
            </a>
            <a href="https://github.com/Wasiur195" target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/wasiurrahman1102" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}