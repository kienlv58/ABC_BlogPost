const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    tagName: { type: String, unique: true },
    slug: { type: String },
    news: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    status: { type: Number } // 1: active, 0: inActive
  },
  { timestamps: true, usePushEach: true }
);

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
