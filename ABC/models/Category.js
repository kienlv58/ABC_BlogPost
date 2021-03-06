const mongoose = require("mongoose");
const Post = require("./Post");

const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, unique: true },
    slug: { type: String },
    description: { type: String },
    isRoot: { type: Boolean },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    subCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    status: { type: Number } //1: active 0: inactive
  },
  { timestamps: true, usePushEach: true }
);

categorySchema.set("toJSON", {
  vitruals: true
});

categorySchema.virtual("statusDisplay").get(function() {
  return this.status ? "Public" : "Draft";
});

/*
Romove category
*/

categorySchema.pre("remove", function(next) {
  var category = this;
  category.model("Post").remove({ _id: { $in: category.posts } }, next);
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
