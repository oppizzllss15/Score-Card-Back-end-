"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPropertyInDatabase = exports.removeAdmin = exports.editAdminStatus = exports.editAdmin = exports.addAdmin = void 0;
const models_1 = require("../models");
//create admin
async function addAdmin(admin) {
    try {
        const newAdmin = await new models_1.Admin(admin).save();
        return newAdmin ? newAdmin : null;
    }
    catch (err) {
        handleError(err);
    }
}
exports.addAdmin = addAdmin;
//edit admin
async function editAdmin(adminid, admin) {
    try {
        const newAdmin = await models_1.Admin.findByIdAndUpdate(adminid, {
            $set: {
                ...admin
            }
        });
        return newAdmin ? newAdmin : null;
    }
    catch (err) {
        handleError(err);
    }
}
exports.editAdmin = editAdmin;
//edit admin activate or deactivated
async function editAdminStatus(adminid, status) {
    try {
        const newAdmin = await models_1.Admin.findByIdAndUpdate(adminid, {
            $set: {
                activationStatus: status,
            },
        });
        return newAdmin ? newAdmin : null;
    }
    catch (err) {
        handleError(err);
    }
}
exports.editAdminStatus = editAdminStatus;
//delete admin
async function removeAdmin(adminid) {
    try {
        const deletedAdmin = await models_1.Admin.findByIdAndRemove(adminid);
        return deletedAdmin ? deletedAdmin : false;
    }
    catch (err) {
        handleError(err);
        return;
    }
}
exports.removeAdmin = removeAdmin;
//delete admin
async function isPropertyInDatabase(property, value) {
    try {
        let propertyObject;
        propertyObject[property] = value;
        const admin = await models_1.Admin.find({ propertyObject });
        return admin.length > 0 ? admin : false;
    }
    catch (err) {
        handleError(err);
        return;
    }
}
exports.isPropertyInDatabase = isPropertyInDatabase;
function handleError(error) {
    console.log(error.message);
}
