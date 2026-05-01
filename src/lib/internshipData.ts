// BACKEND INTEGRATION POINT:
// Replace this mock data with a real API call, e.g.:
//   const res = await fetch('https://api.kairo.app/v1/internships', { next: { revalidate: 300 } });
//   return res.json();

export type InternshipCategory =
  | 'tech'
  | 'finance'
  | 'design'
  | 'marketing'
  | 'operations'
  | 'data'
  | 'legal'
  | 'hr';

export type InternshipType = 'full-time' | 'part-time' | 'work from home' | 'hybrid';

export type InternshipStatus = 'open' | 'urgent' | 'closed';

export interface Internship {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  companyLogoAlt: string;
  location: string;
  locations?: string[];
  category: InternshipCategory;
  type: InternshipType;
  duration: string;
  stipend: string;
  minStipend?: number | null;
  maxStipend?: number | null;
  postedDate: string;
  deadline: string;
  description: string;
  skills: string[];
  applyUrl: string;
  status: InternshipStatus;
  isNew: boolean;
  openings: number;
}

export function parseApiPostedDate(value: unknown): Date | null {
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
  if (typeof value === 'number') {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  if (typeof value !== 'string') return null;

  const s = value.trim();
  if (!s) return null;

  let m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) {
    const y = Number(m[1]);
    const mo = Number(m[2]) - 1;
    const d = Number(m[3]);
    const out = new Date(y, mo, d);
    return Number.isNaN(out.getTime()) ? null : out;
  }

  m = s.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{2,4})$/);
  if (m) {
    const day = Number(m[1]);
    const month = Number(m[2]) - 1;
    const yrRaw = Number(m[3]);
    const year = yrRaw < 100 ? yrRaw + 2000 : yrRaw;
    const out = new Date(year, month, day);
    return Number.isNaN(out.getTime()) ? null : out;
  }

  m = s.match(/^(\d{1,2})\s+([A-Za-z]{3,})\.?,?['’]?\s*(\d{2,4})/);
  if (m) {
    const day = Number(m[1]);
    const monKey = m[2].slice(0, 3).toLowerCase();
    const yrRaw = Number(m[3]);
    const year = yrRaw < 100 ? yrRaw + 2000 : yrRaw;

    const monthMap: Record<string, number> = {
      jan: 0,
      feb: 1,
      mar: 2,
      apr: 3,
      may: 4,
      jun: 5,
      jul: 6,
      aug: 7,
      sep: 8,
      oct: 9,
      nov: 10,
      dec: 11,
    };
    const month = monthMap[monKey];
    if (month === undefined) return null;

    const out = new Date(year, month, day);
    return Number.isNaN(out.getTime()) ? null : out;
  }

  const parsed = Date.parse(s);
  if (!Number.isNaN(parsed)) return new Date(parsed);

  return null;
}

export const MOCK_INTERNSHIPS: Internship[] = [
  {
    id: 'intern-001',
    title: 'Software Engineering Intern',
    company: 'Stripe',
    companyLogo: 'https://logo.clearbit.com/stripe.com',
    companyLogoAlt: 'Stripe company logo — blue gradient wordmark on white background',
    location: 'San Francisco, CA',
    category: 'tech',
    type: 'full-time',
    duration: '12 weeks',
    stipend: '$8,500/mo',
    postedDate: '2026-04-18',
    deadline: '2026-05-10',
    description:
      'Work on Stripe\u2019s core payments infrastructure. Build APIs used by millions of developers worldwide. Collaborate with senior engineers on real production systems.',
    skills: ['TypeScript', 'Go', 'Distributed Systems', 'REST APIs'],
    applyUrl: 'https://stripe.com/jobs',
    status: 'open',
    isNew: true,
    openings: 4,
  },
  {
    id: 'intern-002',
    title: 'Product Design Intern',
    company: 'Figma',
    companyLogo: 'https://logo.clearbit.com/figma.com',
    companyLogoAlt: 'Figma logo — multicolor vector design tool brand mark',
    location: 'Work From Home',
    category: 'design',
    type: 'work from home',
    duration: '10 weeks',
    stipend: '$7,200/mo',
    postedDate: '2026-04-20',
    deadline: '2026-05-03',
    description:
      'Shape the future of design tooling at Figma. Work alongside product designers to create intuitive interfaces for millions of creators globally.',
    skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
    applyUrl: 'https://figma.com/careers',
    status: 'urgent',
    isNew: true,
    openings: 2,
  },
  {
    id: 'intern-003',
    title: 'Investment Banking Analyst Intern',
    company: 'Goldman Sachs',
    companyLogo: 'https://logo.clearbit.com/goldmansachs.com',
    companyLogoAlt: 'Goldman Sachs logo — blue square with white text on white background',
    location: 'New York, NY',
    category: 'finance',
    type: 'full-time',
    duration: '10 weeks',
    stipend: '$10,000/mo',
    postedDate: '2026-04-15',
    deadline: '2026-05-15',
    description:
      'Join the TMT group at Goldman for a summer analyst program. Participate in live deal work, financial modeling, and client presentations.',
    skills: ['Financial Modeling', 'Excel', 'PowerPoint', 'Bloomberg'],
    applyUrl: 'https://goldmansachs.com/careers',
    status: 'open',
    isNew: false,
    openings: 10,
  },
  {
    id: 'intern-004',
    title: 'Data Science Intern',
    company: 'Spotify',
    companyLogo: 'https://logo.clearbit.com/spotify.com',
    companyLogoAlt: 'Spotify logo — green circle with black soundwaves brand mark',
    location: 'Work From Home',
    category: 'data',
    type: 'work from home',
    duration: '16 weeks',
    stipend: '$6,800/mo',
    postedDate: '2026-04-19',
    deadline: '2026-05-20',
    description:
      'Use machine learning to improve music recommendations for 600M+ users. Work with massive datasets and deploy models that directly affect listener experience.',
    skills: ['Python', 'SQL', 'PyTorch', 'A/B Testing', 'Spark'],
    applyUrl: 'https://lifeatspotify.com',
    status: 'open',
    isNew: true,
    openings: 3,
  },
  {
    id: 'intern-005',
    title: 'Growth Marketing Intern',
    company: 'Notion',
    companyLogo: 'https://logo.clearbit.com/notion.so',
    companyLogoAlt: 'Notion logo — black square with white N letter mark',
    location: 'San Francisco, CA',
    category: 'marketing',
    type: 'hybrid',
    duration: '12 weeks',
    stipend: '$5,500/mo',
    postedDate: '2026-04-10',
    deadline: '2026-04-28',
    description:
      'Drive user acquisition campaigns across paid, SEO, and community channels. Analyze funnel metrics and run growth experiments for Notion\u2019s B2B product.',
    skills: ['Google Analytics', 'SEO', 'Paid Ads', 'Copywriting', 'SQL'],
    applyUrl: 'https://notion.so/careers',
    status: 'urgent',
    isNew: false,
    openings: 1,
  },
  {
    id: 'intern-006',
    title: 'Operations Analyst Intern',
    company: 'Flexport',
    companyLogo: 'https://logo.clearbit.com/flexport.com',
    companyLogoAlt: 'Flexport logo — blue geometric cargo ship abstraction on white',
    location: 'Chicago, IL',
    category: 'operations',
    type: 'full-time',
    duration: '8 weeks',
    stipend: '$4,800/mo',
    postedDate: '2026-04-08',
    deadline: '2026-05-05',
    description:
      'Optimize global freight operations using data-driven analysis. Build dashboards, streamline workflows, and work cross-functionally with logistics teams.',
    skills: ['Excel', 'Tableau', 'SQL', 'Process Mapping', 'Lean'],
    applyUrl: 'https://flexport.com/careers',
    status: 'open',
    isNew: false,
    openings: 5,
  },
  {
    id: 'intern-007',
    title: 'Frontend Engineering Intern',
    company: 'Vercel',
    companyLogo: 'https://logo.clearbit.com/vercel.com',
    companyLogoAlt: 'Vercel logo — black triangle pointing upward on white background',
    location: 'Work From Home',
    category: 'tech',
    type: 'work from home',
    duration: '12 weeks',
    stipend: '$7,500/mo',
    postedDate: '2026-04-21',
    deadline: '2026-05-25',
    description:
      'Build UI components for Vercel\u2019s developer dashboard used by 1M+ teams. Work with Next.js, React, and edge infrastructure in a fast-paced environment.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
    applyUrl: 'https://vercel.com/careers',
    status: 'open',
    isNew: true,
    openings: 2,
  },
  {
    id: 'intern-008',
    title: 'Corporate Finance Intern',
    company: 'Airbnb',
    companyLogo: 'https://logo.clearbit.com/airbnb.com',
    companyLogoAlt: 'Airbnb logo — red bélo symbol on white background',
    location: 'San Francisco, CA',
    category: 'finance',
    type: 'full-time',
    duration: '12 weeks',
    stipend: '$7,800/mo',
    postedDate: '2026-04-12',
    deadline: '2026-05-01',
    description:
      'Support FP&A and treasury functions at Airbnb. Build financial models, assist with quarterly forecasting, and present findings to senior finance leaders.',
    skills: ['Financial Modeling', 'Excel', 'Forecasting', 'Variance Analysis'],
    applyUrl: 'https://careers.airbnb.com',
    status: 'open',
    isNew: false,
    openings: 3,
  },
  {
    id: 'intern-009',
    title: 'UX Research Intern',
    company: 'Atlassian',
    companyLogo: 'https://logo.clearbit.com/atlassian.com',
    companyLogoAlt: 'Atlassian logo — blue gradient mountain shape on white background',
    location: 'Austin, TX',
    category: 'design',
    type: 'hybrid',
    duration: '10 weeks',
    stipend: '$5,200/mo',
    postedDate: '2026-04-14',
    deadline: '2026-05-12',
    description:
      'Conduct user interviews, usability studies, and synthesize insights to inform Jira and Confluence product decisions. Partner closely with product and design teams.',
    skills: ['User Interviews', 'Usability Testing', 'Figma', 'Research Synthesis'],
    applyUrl: 'https://atlassian.com/careers',
    status: 'open',
    isNew: false,
    openings: 2,
  },
  {
    id: 'intern-010',
    title: 'People Operations Intern',
    company: 'HubSpot',
    companyLogo: 'https://logo.clearbit.com/hubspot.com',
    companyLogoAlt: 'HubSpot logo — orange sprocket gear mark with HubSpot text',
    location: 'Boston, MA',
    category: 'hr',
    type: 'hybrid',
    duration: '8 weeks',
    stipend: '$3,800/mo',
    postedDate: '2026-04-09',
    deadline: '2026-04-30',
    description:
      "Support HubSpot's recruiting and onboarding operations. Help coordinate intern programs, build HR dashboards, and improve employee experience workflows.",
    skills: ['HRIS', 'Recruiting Coordination', 'Google Workspace', 'Data Entry'],
    applyUrl: 'https://hubspot.com/careers',
    status: 'urgent',
    isNew: false,
    openings: 1,
  },
  {
    id: 'intern-011',
    title: 'Machine Learning Intern',
    company: 'DeepMind',
    companyLogo: 'https://logo.clearbit.com/deepmind.com',
    companyLogoAlt: 'DeepMind logo — blue gradient geometric diamond on white background',
    location: 'London, UK',
    category: 'data',
    type: 'full-time',
    duration: '16 weeks',
    stipend: '$9,500/mo',
    postedDate: '2026-04-17',
    deadline: '2026-05-30',
    description:
      'Research and implement novel ML architectures at one of the world\u2019s leading AI labs. Work alongside researchers publishing at NeurIPS, ICML, and ICLR.',
    skills: ['PyTorch', 'JAX', 'Research', 'Linear Algebra', 'Python'],
    applyUrl: 'https://deepmind.google/careers',
    status: 'open',
    isNew: false,
    openings: 6,
  },
  {
    id: 'intern-012',
    title: 'Legal Intern — Technology',
    company: 'Palantir',
    companyLogo: 'https://logo.clearbit.com/palantir.com',
    companyLogoAlt: 'Palantir logo — dark blue circle with white ring mark',
    location: 'New York, NY',
    category: 'legal',
    type: 'full-time',
    duration: '10 weeks',
    stipend: '$5,000/mo',
    postedDate: '2026-04-11',
    deadline: '2026-05-08',
    description:
      "Support Palantir's legal team on contracts, IP, and regulatory compliance matters. Work on cutting-edge technology law issues in AI and data privacy.",
    skills: ['Contract Review', 'IP Law', 'GDPR', 'Legal Research', 'Drafting'],
    applyUrl: 'https://palantir.com/careers',
    status: 'open',
    isNew: false,
    openings: 2,
  },
];

export const CATEGORIES: { value: InternshipCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Fields' },
  { value: 'tech', label: 'Technology' },
  { value: 'finance', label: 'Finance' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'data', label: 'Data & Analytics' },
  { value: 'operations', label: 'Operations' },
  { value: 'legal', label: 'Legal' },
  { value: 'hr', label: 'Human Resources' },
];

export const TYPES: { value: InternshipType | 'all'; label: string }[] = [
  { value: 'all', label: 'All Types' },
  { value: 'full-time', label: 'Full-time' },
  { value: 'part-time', label: 'Part-time' },
  { value: 'work from home', label: 'Work From Home' },
  { value: 'hybrid', label: 'Hybrid' },
];

export const LOCATIONS: string[] = [
  'All Locations',
  'Work From Home',
  'Bangalore',
  'Hyderabad',
  'Pune',
  'Mumbai',
  'New Delhi',
  'Chennai',
  'Gurgaon',
];

export const DURATIONS: { value: string; label: string }[] = [
  { value: 'all', label: 'All Durations' },
  { value: '1-2', label: '1 – 2 Months' },
  { value: '3-4', label: '3 – 4 Months' },
  { value: '5-6', label: '5 – 6 Months' },
  { value: '6+', label: '6+ Months' },
];
