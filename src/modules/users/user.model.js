const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    phonenumber: {
      type: String,
      match: [/^[0-9]{10}$/, "Must contain exactly 10 digits"],
      sparse: true,
      unique: true,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
      sparse: true,
      unique: true,
    },

    publicKey: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("validate", async function () {
  if (!this.email && !this.phonenumber) {
    throw new Error("Either email or phone number is required");
  }

  if (this.email && this.phonenumber) {
    throw new Error("Provide either email or phone number, not both");
  }
});

module.exports = mongoose.model("User", userSchema);
