import Users from "../database/models/Users.js";

import { comparePassword, encryptPassword } from "../helpers/ultilsPassword.js";
import { getRoleByName } from "./roleServices.js";
import ErrorHandler from "../helpers/ErrorHandler.js";

export const createUser = async (data, file) => {
  try {
    data.password = await encryptPassword(data.password);
    let role = data.role ? await getRoleByName(data.role) : null;
    if (role === null) {
      role = await getRoleByName("user");
    }
    const saveUser = new Users({ ...data, file: file, role: role._id });
    const newUser = await saveUser.save();
    return newUser;
  } catch (error) {
    console.log(error);
    throw new ErrorHandler("Server Internal error", 500, null,error.message);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const userFound = await Users.findOne({ email: email }).populate({
      path: "role",
    });
    return userFound;
  } catch (error) {
    throw new ErrorHandler("Server Internal", 500, error.message);

  }
};

export const getUserById = async (userId) => {
  try {
    const user = await Users.findById(userId,{password:0})
      .populate({ path: "role" })
      .exec();
    return user;
  } catch (error) {
    throw new ErrorHandler("Server Internal", 500, error.message);
  }
};
export const updateUserServices = async (userId, data) => {
  try {
    const userUpdateSave = await Users.findByIdAndUpdate(
      userId,
      { ...data },
      { new: true }
    );
    const userUpdated = await userUpdateSave.save();
    console.log(userUpdated);
    return userUpdated;
  } catch (error) {
    throw new ErrorHandler("Server Internal", 500, error.message);
    
  }
};

export const restorePasswordServices = async (userId, password, newPassword) => {
  try {
    const user = await getUserById(userId);
    const mathPassword = await comparePassword(password, user.password);
    if (!mathPassword)
      return {
        error: {
          message: "Invalid Credentials",
        },
      };
    const newPasswordHash = await encryptPassword(newPassword);
    user.password = newPasswordHash;

    return await user.save();
  } catch (error) {
    throw new ErrorHandler("Server Internal", 500, error.message);

  }
};

export const deleteUserServices = async(userId)=>{  
  try {
    return await Users.findByIdAndDelete(userId);

  } catch (error) {
    throw new ErrorHandler("Server Internal", 500, error.message);

  }
}
