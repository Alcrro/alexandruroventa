import { getRandomUppercaseString } from "@/_lib/languageSkill/slugModuleAlgorith";
import mongoose from "mongoose";

const LanguageSkillContentSchema = new mongoose.Schema({
  category: {
    type: String,
  },
  languageType: {
    type: String,
    required: [true, "Please provide the type of this category"],
    enum: ["course", "project"],
  },
  uniqueNumberByCategory: {
    type: Number,
  },
  unique_id: {
    type: String,
    unique: true,
  },
  contentTitle: {
    type: String,
    required: [true, "Please provide the name of this course"],
    // minLength: [20, "You need to write at least 20 characters"],
    // maxLength: [100, "Your name is to long, 100 characters are allowed"],

    trim: true,
  },
  contentDescription: {
    type: String,
    required: [true, "Please provide a description of this category"],
    // minLength: [100, "You need to write at least 100 characters"],
    // maxLength: [400, "Your description is to long, 400 characters are allowed"],
    trim: true,
  },
  slug: {
    type: String,
  },

  versionCode_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CodeVersion",
  },
});

LanguageSkillContentSchema.pre("save", function (next) {
  let slug = this.contentTitle + "-" + this.contentDescription;

  this.unique_id = getRandomUppercaseString(7);
  this.slug =
    slug.split(" ").join("-").toLocaleLowerCase() + "-" + this.unique_id;

  next();
});

const LanguageSKillContent =
  mongoose.models.languageSKillContent ||
  mongoose.model("languageSKillContent", LanguageSkillContentSchema);

export default LanguageSKillContent;
