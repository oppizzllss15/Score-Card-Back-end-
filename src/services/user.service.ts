const User = require("../models/user.model");

const findUserByEmail = async (email: string) => {
  const userExists = await User.find({ email: email.toLowerCase() });
  return userExists;
};

const createUser = async (
  firstname: string,
  lastname: string,
  email: string,
  hashedPass: string,
  squad: number,
  stack: string
) => {
  const user = await User.create({
    firstname,
    lastname,
    email: email.toLowerCase(),
    password: hashedPass,
    squad,
    stack,
  });
  return user;
};

const findUserById = async (id: string) => {
  const user = await User.findById(id);
  if (user) {
    return user;
  } else {
    return false;
  }
};

const updateUserById = async (id: string, data: IAdmin) => {
  const updatedUser = await User.findByIdAndUpdate(id, data, {
    new: true,
  });
  return updatedUser;
};

const updateUserStatus = async (email: string, status: string) => {
  const deactivateUserAccount = await User.updateOne(
    { email: email.toLowerCase() },
    {
      status:
        status.toLowerCase() === "active"
          ? status.toLowerCase()
          : "deactivated",
    }
  );
  return deactivateUserAccount;
};

const updateUserScore = async (id: string, data: object) => {
  const userData = await User.updateOne(
    { _id: id },
    { $push: { grades: data } }
  );
};

const updateUserPhoneNo = async (id: string, data: string) => {
  await User.updateOne({ _id: id }, { phone: data });
};

const updateUserProfileImg = async (
  id: string,
  filePath: string,
  filename: String
) => {
  await User.updateOne(
    { _id: id },
    { profile_img: filePath, cloudinary_id: filename }
  );
};

const getAllUsers = async () => {
  return User.find();
};

const getUserScoreByName = async (firstname: string, lastname: string) => {
  const getStudentScores = await User.find({ firstname, lastname });
  return getStudentScores;
};

module.exports = {
  findUserByEmail,
  createUser,
  findUserById,
  updateUserById,
  updateUserStatus,
  updateUserScore,
  getAllUsers,
  getUserScoreByName,
  updateUserPhoneNo,
  updateUserProfileImg,
};
