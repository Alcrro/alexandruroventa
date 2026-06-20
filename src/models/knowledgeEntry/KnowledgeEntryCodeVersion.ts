import mongoose from "mongoose";

const codeVersionSchema = new mongoose.Schema({
  code: { type: String },
  versionCode: { type: String },
  date: { type: Date, default: new Date() },
  title_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "languageSKillContent",
  },
});

const KnowledgeEntryCodeVersion =
  mongoose.models.CodeVersion ||
  mongoose.model("CodeVersion", codeVersionSchema);

export default KnowledgeEntryCodeVersion;
