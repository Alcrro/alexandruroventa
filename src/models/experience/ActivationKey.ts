import mongoose from "mongoose";

const ActivationKeySchema = new mongoose.Schema({
  keyActivated: {
    type: Boolean,
    default: false,
  },

  theKey: {
    type: String,
  },
});

const ActivationKey =
  mongoose.models.ActivationKey ||
  mongoose.model("ActivationKey", ActivationKeySchema);

export default ActivationKey;
