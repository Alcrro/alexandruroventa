import mongoose from "mongoose";

const knowledgeCategorySchema = new mongoose.Schema({
  skillName: {
    type: String,
    required: [true, "Please provide a skill"],
    unique: true,
  },
  link: {
    type: String,
  },
});

knowledgeCategorySchema.pre("save", function (next) {
  this.link = this.skillName.replace(/[/]/g, "").replace(/\s+/g, "-");
  next();
});

const KnowledgeCategory =
  mongoose.models.languageSkill ||
  mongoose.model("languageSkill", knowledgeCategorySchema);

export default KnowledgeCategory;
