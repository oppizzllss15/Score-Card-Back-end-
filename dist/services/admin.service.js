"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin_model_1 = require("../models/admin.model");
//create admin
async function addAdmin(admin) {
    const newAdmin = await admin_model_1.Admin.create(admin);
    return newAdmin ? newAdmin : null;
}
//edit admin
async function editAdmin(adminid, admin) {
    const newAdmin = await admin_model_1.Admin.findByIdAndUpdate(adminid, {
        $set: {
            ...admin,
        },
    });
    return newAdmin ? newAdmin : null;
}
//get admin
async function getAdminById(adminid) {
    const newAdmin = await admin_model_1.Admin.findById(adminid);
    return newAdmin ? newAdmin : null;
}
//edit admin activate or deactivated
async function editAdminStatus(adminid, status) {
    const newAdmin = await admin_model_1.Admin.findByIdAndUpdate(adminid, {
        $set: {
            activationStatus: status,
        },
    });
    return newAdmin ? newAdmin : null;
}
//delete admin
async function removeAdmin(adminid) {
    const deletedAdmin = await admin_model_1.Admin.findByIdAndRemove(adminid);
    return deletedAdmin ? deletedAdmin : false;
}
//delete admin
async function isPropertyInDatabase(property, value) {
    let propertyObject;
    propertyObject[property] = value;
    const admin = await admin_model_1.Admin.find({ propertyObject });
    return admin.length > 0 ? admin[0] : false;
}
module.exports = {
    addAdmin,
    editAdmin,
    getAdminById,
    removeAdmin,
    editAdminStatus,
    isPropertyInDatabase,
};