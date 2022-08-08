import mongoose, { Mongoose, Schema, Model } from "mongoose";
const adminSchema = new Schema(
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
        ref: "stack",
      },
    ],
    squad: Number,
    role: String,
    activationStatus: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Admin = mongoose.model("admin", adminSchema);
