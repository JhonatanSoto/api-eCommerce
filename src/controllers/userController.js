import {
  getUserById,
  createUser,
  getUserByEmail,
  updateUserServices,
  restorePasswordServices,
  deleteUserServices,
  updateFileUserServices,
} from "../services/userServices.js";
import ErrorHandler from "../helpers/ErrorHandler.js";
import ApiResponseHandler from "../helpers/ApiResponseHandler.js";

export const createAcount = async (req, res) => {
  try {
    const { email } = req.body;
    const userFound = await getUserByEmail(email);
    if (userFound) {
      const errorHandler = new ErrorHandler(
        "The email is already registered",
        400,
        "api/user/create"
      );
      return res.status(400).json(errorHandler.getResponseError());
    }
    const newUser = await createUser(
      req.body,
      req.file ? req.file.filename : "usuarioDefault.png"
    );
    if (newUser.error) {
      const errorHandler = new ErrorHandler(
        newUser.error._message,
        400,
        "api/user/create"
      );
      return res.status(400).json(errorHandler.getResponseError());
    }

    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", "api/create");
    apiResponseHandler.setData("message", "Created user successfully");

    return res
      .status(apiResponseHandler.meta["status"])
      .json(apiResponseHandler.getApiResponse());
  } catch (error) {
    const errorHandler = new ErrorHandler(
      "Server internal error",
      500,
      "api/user/create",
      error.details
    );
    return res
      .status(errorHandler.statusCode)
      .json(errorHandler.getResponseError());
  }
};

export const getProfile = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await getUserById(id);
    if (!user) {
      const errorHandler = new ErrorHandler(
        "User not found",
        400,
        "api/user/profile"
      );
      return res
        .status(errorHandler.statusCode)
        .json(errorHandler.getResponseError());
    }
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", "api/user/profile");
    apiResponseHandler.setData('user',user)
    return res
      .status(apiResponseHandler.meta["status"])
      .json(apiResponseHandler.getApiResponse());
  } catch (error) {
    const errorHandler = new ErrorHandler(
      "Server Internal Error",
      500,
      "api/user/profile",
      error.details
    );
    return res
      .status(errorHandler.statusCode)
      .json(errorHandler.getResponseError());
  }
};

export const updateProfile = async (req, res) => {
  try {
    console.log(req.body);
    const { firstName, lastName } = req.body;
    const data = {
      firstName,
      lastName,
    };
    const { id } = req.user;
    const updatedUser = await updateUserServices(id, data);
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", "api/user/update");
    apiResponseHandler.setData("data", updatedUser);

    return res
      .status(apiResponseHandler.meta["status"])
      .json(apiResponseHandler.getApiResponse());
  } catch (error) {
    const errorHandler = new ErrorHandler(
      "Server Internal Error",
      500,
      "api/user/update",
      error.details
    );
    return res
      .status(errorHandler.statusCode)
      .json(errorHandler.getResponseError());
  }
};

export const restorePassword = async (req, res) => {
  try {
    console.log(req.body,'req.body');
    const { password, newPassword } = req.body;
    const { id } = req.user

    const response = await restorePasswordServices(
      id,
      password,
      newPassword
    );
    if (response.error) {
      const errorHandler = new ErrorHandler(
        response.error.message,
        404,
        "api/user/restore-password"
      );
      return res
        .status(errorHandler.statusCode)
        .json(errorHandler.getResponseError());
    }
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", "api/user/restore-password");
    apiResponseHandler.setMeta("message", "The password was fully updated");

    return res
      .status(apiResponseHandler.meta["status"])
      .json(apiResponseHandler.getApiResponse());
  } catch (error) {
    const errorHandler = new ErrorHandler(
      "Server Internal Error",
      500,
      "api/restore-password",
      error.details
    );
    return res
      .status(errorHandler.statusCode)
      .json(errorHandler.getResponseError());
  }
};
export const updateFileUser  =async( req, res) =>{
  try {
    const file = req.file;
    const { id } = req.user;
    const updatedUser = await updateFileUserServices(id, file.filename);
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", "api/user/update-file");
    apiResponseHandler.setData("message", 'file updated successfully!');
    apiResponseHandler.setData("user", updatedUser);

    return res
      .status(apiResponseHandler.meta["status"])
      .json(apiResponseHandler.getApiResponse());
  } catch (error) {
    const errorHandler = new ErrorHandler(
      "Server Internal Error",
      500,
      "api/user/update",
      error.details
    );
    return res
      .status(errorHandler.statusCode)
      .json(errorHandler.getResponseError());
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.user;
    await deleteUserServices(id);
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", "api/user/delete");
    apiResponseHandler.setMeta("message", "The user was fully deleted");
    return res
      .status(apiResponseHandler.meta["status"])
      .json(apiResponseHandler.getApiResponse());
  } catch (error) {
    const errorHandler = new ErrorHandler(
      "Server Internal Error",
      500,
      "api/user/delete",
      error.details
    );
    return res
      .status(errorHandler.statusCode)
      .json(errorHandler.getResponseError());
  }
};
