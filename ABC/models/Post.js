const mongoose = require("mongoose");
const Category = require("./Category");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    brief: { type: String },
    content: { type: String },
    images: { type: String },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    /* Seo  */
    seo: {
      htmlMetaTitle: { type: String },
      htmlMetaDescription: { type: String },
      htmlMetaKeywords: { type: String }
    },
    /* End Seo */
    publishAt: { type: Date },
    status: { type: Number }, //1: active 0:inactive
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Account" }
  },
  { timestamps: true, usePushEach: true }
);

postSchema.set("toJSON", {
  vitruals: true
});

/**
 * Function get images full url
 */
postSchema.virtual("imageUrl").get(function() {
  let images = JSON.parse(this.images);

  return process.env.MEDIA_URL + "/images/news/thumb/" + images[0];
});

/**
 * Function get status
 */
postSchema.virtual("statusDisplay").get(function() {
  return this.status ? "Public" : "Draft";
});

postSchema.statics.cCreate = function(data, cb) {
  let newPost = new Post(data);
  newPost.save((err, post) => {
    if (post.category) {
      Category.findById(post.category).exec((err, category) => {
        if (category) {
          category.posts.push(post._id);
          category.save();
        }
        cb(err, post);
      });
    }
  });
};

/**
 * Remove post from category
 */

postSchema.pre("remove", function(next) {
  var post = this;
  post.model("Category").update(
    { _id: post.category },
    {
      $pull: { posts: post._id }
    },
    next
  );
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
