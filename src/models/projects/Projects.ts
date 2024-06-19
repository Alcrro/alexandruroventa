import mongoose from "mongoose";

export interface IProjectsSchema {
  title: string;
  link: string;
  thumbnailPhoto: string;
  languagesUsed: [];
  gitRepository: string;
  hosted: string;
  moreDescription: string;
}

const projectsSchema = new mongoose.Schema<IProjectsSchema>({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  thumbnailPhoto: {
    type: String,
    required: true,
  },

  languagesUsed: {
    type: [],
    required: true,
  },
  gitRepository: {
    type: String,
    required: true,
  },
  hosted: {
    type: String,
    required: true,
  },
  moreDescription: {
    type: String,
    required: true,
  },
});

const Projects =
  mongoose.models.projects || mongoose.model("projects", projectsSchema);

export default Projects;
