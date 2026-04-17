import { JobListing } from '@/types';

// Mock H1B sponsor company jobs
const MOCK_JOBS: JobListing[] = [
  {
    id: 'google-001',
    title: 'Software Engineer, Backend',
    company: 'Google',
    location: 'Mountain View, CA',
    description: 'Join Google\'s infrastructure team. Build scalable systems handling billions of requests. Experience with distributed systems, databases, and cloud infrastructure required.',
    url: 'https://careers.google.com/jobs/backend-engineer',
    source: 'google-careers',
    isSponsorCompany: true,
    skills: ['Python', 'Go', 'Kubernetes', 'Docker', 'GCP', 'SQL', 'Microservices'],
    postedAt: '2026-04-01'
  },
  {
    id: 'meta-001',
    title: 'Full Stack Engineer',
    company: 'Meta',
    location: 'Menlo Park, CA',
    description: 'Build features for billions of users. Work on React, GraphQL, and backend systems. Strong CS fundamentals required.',
    url: 'https://careers.meta.com/jobs/full-stack-engineer',
    source: 'meta-careers',
    isSponsorCompany: true,
    skills: ['React', 'TypeScript', 'GraphQL', 'Python', 'Hack', 'AWS', 'SQL'],
    postedAt: '2026-04-05'
  },
  {
    id: 'amazon-001',
    title: 'SDE - Cloud Services',
    company: 'Amazon',
    location: 'Seattle, WA',
    description: 'Develop cloud infrastructure for AWS. Work with large-scale distributed systems. Leadership principles and customer obsession required.',
    url: 'https://careers.amazon.com/jobs/cloud-engineer',
    source: 'amazon-careers',
    isSponsorCompany: true,
    skills: ['Java', 'C++', 'AWS', 'Docker', 'Kubernetes', 'DynamoDB', 'Microservices'],
    postedAt: '2026-04-02'
  },
  {
    id: 'microsoft-001',
    title: 'Software Engineer - AI Platform',
    company: 'Microsoft',
    location: 'Redmond, WA',
    description: 'Build AI infrastructure and tools. Work with machine learning platforms, cloud services, and modern DevOps. Passion for technology innovation required.',
    url: 'https://careers.microsoft.com/jobs/ai-platform',
    source: 'microsoft-careers',
    isSponsorCompany: true,
    skills: ['Python', 'C#', 'Azure', 'Machine Learning', 'Kubernetes', 'SQL', 'REST API'],
    postedAt: '2026-04-03'
  },
  {
    id: 'stripe-001',
    title: 'Backend Engineer',
    company: 'Stripe',
    location: 'San Francisco, CA',
    description: 'Build payment infrastructure. Work on high-performance systems handling financial transactions. Strong problem-solving skills required.',
    url: 'https://careers.stripe.com/jobs/backend-engineer',
    source: 'stripe-careers',
    isSponsorCompany: true,
    skills: ['Python', 'Go', 'PostgreSQL', 'Redis', 'AWS', 'REST API', 'Microservices'],
    postedAt: '2026-04-04'
  },
  {
    id: 'uber-001',
    title: 'Full Stack Engineer',
    company: 'Uber',
    location: 'San Francisco, CA',
    description: 'Work on Uber\'s core platform. Build services used by millions. Experience with web and backend systems required.',
    url: 'https://careers.uber.com/jobs/full-stack',
    source: 'uber-careers',
    isSponsorCompany: true,
    skills: ['Node.js', 'React', 'Python', 'Java', 'Kafka', 'Microservices', 'SQL'],
    postedAt: '2026-03-30'
  },
  {
    id: 'airbnb-001',
    title: 'Software Engineer - Infrastructure',
    company: 'Airbnb',
    location: 'San Francisco, CA',
    description: 'Build infrastructure for global platform. Work on deployment systems, observability, and cloud infrastructure.',
    url: 'https://careers.airbnb.com/jobs/infrastructure',
    source: 'airbnb-careers',
    isSponsorCompany: true,
    skills: ['Python', 'Kubernetes', 'Docker', 'Go', 'AWS', 'CI/CD', 'Infrastructure-as-Code'],
    postedAt: '2026-04-06'
  },
  {
    id: 'salesforce-001',
    title: 'Senior Software Engineer',
    company: 'Salesforce',
    location: 'San Francisco, CA',
    description: 'Develop cloud solutions for enterprise customers. Work on scalable systems. Experience with Java and cloud platforms required.',
    url: 'https://careers.salesforce.com/jobs/senior-engineer',
    source: 'salesforce-careers',
    isSponsorCompany: true,
    skills: ['Java', 'JavaScript', 'Apex', 'AWS', 'SQL', 'REST API', 'Cloud Architecture'],
    postedAt: '2026-04-07'
  }
];

/**
 * Calculate match score between user skills and job requirements
 * Considers skill overlap and sponsor company bonus
 */
function calculateMatchScore(
  userSkills: string[],
  jobSkills: string[],
  isSponsorCompany: boolean
): number {
  // Normalize skills to lowercase for comparison
  const userSkillsLower = userSkills.map(s => s.toLowerCase());
  const jobSkillsLower = jobSkills.map(s => s.toLowerCase());

  // Calculate skill overlap
  const matchedSkills = jobSkillsLower.filter(skill =>
    userSkillsLower.some(userSkill =>
      userSkill.includes(skill) || skill.includes(userSkill)
    )
  );

  let score = (matchedSkills.length / Math.max(jobSkillsLower.length, 1)) * 100;

  // Add sponsor company bonus
  if (isSponsorCompany) {
    score += 10;
  }

  // Cap at 100
  return Math.min(score, 100);
}

/**
 * Match user profile against available H1B sponsor company jobs
 */
export function matchJobs(
  targetRoles: string[],
  userSkills: string[]
): JobListing[] {
  const matchedJobs = MOCK_JOBS
    .map(job => {
      // Check if job title matches target roles
      const titleMatch = targetRoles.some(role =>
        job.title.toLowerCase().includes(role.toLowerCase())
      );

      if (!titleMatch) {
        return null;
      }

      const matchScore = calculateMatchScore(
        userSkills,
        job.skills,
        job.isSponsorCompany
      );

      return {
        ...job,
        matchScore
      };
    })
    .filter((job): job is NonNullable<typeof job> => job !== null)
    .sort((a, b) => (b.matchScore ?? 0) - (a.matchScore ?? 0));

  // Return top matches
  return matchedJobs.slice(0, 8);
}

/**
 * Get all available H1B sponsor jobs
 */
export function getAllSponsorJobs(): JobListing[] {
  return MOCK_JOBS;
}

/**
 * Get job details by ID
 */
export function getJobById(id: string): JobListing | undefined {
  return MOCK_JOBS.find(job => job.id === id);
}
