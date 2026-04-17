export interface ResumeAnalysis {
  overallScore: number;
  sections: {
    format: { score: number; feedback: string[]; suggestions: string[] };
    content: { score: number; feedback: string[]; suggestions: string[] };
    keywords: { found: string[]; missing: string[]; industryRelevance: number };
    experience: { score: number; feedback: string[]; impactStatements: { original: string; improved: string }[] };
    education: { score: number; feedback: string[] };
  };
  summary: string;
  topImprovements: string[];
  targetRoles: string[];
  atsCompatibility: number;
}

export interface JDAnalysis {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  keywordGaps: string[];
  tailoredSuggestions: {
    section: string;
    current: string;
    suggested: string;
    reason: string;
  }[];
  summary: string;
  competitiveAdvantages: string[];
  redFlags: string[];
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  url: string;
  source: string;
  isSponsorCompany: boolean;
  skills: string[];
  postedAt: string;
  matchScore?: number;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  subscriptionTier: 'free' | 'pro' | 'premium';
  analysesUsedThisMonth: number;
}
