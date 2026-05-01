import type { Internship } from './internshipData';
import { parseApiPostedDate } from './internshipData';

export const INTERNSHIPS_API_URL =
  'https://script.googleusercontent.com/macros/echo?user_content_key=AWDtjMVunf6UvGqCvarKNYA-uz2tsqo_W2-OKM93wNZBNS7zSzmMRI_wnQyPsoA7uUMMAMbM-UcJZbBhPCzEQZBJnJCv82VS53okuXvp-peAuPqpq1G3CbTBUKVBNape5JpQAsB9qZ8r4b5NHTMGNFb7HAroTMO8VCUbFvC_-aiUoFx6wi8UM4Vy2JITffpvCrzVJFNzaNSc1UEetSlfeODGx3sZHErC7yfsCXdknc0S5XhtH_mbOMZ5Mg8-sa0KlOHZUMpNkdhiNlU-Se_5yD84JPFBsDXt0g&lib=MxqwR3xljJVaCsDPPAiS9cMD_ru-QQO2K';

function readString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed) return trimmed;
    }
  }
  return '';
}

function readStringArray(...values: unknown[]): string[] {
  for (const value of values) {
    if (Array.isArray(value)) {
      return value.map((item) => (typeof item === 'string' ? item.trim() : '')).filter(Boolean);
    }

    if (typeof value === 'string') {
      return value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return [];
}

function normalizeLocation(location: string): string {
  const trimmed = location.trim();
  if (!trimmed) return 'Work From Home';

  const lowered = trimmed.toLowerCase();
  if (lowered === 'remote' || lowered === 'work from home') {
    return 'Work From Home';
  }

  return trimmed;
}

function normalizeType(type: string): Internship['type'] {
  const lowered = type.trim().toLowerCase();

  switch (lowered) {
    case 'part-time':
    case 'part time':
      return 'part-time';
    case 'work from home':
    case 'remote':
      return 'work from home';
    case 'hybrid':
      return 'hybrid';
    default:
      return 'full-time';
  }
}

function normalizeCategory(category: string): Internship['category'] {
  const lowered = category.trim().toLowerCase();

  switch (lowered) {
    case 'finance':
    case 'design':
    case 'marketing':
    case 'operations':
    case 'data':
    case 'legal':
    case 'hr':
      return lowered;
    default:
      return 'tech';
  }
}

function normalizeStatus(status: string): Internship['status'] {
  const lowered = status.trim().toLowerCase();

  switch (lowered) {
    case 'urgent':
    case 'closed':
      return lowered;
    default:
      return 'open';
  }
}

function normalizeSkills(skills: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const skill of skills) {
    const trimmed = skill.trim();
    if (!trimmed) continue;

    const key = trimmed.toLowerCase();
    if (seen.has(key)) continue;

    seen.add(key);
    result.push(trimmed);
  }

  return result;
}

function buildDedupKey(internship: Internship): string {
  const normalizedApplyUrl = internship.applyUrl.trim().toLowerCase();
  if (normalizedApplyUrl && normalizedApplyUrl !== '#') {
    return `url:${normalizedApplyUrl}`;
  }

  return [
    internship.title.trim().toLowerCase(),
    internship.company.trim().toLowerCase(),
    internship.location.trim().toLowerCase(),
    internship.duration.trim().toLowerCase(),
  ].join('|');
}

function parseStipendRange(
  raw: Record<string, unknown>
): Pick<Internship, 'minStipend' | 'maxStipend' | 'stipend'> {
  const minStipend = raw.min_monthly_stipend != null ? Number(raw.min_monthly_stipend) : null;
  const maxStipend = raw.max_monthly_stipend != null ? Number(raw.max_monthly_stipend) : null;

  let stipend = 'Unpaid';

  if (minStipend != null && maxStipend != null) {
    stipend =
      minStipend === maxStipend
        ? `₹${minStipend.toLocaleString('en-IN')}/mo`
        : `₹${minStipend.toLocaleString('en-IN')} – ₹${maxStipend.toLocaleString('en-IN')}/mo`;
  } else if (minStipend != null) {
    stipend = `₹${minStipend.toLocaleString('en-IN')}/mo`;
  } else if (maxStipend != null) {
    stipend = `₹${maxStipend.toLocaleString('en-IN')}/mo`;
  } else {
    stipend = readString(raw.stipend, raw.Stipend, raw.salary, raw.Salary) || 'Unpaid';
  }

  return { minStipend, maxStipend, stipend };
}

export function normalizeInternship(raw: unknown, index: number): Internship {
  const record = (raw ?? {}) as Record<string, unknown>;
  const locations = readStringArray(record.locations, record.location, record.Location).map(
    normalizeLocation
  );
  const normalizedLocations =
    locations.length > 0 ? Array.from(new Set(locations)) : ['Work From Home'];
  const company = readString(
    record.company,
    record.Company,
    record.organization,
    record.Organization
  );
  const title = readString(record.title, record.Title, record.role, record.Role) || 'Internship';
  const { minStipend, maxStipend, stipend } = parseStipendRange(record);

  const postedDate =
    readString(record.postedDate, record.posted_date, record.PostedDate, record.date_posted) ||
    new Date().toISOString().split('T')[0];

  return {
    id: readString(record.id, record.ID) || `intern-${index + 1}`,
    title,
    company,
    companyLogo: readString(record.companyLogo, record.logo, record.Logo),
    companyLogoAlt: readString(record.companyLogoAlt) || `${company} logo`,
    location: normalizedLocations[0],
    locations: normalizedLocations,
    category: normalizeCategory(readString(record.category, record.Category)),
    type: normalizeType(readString(record.type, record.Type, record.workType, record.work_type)),
    duration: readString(record.duration, record.Duration),
    stipend,
    minStipend,
    maxStipend,
    postedDate,
    deadline: readString(record.deadline, record.Deadline, record.applyBy, record.apply_by),
    description: readString(record.description, record.Description, record.about, record.About),
    skills: normalizeSkills(readStringArray(record.required_skills, record.skills, record.Skills)),
    applyUrl:
      readString(
        record.applyUrl,
        record.apply_url,
        record.applyLink,
        record.link,
        record.Link,
        record.job_description_url
      ) || '#',
    status: normalizeStatus(readString(record.status, record.Status)),
    isNew: Boolean(record.isNew ?? record.is_new),
    openings: Number(record.openings ?? record.Openings ?? record.vacancies ?? 1) || 1,
  };
}

export function dedupeInternships(internships: Internship[]): Internship[] {
  const seen = new Set<string>();
  const deduped: Internship[] = [];

  for (const internship of internships) {
    const key = buildDedupKey(internship);
    if (seen.has(key)) continue;

    seen.add(key);
    deduped.push(internship);
  }

  return deduped;
}

export async function fetchInternships(signal?: AbortSignal): Promise<Internship[]> {
  const res = await fetch(INTERNSHIPS_API_URL, { signal, cache: 'no-store' });
  if (!res.ok) throw new Error(`API error: ${res.status}`);

  const json = await res.json();
  const raw: unknown[] = Array.isArray(json)
    ? json
    : Array.isArray(json?.data)
      ? json.data
      : Array.isArray(json?.internships)
        ? json.internships
        : Array.isArray(json?.result)
          ? json.result
          : [];

  return dedupeInternships(raw.map(normalizeInternship));
}

export function parseStipendValue(stipend: string): number {
  const digits = stipend.replace(/[^0-9]/g, '');
  return Number.parseInt(digits, 10) || 0;
}

export function parseDeadlineDate(deadline: string): Date | null {
  if (!deadline) return null;

  const trimmed = deadline.trim();
  if (!trimmed) return null;

  const direct = new Date(trimmed);
  if (!Number.isNaN(direct.getTime())) return direct;

  const m = trimmed.match(/^(\d{1,2})\s+([A-Za-z]{3,})\.?,?['’]?\s*(\d{2,4})/);
  if (!m) return null;

  const day = Number.parseInt(m[1], 10);
  const monKey = m[2].slice(0, 3).toLowerCase();
  const yearRaw = Number.parseInt(m[3], 10);
  const year = yearRaw < 100 ? yearRaw + 2000 : yearRaw;

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
  if (month === undefined || Number.isNaN(day) || Number.isNaN(year)) return null;

  const parsed = new Date(year, month, day);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function isDeadlineExpired(deadline: string): boolean {
  const deadlineDate = parseDeadlineDate(deadline);
  if (!deadlineDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const deadlineDay = new Date(deadlineDate);
  deadlineDay.setHours(0, 0, 0, 0);

  return deadlineDay < today;
}

export function buildAvailableLocations(internships: Internship[]): string[] {
  const locations = new Set<string>();

  internships.forEach((internship) => {
    const values = internship.locations?.length ? internship.locations : [internship.location];
    values.forEach((location) => locations.add(normalizeLocation(location)));
  });

  return ['All Locations', ...Array.from(locations).sort((a, b) => a.localeCompare(b))];
}

export function buildAvailableSkills(internships: Internship[]): string[] {
  const skillsByKey = new Map<string, string>();

  internships.forEach((internship) => {
    internship.skills.forEach((skill) => {
      const trimmed = skill.trim();
      if (!trimmed) return;

      const key = trimmed.toLowerCase();
      if (!skillsByKey.has(key)) skillsByKey.set(key, trimmed);
    });
  });

  return Array.from(skillsByKey.values()).sort((a, b) => a.localeCompare(b));
}

export function sortByPostedDateDesc(internships: Internship[]): Internship[] {
  return [...internships].sort((a, b) => {
    const at = parseApiPostedDate(a.postedDate)?.getTime() ?? 0;
    const bt = parseApiPostedDate(b.postedDate)?.getTime() ?? 0;
    return bt - at;
  });
}

export function sortByDeadlineAsc(internships: Internship[]): Internship[] {
  return [...internships].sort((a, b) => {
    const at = parseDeadlineDate(a.deadline)?.getTime() ?? Number.POSITIVE_INFINITY;
    const bt = parseDeadlineDate(b.deadline)?.getTime() ?? Number.POSITIVE_INFINITY;
    return at - bt;
  });
}
