import mongoose, { Mongoose, Schema, Model } from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    phonenumber: String,
    profile_img: String,
    cloudinary_id: String,
    stack: [
      {
        type: Schema.Types.ObjectId,
        ref: "Stacks",
      },
    ],
    squad: Number,
    role: String,
    activationStatus: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
