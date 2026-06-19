import mongoose from "mongoose";
import { IProjectsSchema } from "@/types";

const projectsSchema = new mongoose.Schema<IProjectsSchema>({
  title: { type: String, required: true },
  slug: { type: String },
  link: { type: String, required: true },
  thumbnailPhoto: { type: String, required: true },
  languagesUsed: { type: [String], required: true },
  gitRepository: { type: String, required: true },
  hosted: { type: String, required: true },
  moreDescription: { type: String, default: "" },
});

projectsSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  next();
});

const Projects = mongoose.models.projects || mongoose.model("projects", projectsSchema);

export default Projects;
