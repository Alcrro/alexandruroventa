import mongoose from "mongoose";

const languageContentSchema = new mongoose.Schema({
  code: {
    type: String,
    // minLength: [20, "You need to write at least 20 characters"],
    // maxLength: [100, "Your name is to long, 100 characters are allowed"],
  },
  versionCode: {
    type: String,
    // minLength: [20, "You need to write at least 20 characters"],
    // maxLength: [100, "Your name is to long, 100 characters are allowed"], },
  },
});

const LanguageContent =
  mongoose.models.LanguageContent ||
  mongoose.model("LanguageContent", languageContentSchema);

export default LanguageContent;
