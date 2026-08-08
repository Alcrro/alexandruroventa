import mongoose from "mongoose";

const SkillSchema = new mongoose.Schema({
  skillName: { type: String, required: true, unique: true, maxlength: 100, trim: true },
  category: {
    type: String,
    required: true,
    enum: ["Frontend", "Backend", "Database", "DevOps", "Tools"],
    default: "Tools",
  },
  level: {
    type: String,
    required: true,
    enum: ["beginner", "intermediate", "advanced"],
    default: "intermediate",
  },
  icon: { type: String, default: "", maxlength: 200 },
});

const Skill = mongoose.models.Skill || mongoose.model("Skill", SkillSchema);

export default Skill;
