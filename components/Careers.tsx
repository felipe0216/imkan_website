import React, { useState, useEffect, useMemo } from 'react';
import JobApplicationModal from './JobApplicationModal';

interface CareersProps {
  onOpenContact: () => void;
}

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  level: string;
  postedAt: string; // ISO date (YYYY-MM-DD) the role was posted
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  tags: string[];
}

// Roles automatically close this many days after they are posted.
const JOB_OPEN_DAYS = 30;

const daysSincePosted = (postedAt: string) => {
  const posted = new Date(postedAt).getTime();
  if (Number.isNaN(posted)) return 0;
  return Math.floor((Date.now() - posted) / (1000 * 60 * 60 * 24));
};

const isJobOpen = (job: Job) => daysSincePosted(job.postedAt) <= JOB_OPEN_DAYS;

const daysLeft = (job: Job) => Math.max(0, JOB_OPEN_DAYS - daysSincePosted(job.postedAt));

const JOBS: Job[] = [
  {
    id: 'senior-data-engineer',
    title: 'Senior Data Engineer',
    department: 'Engineering',
    location: 'Riyadh, KSA',
    type: 'Full-time',
    level: 'Senior',
    postedAt: '2026-06-20',
    summary: 'Design and build the production-grade data platforms that power AI for national-scale clients.',
    description:
      'You will own the design and delivery of modern data platforms — from ingestion to serving — that our AI and analytics products are built on. You will work directly with clients across the Kingdom to turn messy, siloed data into reliable, governed, high-performance foundations.',
    responsibilities: [
      'Architect and build batch and streaming pipelines (Spark, Kafka, dbt) on cloud data platforms.',
      'Model data for analytics and ML use cases with strong governance and lineage.',
      'Own reliability: monitoring, testing, and CI/CD for data workflows.',
      'Mentor junior engineers and set engineering standards across the team.',
    ],
    requirements: [
      '5+ years building production data platforms.',
      'Expert SQL and Python; deep experience with Spark and a cloud warehouse (Databricks, Snowflake, BigQuery, or Fabric).',
      'Strong grasp of data modeling, orchestration (Airflow/Dagster), and infrastructure-as-code.',
      'Track record of shipping reliable systems in ambiguous environments.',
    ],
    niceToHave: ['Experience in consulting or client-facing delivery.', 'Arabic language proficiency.'],
    tags: ['Spark', 'Python', 'SQL', 'Databricks', 'Airflow', 'Cloud'],
  },
  {
    id: 'machine-learning-engineer',
    title: 'Machine Learning Engineer',
    department: 'AI & Machine Learning',
    location: 'Riyadh, KSA',
    type: 'Full-time',
    level: 'Mid–Senior',
    postedAt: '2026-06-25',
    summary: 'Take models from notebook to production and keep them reliable, observable, and fast.',
    description:
      'You will bridge data science and engineering — productionizing models, building ML pipelines, and standing up the MLOps tooling that keeps them healthy in the real world.',
    responsibilities: [
      'Build and deploy ML pipelines for training, evaluation, and inference.',
      'Implement MLOps: experiment tracking, model registry, monitoring, and drift detection.',
      'Optimize models and serving for latency, cost, and scale.',
      'Collaborate with data scientists to harden prototypes into products.',
    ],
    requirements: [
      '3+ years deploying ML systems in production.',
      'Strong Python and experience with PyTorch or TensorFlow.',
      'Familiarity with MLOps tooling (MLflow, Kubeflow, SageMaker, or Vertex).',
      'Solid software engineering fundamentals (testing, APIs, containers).',
    ],
    niceToHave: ['Experience serving LLMs or RAG systems.', 'Kubernetes experience.'],
    tags: ['Python', 'PyTorch', 'MLOps', 'Docker', 'Kubernetes'],
  },
  {
    id: 'ai-solutions-architect',
    title: 'AI Solutions Architect',
    department: 'AI & Machine Learning',
    location: 'Riyadh, KSA / Hybrid',
    type: 'Full-time',
    level: 'Senior',
    postedAt: '2026-06-15',
    summary: 'Translate client ambitions into pragmatic, high-impact AI architectures.',
    description:
      'You will sit at the intersection of business and technology — scoping opportunities, designing agentic AI and data solutions, and guiding delivery teams to build them the right way.',
    responsibilities: [
      'Lead technical discovery and solution design with enterprise and government clients.',
      'Design end-to-end architectures spanning data, ML, and application layers.',
      'Own technical proposals, estimates, and delivery roadmaps.',
      'Advise clients on responsible AI, governance, and Vision 2030 alignment.',
    ],
    requirements: [
      '6+ years in data/AI, with 2+ in solution architecture or tech leadership.',
      'Breadth across data engineering, ML, and cloud platforms.',
      'Excellent communication and stakeholder management.',
      'Ability to simplify complex ideas for non-technical audiences.',
    ],
    niceToHave: ['Experience with agentic AI / LLM orchestration.', 'Public-sector delivery experience in KSA.'],
    tags: ['Architecture', 'LLMs', 'Agentic AI', 'Cloud', 'Strategy'],
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    department: 'Data Science',
    location: 'Riyadh, KSA',
    type: 'Full-time',
    level: 'Mid',
    postedAt: '2026-06-28',
    summary: 'Turn data into decisions with rigorous modeling and clear storytelling.',
    description:
      'You will frame business problems as data problems, build models that hold up under scrutiny, and communicate insights that drive real decisions for our clients.',
    responsibilities: [
      'Explore data, engineer features, and build predictive and statistical models.',
      'Design experiments and measure impact rigorously.',
      'Communicate findings through clear visuals and narratives.',
      'Partner with ML engineers to productionize high-value models.',
    ],
    requirements: [
      '3+ years in applied data science.',
      'Strong statistics, Python (pandas, scikit-learn), and SQL.',
      'Experience communicating results to business stakeholders.',
      'Curiosity and a bias toward measurable impact.',
    ],
    niceToHave: ['Experience with forecasting or optimization.', 'Domain experience in energy, finance, or public sector.'],
    tags: ['Python', 'Statistics', 'ML', 'SQL', 'Visualization'],
  },
  {
    id: 'fullstack-engineer',
    title: 'Full-Stack Engineer',
    department: 'Engineering',
    location: 'Remote (KSA time zone)',
    type: 'Full-time',
    level: 'Mid–Senior',
    postedAt: '2026-06-12',
    summary: 'Build the applications and interfaces that make AI usable and delightful.',
    description:
      'You will craft the products around our data and AI — dashboards, internal tools, and client-facing apps — with a strong eye for UX and performance.',
    responsibilities: [
      'Build responsive front-ends (React/TypeScript) and robust APIs.',
      'Integrate ML and data services into polished product experiences.',
      'Own features end-to-end, from design to deployment.',
      'Contribute to a clean, well-tested, maintainable codebase.',
    ],
    requirements: [
      '4+ years full-stack development.',
      'Expert React + TypeScript; solid backend experience (Node, Python, or similar).',
      'Strong product sense and attention to detail.',
      'Comfortable with cloud deployment and CI/CD.',
    ],
    niceToHave: ['Experience with data-heavy or real-time UIs.', 'Design sensibility / Figma fluency.'],
    tags: ['React', 'TypeScript', 'Node', 'APIs', 'UI/UX'],
  },
  {
    id: 'analytics-consultant',
    title: 'Analytics & Strategy Consultant',
    department: 'Consulting',
    location: 'Riyadh, KSA / Hybrid',
    type: 'Full-time',
    level: 'Mid–Senior',
    postedAt: '2026-05-15',
    summary: 'Help clients build a data & AI strategy worth executing — then help them execute it.',
    description:
      'You will lead engagements that shape how organizations use data and AI: assessing maturity, defining roadmaps, and driving adoption alongside our technical teams.',
    responsibilities: [
      'Run discovery, maturity assessments, and opportunity mapping.',
      'Build business cases and data/AI strategy roadmaps.',
      'Drive stakeholder alignment and change management.',
      'Partner with engineering to ensure strategy turns into delivery.',
    ],
    requirements: [
      '4+ years in consulting, analytics, or strategy roles.',
      'Strong analytical and structured-thinking skills.',
      'Excellent written and verbal communication.',
      'Comfort operating in fast-moving, ambiguous settings.',
    ],
    niceToHave: ['Experience with Vision 2030 initiatives.', 'Arabic language proficiency.'],
    tags: ['Strategy', 'Consulting', 'Analytics', 'Stakeholders'],
  },
];

