import Users from "../database/models/Users.js";
import { comparePassword } from "../helpers/ultilsPassword.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

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

export const loginServices = async (email, password) => {
  try {
    const userFound = await getUserByEmail(email);
    if (userFound) {
      const matchPassword = await comparePassword(password, userFound.password);
      if (matchPassword) {
        const token = jwt.sign(
          { id: userFound._id },
          process.env.SECRET_TOKEN,
          { expiresIn: process.env.EXPIRES_TOKEN }
        );
        return {
          token
        }
      }
      return {
        error: {
          message: "Password Invalid",
        },
      };
    }
    return {
      error: {
        message: "User not found",
      },
    };
  } catch (error) {
    throw new ErrorHandler("Server Internal", 500, error.message);
  }
};
