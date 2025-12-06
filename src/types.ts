export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  status: 'In Development' | 'Completed' | 'Archived';
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  year: string;
  description: string;
  projects: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'AI/ML' | 'Tools';
  icon?: string; // Icon name from lucide
}

export interface Social {
  id: string;
  platform_name: string;
  url: string;
  handle: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  year: string;
  url: string;
}

export interface UserProfile {
  name: string;
  headline: string;
  avatarUrl: string;
  aboutMarkdown: string;
  resumeUrl: string;
}