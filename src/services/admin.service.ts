const Admin = require('../models/admin.model')

//create admin
async function addAdmin(admin: IAdmin) {
  const newAdmin = await Admin.create(admin);
  return newAdmin ? newAdmin : null;
}

//view all admin
async function viewAdminDetails() {
  const allAdmins = await Admin.find();
  return allAdmins
}

// update admin profile_img
const updateAdminProfileImg = async (
  id: string,
  filePath: string,
  filename: String
) => {
  await Admin.updateOne(
    { _id: id },
    { profile_img: filePath, cloudinary_id: filename }
  );
};

// update admin phone number
const updateAdminPhoneNo = async (id: string, data: string) => {
  await Admin.updateOne({ _id: id }, { phone: data });
};

//edit admin
async function editAdmin(adminid: string, admin: IAdmin) {
  const newAdmin = await Admin.findByIdAndUpdate(adminid, {
    $set: {
      ...admin,
    },
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
async function isPropertyInDatabase<T>(property: string, value: T): Promise<any> {
  let propertyObject: any;
  propertyObject[property] = value;
  const admin = await Admin.find({ propertyObject });
  return admin.length > 0 ? admin[0] : false;
}
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
};
