import mongoose from "mongoose";

const languageSkillSchema = new mongoose.Schema({
  skillName: {
    type: String,
    required: [true, "Please provide a skill"],
    unique: true,
  },
  link: {
    type: String,
  },
});

languageSkillSchema.pre("save", function (next) {
  const newSkillName = this.skillName
    .replace(/[/]/g, "")
    .replace(/\s{2}/g, "-");
  this.link =
    this.skillName.split(" ").length > 1 ? newSkillName : this.skillName;
  next();
});

const LanguageSkill =
  mongoose.models.languageSkill ||
  mongoose.model("languageSkill", languageSkillSchema);

export default LanguageSkill;
