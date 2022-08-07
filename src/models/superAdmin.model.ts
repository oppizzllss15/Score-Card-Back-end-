const superAdmin = require("mongoose");

const superAdminData = superAdmin.Schema({
    firstname: {
        type: String,
        required: [true, "Please add a firstname"],
    },
    lastname: {
        type: String,
        required: [true, "Please add a lastname"],
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true,
    },
    secret: {
        type: String,
        required: [true, "Please add secret password"],
        default: process.env.SECRET_PASS,
    },
    stack: {
        type: String,
        required: [true, "Please add a stack"],
    },
    squad: {
        type: String,
        required: [true, "Please add a squad"],
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
    },
    phone: {
        type: String,
        required: [true, "Please add your phone number"],
    },
    profile_img: {
        type: String,
    },
    cloudinary_id: {
        type: String,
    },
},
{
    timestamps: true,
}
);
module.exports = superAdmin.model("SuperUser", superAdminData)