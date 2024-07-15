import { IProjectsSchema } from "@/types";
import mongoose from "mongoose";

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
