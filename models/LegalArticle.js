// models/LegalArticle.js
import mongoose from "mongoose";
import User from '@/models/User';

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});
const linkSchema = new mongoose.Schema({
  linkTitle: { type: String, required: true },
  linkUrl: { type: String, required: true },
});



const legalArticleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true },
  subcategories: [{ type: String }],
  legal_acts: [{ type: String }],
  links: [linkSchema],
  faqs: [faqSchema],
  examples: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  last_updated: { type: Date, default: Date.now },
  language: { type: String, default: "English" },
  status: { type: String, enum: ["published", "draft"], default: "draft" },
  meta: {
    meta_title: { type: String },
    keywords: [{ type: String }],
  },
});










export default mongoose.models.LegalArticle ||
  mongoose.model("LegalArticle", legalArticleSchema);


// const legalArticleSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true }, // HTML or Markdown

//   category: { type: String }, // e.g., "Property Law", "Women's Rights"
//   tags: {
//     profession: [{ type: String }],
//     region: [{ type: String }],
//     religion: [{ type: String }],
//     audience: [{ type: String }] // e.g., women, senior citizens
//   },

//   references: [{ type: String }], // external sources or law links
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // should be admin
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date }
// });

// export default mongoose.models.LegalArticle || mongoose.model('LegalArticle', legalArticleSchema);
