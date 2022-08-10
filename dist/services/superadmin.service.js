"use strict";
const Super = require("../models/superAdmin.model");
const findSuperUser = async () => {
    const user = await Super.find();
    return user;
};
const createSuperHandler = async (firstname, lastname, email, stack, secret, squad, hashedPass, phone) => {
    const createData = await Super.create({
        firstname: firstname,
        lastname: lastname,
        email: email.toLowerCase(),
        stack: stack,
        secret,
        squad: squad,
        password: hashedPass,
        phone: phone,
    });
    return createData;
};
const updateSuperUserPassword = async (id, data) => {
    await Super.updateOne({ _id: id }, {
        password: data,
    });
};
const updateSuperUserProfileImg = async (id, filePath, filename) => {
    await Super.updateOne({ _id: id }, { profile_img: filePath, cloudinary_id: filename });
};
module.exports = {
    findSuperUser,
    createSuperHandler,
    updateSuperUserPassword,
    updateSuperUserProfileImg
};
