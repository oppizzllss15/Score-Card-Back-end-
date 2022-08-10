const Super = require("../models/superAdmin.model");

const findSuperUser = async () => {
  const user = await Super.find();
  return user;
};

const createSuperHandler = async (
  firstname: string,
  lastname: string,
  email: string,
  stack: string,
  secret: string,
  squad: string,
  hashedPass: string,
  phone: string
) => {
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

const updateSuperUserPassword = async (id: string, data: string) => {
  await Super.updateOne(
    { _id: id },
    {
      password: data,
    }
  );
};

const updateSuperUserProfileImg = async (
  id: string,
  filePath: string,
  filename: String
) => {
  await Super.updateOne(
    { _id: id },
    { profile_img: filePath, cloudinary_id: filename }
  );
};

module.exports = {
  findSuperUser,
  createSuperHandler,
  updateSuperUserPassword,
  updateSuperUserProfileImg
};
