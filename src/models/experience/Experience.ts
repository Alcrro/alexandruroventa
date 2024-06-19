import { iExperience } from "@/types";
import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema<iExperience>({
  idIncNumber: { type: Number },
  startYear: { type: Date },
  currentYear: { type: Date },
  endYear: { type: Date },
  isEnded: { type: Boolean },
  className: { type: String },
  titleDescription: { type: String },
  descriptionMore: { type: String },
});

experienceSchema.pre("save", function (next) {
  if (this.isEnded === false) {
    this.currentYear = new Date();

    this.endYear = null;
  }

  next();
});

const Experience =
  mongoose.models.experience || mongoose.model("experience", experienceSchema);

export default Experience;
