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
