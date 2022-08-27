const Admin = require("../models/admin.model");

//create admin
async function addAdmin(admin: IAdmin) {
  const newAdmin = await Admin.create(admin);
  return newAdmin ? newAdmin : null;
}

//view all admin
async function viewAdminDetails() {
  const allAdmins = await Admin.find();
  console.log(allAdmins);
  return allAdmins;
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
    $set: admin
  });
  console.log(newAdmin + JSON.stringify(admin) + "good");
  return newAdmin ? newAdmin : null;
}

//get admin
async function getAdminById(adminid: string) {
  const newAdmin = await Admin.findById(adminid);
  return newAdmin ? newAdmin : null;
}

//edit admin activate or deactivated
async function editAdminStatus(adminid: string, status: boolean) {
  const newAdmin = await Admin.updateOne(
    { _id: adminid },
    {
      $set: {
        activationStatus: status,
      },
    }
  );
  return newAdmin ? true : false;
}

//delete admin
async function removeAdmin(adminid: string) {
  const deletedAdmin = await Admin.findByIdAndRemove(adminid);
  return deletedAdmin ? deletedAdmin : false;
}

//check data is in database
async function isPropertyInDatabase<T>(
  property: string,
  value: T
): Promise<IAdmin> {
  let propertyObject: { [key: string]: T } = {};
  propertyObject[property] = value;
  const admin: IAdmin[] = await Admin.find(propertyObject);
  return admin[0];
}

const findAdminByEmail = async (email: string) => {
  const adminExists = await Admin.find({ email: email.toLowerCase() });
  return adminExists;
};

const updateAdminTicket = async (id: string, ticket: string) => {
  await Admin.updateOne({ _id: id }, { password_ticket: ticket });
};

const validateAdminTicketLink = async (id: string, ticket: string) => {
  const user = await Admin.find({ _id: id, password_ticket: ticket });
  return user;
};

const updateAdminPassword = async (id: string, password: string) => {
  await Admin.updateOne({ _id: id }, { password: password });
};

const resetAdminSecureTicket = async (id: string) => {
  await Admin.updateOne({ _id: id }, { password_ticket: null });
};

//view admins
async function getAdmins() {
  const Admins = await Admin.find();
  return Admins

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
  findAdminByEmail,
  updateAdminTicket,
  validateAdminTicketLink,
  updateAdminPassword,
  resetAdminSecureTicket,
  getAdmins
};
