"use strict";
const UserDb = require("mongoose");
const userData = UserDb.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    phone: String,
    password_ticket: String,
    profile_img: String,
    cloudinary_id: String,
    stack: {
        type: UserDb.Schema.Types.ObjectId,
        ref: "stack",
    },
    squad: Number,
    grades: [
        {
            week: Number,
            agile: Number,
            weekly_task: Number,
            assessment: Number,
            algorithm: Number,
            cummulative: Number,
        },
    ],
    status: {
        type: String,
        enum: ["inactive", "active"],
        default: "inactive",
    },
});
module.exports = UserDb.model("Users", userData);
