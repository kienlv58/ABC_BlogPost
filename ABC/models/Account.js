const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

var ROLE = {
  ADMIN: "admin",
  CONTRIBUTOR: "contributor"
};
const userSchema = new mongoose.Schema(
  {
    userName: { type: String, unique: true, index: true },
    password: { type: String },
    displayName: { type: String },
    role: { type: String },
    avatar: { type: String },
    email: { type: String, unique: true, index: true },
    facebookID: { type: String },
    googleID: { type: String }
  },
  { timestamps: true, usePushEach: true }
);

userSchema.set("toJSON", {
  virtuals: true
});

/**
 * Password hash middleware.
 */
userSchema.pre("save", function save(next) {
  const account = this;
  if (!account.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(account.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      account.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Function get avatar image url
 */
userSchema.virtual("avatarUrl").get(function() {
  return process.env.MEDIA_URL + "/images/avatar/thumb/" + this.avatar;
});

const Account = mongoose.model("Account", userSchema);
module.exports = Account;
