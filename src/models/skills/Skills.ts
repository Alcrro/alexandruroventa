import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
  skillName: {
    type: String,
    required: true,
  },
});

const Skill = mongoose.models.Skill || mongoose.model("Skill", SkillSchema);

export default Skill;
