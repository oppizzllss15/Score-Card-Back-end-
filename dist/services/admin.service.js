"use strict";
const Admin = require("../models/admin.model");
//create admin
async function addAdmin(admin) {
    const newAdmin = await Admin.create(admin);
    return newAdmin ? newAdmin : null;
}
//view all admin
async function viewAdminDetails() {
    const allAdmins = await Admin.find();
    return allAdmins;
}
// update admin profile_img
const updateAdminProfileImg = async (id, filePath, filename) => {
    await Admin.updateOne({ _id: id }, { profile_img: filePath, cloudinary_id: filename });
};
// update admin phone number
const updateAdminPhoneNo = async (id, data) => {
    await Admin.updateOne({ _id: id }, { phone: data });
};
//edit admin
async function editAdmin(adminid, admin) {
    const newAdmin = await Admin.findByIdAndUpdate(adminid, {
        $set: {
            ...admin,
        },
    });
    console.log(newAdmin);
    return newAdmin ? newAdmin : null;
}
//get admin
async function getAdminById(adminid) {
    const newAdmin = await Admin.findById(adminid);
    return newAdmin ? newAdmin : null;
}
//edit admin activate or deactivated
async function editAdminStatus(adminid, status) {
    const newAdmin = await Admin.updateOne({ _id: adminid }, {
        $set: {
            activationStatus: status,
        },
    });
    return newAdmin ? true : false;
}
//delete admin
async function removeAdmin(adminid) {
    const deletedAdmin = await Admin.findByIdAndRemove(adminid);
    return deletedAdmin ? deletedAdmin : false;
}
//check data is in database
async function isPropertyInDatabase(property, value) {
    let propertyObject = {};
    propertyObject[property] = value;
    const admin = await Admin.find(propertyObject);
    return admin[0];
}
const findAdminByEmail = async (email) => {
    const adminExists = await Admin.find({ email: email.toLowerCase() });
    return adminExists;
};
const updateAdminTicket = async (id, ticket) => {
    await Admin.updateOne({ _id: id }, { password_ticket: ticket });
};
const validateAdminTicketLink = async (id, ticket) => {
    const user = await Admin.find({ _id: id, password_ticket: ticket });
    return user;
};
const updateAdminPassword = async (id, password) => {
    await Admin.updateOne({ _id: id }, { password: password });
};
const resetAdminSecureTicket = async (id) => {
    await Admin.updateOne({ _id: id }, { password_ticket: null });
};
//view admins
const getAdmins = async () => {
    const Admins = await Admin.find();
    return Admins;
};
module.exports = {
    addAdmin,
    editAdmin,
    getAdminById,
    removeAdmin,
    viewAdminDetails,
    editAdminStatus,
    isPropertyInDatabase,
    updateAdminProfileImg,
    updateAdminPhoneNo,
    findAdminByEmail,
    updateAdminTicket,
    validateAdminTicketLink,
    updateAdminPassword,
    resetAdminSecureTicket,
    getAdmins,
};
