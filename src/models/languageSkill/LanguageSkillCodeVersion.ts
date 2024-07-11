import mongoose from "mongoose";

const CodeVersionSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    default: new Date(),
  },

  title_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "languageSKillContent",
  },
});

const CodeVersion =
  mongoose.models.CodeVersion ||
  mongoose.model("CodeVersion", CodeVersionSchema);

export default CodeVersion;
