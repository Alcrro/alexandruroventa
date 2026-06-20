import { getRandomUppercaseString } from "@/_lib/knowledgeEntry/slugModuleAlgorith";
import mongoose from "mongoose";

const knowledgeEntrySchema = new mongoose.Schema({
  category: { type: String },
  languageType: {
    type: String,
    required: [true, "Please provide the type of this category"],
    enum: ["course", "project"],
  },
  uniqueNumberByCategory: { type: Number },
  unique_id: { type: String, unique: true },
  contentTitle: {
    type: String,
    required: [true, "Please provide the name of this course"],
    trim: true,
  },
  contentDescription: {
    type: String,
    required: [true, "Please provide a description of this category"],
    trim: true,
  },
  slug: { type: String },
  versionCode_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CodeVersion",
  },
  ratingSum: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
});

knowledgeEntrySchema.pre("save", function (next) {
  const slug = this.contentTitle + "-" + this.contentDescription;
  this.unique_id = getRandomUppercaseString(7);
  this.slug = slug.split(" ").join("-").toLocaleLowerCase() + "-" + this.unique_id;
  next();
});

const KnowledgeEntry =
  mongoose.models.languageSKillContent ||
  mongoose.model("languageSKillContent", knowledgeEntrySchema);

export default KnowledgeEntry;