const PERKS = [
  { icon: 'rocket_launch', title: 'High-impact work', text: 'Ship AI and data systems for national-scale, Vision 2030 clients.' },
  { icon: 'flag', title: 'Real ownership', text: 'Own meaningful problems end-to-end and see your work ship fast.' },
  { icon: 'diversity_3', title: 'Elite, small team', text: 'Work shoulder-to-shoulder with a hand-picked group of specialists.' },
  { icon: 'schedule', title: 'Flexible & hybrid', text: 'Outcomes over hours, with hybrid and remote-friendly options.' },
  { icon: 'payments', title: 'Competitive package', text: 'Compensation that reflects your impact, plus performance upside.' },
  { icon: 'public', title: 'Build the Kingdom', text: 'Be part of building sovereign AI capability in Saudi Arabia.' },
];

const Careers: React.FC<CareersProps> = ({ onOpenContact }) => {
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [location, setLocation] = useState('All');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyJob, setApplyJob] = useState<{ id: string; title: string; location: string } | null>(null);

  // Split roles into currently-open and expired ("past") based on posted date.
  const openJobs = useMemo(() => JOBS.filter(isJobOpen), []);
  const pastJobs = useMemo(() => JOBS.filter((j) => !isJobOpen(j)), []);

  const departments = useMemo(() => ['All', ...Array.from(new Set(openJobs.map((j) => j.department)))], [openJobs]);
  const locations = useMemo(() => ['All', ...Array.from(new Set(openJobs.map((j) => j.location)))], [openJobs]);

  const filteredJobs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return openJobs.filter((job) => {
      const matchesDept = department === 'All' || job.department === department;
      const matchesLoc = location === 'All' || job.location === location;
      const matchesSearch =
        q === '' ||
        [job.title, job.department, job.location, job.summary, job.description, ...job.tags]
          .join(' ')
          .toLowerCase()
          .includes(q);
      return matchesDept && matchesLoc && matchesSearch;
    });
  }, [search, department, location, openJobs]);

  // Lock background scroll while the job detail modal is open.
  useEffect(() => {
    if (!selectedJob) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedJob]);

  // Close modal on Escape.
  useEffect(() => {
    if (!selectedJob) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedJob(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedJob]);

  const clearFilters = () => {
    setSearch('');
    setDepartment('All');
    setLocation('All');
  };

  const startApply = (job: Job) => {
    setSelectedJob(null);
    setApplyJob({ id: job.id, title: job.title, location: job.location });
  };

  const startOpenApplication = () => {
    setSelectedJob(null);
    setApplyJob({ id: 'open-application', title: 'Open application', location: '—' });
  };

  const hasActiveFilters = search.trim() !== '' || department !== 'All' || location !== 'All';

  return (
    <main className="relative">
      {/* Hero */}
      <section className="relative pt-36 md:pt-44 pb-16 md:pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 hero-glow pointer-events-none"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,226,244,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(37,226,244,0.04)_1px,transparent_1px)] bg-[size:44px_44px] opacity-40 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Join the <span className="text-primary text-glow">Team</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8">
              We're a small, elite team building sovereign AI and data platforms for Saudi Arabia's most ambitious
              organizations. If you want your work to matter, you'll fit right in.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#open-roles"
                className="inline-flex items-center gap-2 bg-primary text-background-dark font-bold px-6 py-3 rounded-xl hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(37,226,244,0.3)]"
              >
                View open roles
                <span className="material-symbols-outlined">arrow_downward</span>
              </a>
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white font-bold px-6 py-3 rounded-xl hover:bg-white/10 transition-colors duration-300"
              >
                Get in touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="py-12 md:py-16 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PERKS.map((perk) => (
              <div
                key={perk.title}
                className="glass-card rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 hover:border-primary/30"
              >
                <div className="size-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary">{perk.icon}</span>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">{perk.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{perk.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section id="open-roles" className="py-16 md:py-24 scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Open Roles</h2>
            <p className="text-gray-400">Search and filter to find where you fit.</p>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col lg:flex-row gap-4 mb-8">
            {/* Search bar */}
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                search
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by role, skill, or keyword..."
                className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                aria-label="Search open roles"
              />
            </div>

            {/* Department filter */}
            <div className="relative">
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full lg:w-56 appearance-none pl-4 pr-10 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
                aria-label="Filter by department"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept} className="bg-background-card text-white">
                    {dept === 'All' ? 'All departments' : dept}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                expand_more
              </span>
            </div>

            {/* Location filter */}
            <div className="relative">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full lg:w-56 appearance-none pl-4 pr-10 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all cursor-pointer"
                aria-label="Filter by location"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc} className="bg-background-card text-white">
                    {loc === 'All' ? 'All locations' : loc}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          {/* Result count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-500">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'role' : 'roles'} found
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-primary hover:text-white transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-base">close</span>
                Clear filters
              </button>
            )}
          </div>

          {/* Job list */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {filteredJobs.map((job) => (
                <button
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="group text-left glass-card rounded-2xl p-6 md:p-7 transition-all duration-300 hover:border-primary/40 hover:bg-white/[0.04] focus:outline-none focus:border-primary/60"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                          {job.department}
                        </span>
                        <span className="text-xs font-medium text-gray-400">{job.level}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-2 max-w-2xl">{job.summary}</p>
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-base text-primary/70">location_on</span>
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-base text-primary/70">work</span>
                          {job.type}
                        </span>
                        {daysLeft(job) <= 7 ? (
                          <span className="flex items-center gap-1.5 text-amber-400 font-medium">
                            <span className="material-symbols-outlined text-base">schedule</span>
                            Closing soon · {daysLeft(job)}d left
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base text-primary/70">event</span>
                            Closes in {daysLeft(job)} days
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-primary font-semibold text-sm whitespace-nowrap flex-shrink-0">
                      View role
                      <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="text-center py-20 glass-card rounded-2xl">
              <span className="material-symbols-outlined text-5xl text-gray-600 mb-4">search_off</span>
              <h3 className="text-xl font-bold text-white mb-2">No roles match your search</h3>
              <p className="text-gray-400 mb-6">Try adjusting your filters, or reach out — we're always keen to meet great people.</p>
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={clearFilters}
                  className="bg-white/5 border border-white/10 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/10 transition-colors"
                >
                  Clear filters
                </button>
                <button
                  onClick={onOpenContact}
                  className="bg-primary text-background-dark font-bold px-5 py-2.5 rounded-xl hover:bg-white transition-colors"
                >
                  Get in touch
                </button>
              </div>
            </div>
          )}

          {/* Open application */}
          <div className="mt-12 glass-card rounded-2xl p-8 text-center border-primary/20">
            <h3 className="text-2xl font-bold text-white mb-2">Don't see the right role?</h3>
            <p className="text-gray-400 max-w-2xl mx-auto mb-6">
              We're always looking for exceptional data and AI talent. Send us your CV and tell us how you'd like to make an
              impact.
            </p>
            <button
              onClick={startOpenApplication}
              className="inline-flex items-center gap-2 bg-primary text-background-dark font-bold px-6 py-3 rounded-xl hover:bg-white transition-colors duration-300"
            >
              <span className="material-symbols-outlined">mail</span>
              Send an open application
            </button>
          </div>

          {/* Past roles */}
          {pastJobs.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center gap-3 mb-6">
                <h3 className="text-xl font-bold text-gray-300">Past roles</h3>
                <span className="text-xs text-gray-500 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                  Applications closed
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {pastJobs.map((job) => (
                  <button
                    key={job.id}
                    onClick={() => setSelectedJob(job)}
                    className="group text-left rounded-2xl p-5 md:p-6 border border-white/5 bg-white/[0.015] opacity-70 hover:opacity-100 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className="text-xs font-medium text-gray-500 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                            {job.department}
                          </span>
                          <span className="text-xs font-semibold text-gray-500 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                            Closed
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-gray-300 group-hover:text-white transition-colors">
                          {job.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-base">location_on</span>
                            {job.location}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 font-semibold text-sm whitespace-nowrap flex-shrink-0">
                        View details
                        <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1">
                          arrow_forward
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background-dark/95 backdrop-blur-sm"
            onClick={() => setSelectedJob(null)}
          ></div>

          {/* Modal Container */}
          <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col bg-background-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-5 right-5 z-50 text-gray-400 hover:text-white transition-colors bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-lg p-2"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {/* Scrollable content */}
            <div className="p-7 md:p-9 overflow-y-auto overscroll-contain">
              <div className="mb-6 pr-10">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
                    {selectedJob.department}
                  </span>
                  <span className="text-xs font-medium text-gray-400">{selectedJob.level}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{selectedJob.title}</h2>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-primary/70">location_on</span>
                    {selectedJob.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base text-primary/70">work</span>
                    {selectedJob.type}
                  </span>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-8">{selectedJob.description}</p>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary rounded-full"></span>
                  What you'll do
                </h3>
                <ul className="space-y-2.5">
                  {selectedJob.responsibilities.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                      <span className="material-symbols-outlined text-primary text-lg flex-shrink-0 mt-0.5">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-primary rounded-full"></span>
                  What we're looking for
                </h3>
                <ul className="space-y-2.5">
                  {selectedJob.requirements.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
                      <span className="material-symbols-outlined text-primary text-lg flex-shrink-0 mt-0.5">arrow_right</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {selectedJob.niceToHave && selectedJob.niceToHave.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                    <span className="w-1 h-4 bg-accent-green rounded-full"></span>
                    Nice to have
                  </h3>
                  <ul className="space-y-2.5">
                    {selectedJob.niceToHave.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-gray-400 text-sm leading-relaxed">
                        <span className="material-symbols-outlined text-accent-green text-lg flex-shrink-0 mt-0.5">star</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-8">
                {selectedJob.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Sticky footer with Apply */}
            <div className="border-t border-white/10 p-5 md:px-9 bg-background-card/80 backdrop-blur-sm flex flex-col sm:flex-row items-center gap-3">
              {isJobOpen(selectedJob) ? (
                <button
                  onClick={() => startApply(selectedJob)}
                  className="w-full sm:w-auto flex-1 bg-primary text-background-dark font-bold py-3 px-6 rounded-xl hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(37,226,244,0.3)] flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">send</span>
                  Apply for this role
                </button>
              ) : (
                <div className="w-full sm:w-auto flex-1 text-center bg-white/5 border border-white/10 text-gray-400 font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">lock</span>
                  Applications for this role are closed
                </div>
              )}
              <button
                onClick={() => setSelectedJob(null)}
                className="w-full sm:w-auto text-gray-300 font-semibold py-3 px-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Job Application Modal */}
      <JobApplicationModal job={applyJob} onClose={() => setApplyJob(null)} />
    </main>
  );
};

export default Careers;
