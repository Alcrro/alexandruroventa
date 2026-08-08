import { iExperience } from "@/types";
import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema<iExperience>({
  idIncNumber: { type: Number },
  startYear: { type: Date },
  currentYear: { type: Date, default: null },
  endYear: { type: Date },
  isEnded: { type: Boolean },
  className: { type: String, maxlength: 100 },
  companyLogo: { type: String, default: null, maxlength: 500 },
  titleDescription: { type: String, maxlength: 300 },
  descriptionMore: { type: String, maxlength: 5000 },
});

experienceSchema.pre("save", function (next) {
  if (this.isEnded === true) {
    this.currentYear = new Date();

    this.endYear = null;
  }

  next();
});

const Experience =
  mongoose.models.experience || mongoose.model("experience", experienceSchema);

export default Experience;
