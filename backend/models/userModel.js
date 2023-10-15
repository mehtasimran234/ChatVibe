const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: true,
    },
    email: {
      type: "String",
      required: true,
      unique: true,
    },
    password: {
      type: "String",
      required: true,
    },
    picture: {
      type: "String",
    },
  },
  { timestamps: true }
);

userSchema.method("validatePassword", async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
});

userSchema.pre("save", async function (next) {
  if (!this.isModified()) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
