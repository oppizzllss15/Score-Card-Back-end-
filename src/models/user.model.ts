const UserDb = require("mongoose");

const userData = UserDb.Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  phone: String,
  profile_img: String,
  cloudinary_id: String,
  stack: String,
  squad: String,
  grades: [
    {
      week: Number,
      agile: Number,
      weekly_task: Number,
      assessment: Number,
      algorithm: Number,
      cummulative: Number,
    }
  ],
  status: {
    type: String,
    enum: ["deactivated", "active"],
    default: "active",
  },
});

module.exports = UserDb.model("Users", userData);
