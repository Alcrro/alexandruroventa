interface IPerformance {
  skillName: string;
  link: string;
}

export interface iLanguageSkillGet {
  success: boolean;
  message: string;
  languagesSkills: IPerformance[];
}

export interface iModuleType {
  category: string;
  languageType: string;
  name: string;
  description: string;
  dataCreated: string;
}

export interface iExperience {
  _id: object;
  idIncNumber: number;
  startYear: Date;
  currentYear: Date | null;
  endYear: Date | null;
  isEnded: boolean;
  className: string;
  titleDescription: string;
  descriptionMore: string;
}

export interface iCertificate {
  organization: string;
  languageLearnt: string;
  author: string[];
  date: Date;
  src: string;
  slug: string;
}
export interface iDocument {
  category: string;
  dataId: string;
  description: string;
  hour: string;
  id: number;
  moduleType: string;
  name: string;
  performance: string;
  year: string;
}

export interface iPerformanceDocument {
  languageType: string;
  contentTitle: string;
  contentDescription: string;
  codVersion: string;
  dateVersion: Date;
}

export interface IHeader {
  category: string;
  languageType: string;
  contentTitle: string;
  contentDescription: string;
  slug: string;
}

export interface IProjectsSchema {
  title: string;
  link: string;
  thumbnailPhoto: string;
  languagesUsed: [];
  gitRepository: string;
  hosted: string;
  moreDescription: string;
}

export interface EmailTemplateProps {
  email: string;
}