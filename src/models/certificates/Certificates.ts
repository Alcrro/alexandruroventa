import mongoose from "mongoose";

const CertificatesSchema = new mongoose.Schema({
  src: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
  },
  languageLearnt: {
    type: String,
  },
  author: {
    type: Array,
  },
  slug: {
    type: String,
  },
  date: { type: Date },
});

CertificatesSchema.pre("save", function (next) {
  let dateSlug = this.date?.toString().replace(/T.*/, "");

  let languageLearntSlug = this.languageLearnt?.replace(/[ ,&]/g, "-");
  this.slug =
    this.organization +
    "-" +
    languageLearntSlug +
    "-" +
    dateSlug +
    "-" +
    this._id;
  next();
});

const Certificates =
  mongoose.models.certificates ||
  mongoose.model("certificates", CertificatesSchema);

export default Certificates;
