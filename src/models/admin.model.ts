import mongoose ,{ Mongoose, Schema, Model } from "mongoose";
const adminSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    profile_img: String,
    stack: {
      type: Schema.Types.ObjectId,
      ref: "stack",
    },
    squad: Number,
    role: String,
    activationStatus: {type: Boolean, default: false}
  },
  { timestamps: true }
);

const stackSchema = new Schema(
  {
    name: String,
  },
  { timestamps: true }
);

export const Stack = mongoose.model("stack", stackSchema);
export const Admin = mongoose.model("admin", adminSchema);
