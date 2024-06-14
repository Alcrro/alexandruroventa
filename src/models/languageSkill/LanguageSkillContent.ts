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
  name: {
    type: String,
    required: [true, "Please provide the name of this course"],
    // minLength: [20, "You need to write at least 20 characters"],
    // maxLength: [100, "Your name is to long, 100 characters are allowed"],

    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a description of this category"],
    // minLength: [100, "You need to write at least 100 characters"],
    // maxLength: [400, "Your description is to long, 400 characters are allowed"],
    trim: true,
  },

  dataCreated: {
    type: String,
  },
});

LanguageSkillContentSchema.pre("save", function (next) {
  const today = new Date();

  this.dataCreated = today.toLocaleDateString("en-US");
  next();
});

const LanguageSKillContent =
  mongoose.models.languageSKillContent ||
  mongoose.model("languageSKillContent", LanguageSkillContentSchema);

export default LanguageSKillContent;
