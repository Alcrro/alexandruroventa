import mongoose from "mongoose";

const CertificatesSchema = new mongoose.Schema({
  src: { type: String, required: true, maxlength: 500 },
  organization: { type: String, maxlength: 200, trim: true },
  languageLearnt: { type: String, maxlength: 200, trim: true },
  author: { type: [String], default: [], validate: [(a: string[]) => a.length <= 10, "Max 10 autori"] },
  slug: { type: String, maxlength: 500 },
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
