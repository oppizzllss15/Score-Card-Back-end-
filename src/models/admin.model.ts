const adminDB = require("mongoose");

const adminSchema = adminDB.Schema(
  {
    firstname: String,
    lastname: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    phonenumber: String,
    password_ticket: String,
    profile_img: String,
    cloudinary_id: String,
    stack: [
      {
        type: adminDB.Schema.Types.ObjectId,
        ref: "Stacks",
      },
    ],
    squad: Number,
    role: String,
    position: { type: String, default: "admin" },
    activationStatus: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = adminDB.model("Admin", adminSchema);
