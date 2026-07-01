interface IPerformance {
  skillName: string;
  link: string;
}

export interface iKnowledgeCategoryGet {
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
  companyLogo?: string;
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

export interface CertificatesResponse {
  data: iCertificate[];
  totalDocuments: number;
  page: number;
  documentsPerPage: number;
  orgs: string[];
  langs: string[];
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
  slug: string;
  uniqueNumberByCategory: number;
  codeversions_details: {
    codVersion: string;
    dateVersion: Date;
  };
  totalDocuments: string;
  page: string;
  documentsPerPage: string;
}

export interface IHeader {
  category: string;
  languageType: string;
  contentTitle: string;
  contentDescription: string;
  slug: string;
}

export interface IProjectsSchema {
  _id: string;
  title: string;
  slug?: string;
  link: string;
  thumbnailPhoto: string;
  languagesUsed: string[];
  gitRepository: string;
  hosted: string;
  moreDescription: string;
}

export type RoadmapStatus = "done" | "in-progress" | "not-started";

export interface IRoadmapFeature {
  name: string;
  status: RoadmapStatus;
}

export interface ISchemaField {
  name: string;
  type: string;
  required?: boolean;
  isRef?: boolean;
}

export interface ISchemaNode {
  id: string;
  collection: string;
  color: string;
  x: number;
  y: number;
  fields: ISchemaField[];
  detail: string;
}

export interface ISchemaEdge {
  id: string;
  source: string;
  sourceHandle?: string;
  target: string;
  targetHandle?: string;
  label?: string;
  animated?: boolean;
  color?: string;
  dashed?: boolean;
}

export interface IProjectSchema {
  nodes: ISchemaNode[];
  edges: ISchemaEdge[];
}

export interface IGithubProject {
  id: number;
  title: string;
  slug: string;
  description: string;
  link: string;
  gitRepository: string;
  backendRepository?: string;
  languagesUsed: string[];
  screenshotUrl: string;
  ogImageUrl: string;
  status: "live" | "wip";
  isDeployed: boolean;
  updatedAt: string;
  roadmap?: IRoadmapFeature[];
  schema?: IProjectSchema;
}

