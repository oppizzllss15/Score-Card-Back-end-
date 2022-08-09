import { Admin } from "../models/admin.model";
import { IAdmin } from "../typings";
//create admin
async function addAdmin(admin: IAdmin) {
  
  const newAdmin = await Admin.create(admin);
  return newAdmin ? newAdmin : null;
  
}

//edit admin
async function editAdmin(adminid: string, admin: IAdmin) {
  const newAdmin = await Admin.findByIdAndUpdate(adminid, {
      $set: admin
    });
    return newAdmin ? newAdmin : null;
  
}

//get admin
async function getAdminById(adminid: string) {
    const newAdmin = await Admin.findById(adminid);
    return newAdmin ? newAdmin : null;
}

//edit admin activate or deactivated
async function editAdminStatus(adminid: string, status: boolean) {
    const newAdmin = await Admin.findByIdAndUpdate(adminid, {
      $set: {
        activationStatus: status,
      },
    });
    return newAdmin ? newAdmin : null;

}

//delete admin
async function removeAdmin(adminid: string) {
    const deletedAdmin = await Admin.findByIdAndRemove(adminid);
    return deletedAdmin ? deletedAdmin : false;

}

//delete admin
const isPropertyInDatabase = async <T>(property: string, value: T) => {
    let propertyObject: any = {};
    propertyObject[property] = value;
    const admin = await Admin.find(propertyObject);
    return admin.length > 0 ? admin : false;

}

module.exports = {
  addAdmin,
  editAdmin,
  getAdminById,
  removeAdmin,
  editAdminStatus,
  isPropertyInDatabase
}

