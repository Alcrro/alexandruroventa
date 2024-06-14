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
