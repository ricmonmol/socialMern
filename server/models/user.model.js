import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    require: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exist",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    require: "Email is required",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  update: Date,
  hashed_password: {
    type: String,
    require: "Password is required",
  },
  salt: String,
});

UserSchema.virtual("password")
  .set((password) => {
    this._password = password;
    this.salt = this.makesalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(() => {
    return this._password;
  });

UserSchema.methods = {
  authenticate: (plainText) => {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: (password) => {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
  makeSalt: () => {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

UserSchema.path("hashed_password").validate((v) => {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, null);

export default mongoose.model("User", UserSchema);
