import { loginServices } from "../services/authServices.js";
import ErrorHandler from "../helpers/ErrorHandler.js";
import ApiResponseHandler from "../helpers/ApiResponseHandler.js";
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await loginServices(email, password);
    if (response.token) {
      
      const apiResponseHandler = new ApiResponseHandler();
      apiResponseHandler.setMeta('status',200)
      apiResponseHandler.setMeta('url','/api/user/login')
      apiResponseHandler.setData('menssage','token was created successfully')
      apiResponseHandler.setData('token',response.token);

      return res.status(apiResponseHandler.meta['status']).json(apiResponseHandler.getApiResponse());
    }

    const errorHandler = new ErrorHandler(
      "No token provider",
      400,
      "api/user/login",
      response.error.message
    );
    return res.status(errorHandler.getStatusCode()).json(errorHandler.getResponseError());
  } catch (error) {
    const errorHandler = new ErrorHandler(
      "Server Internal Error",
      error.statusCode,
      "api/user/login",
      error.details
    );
    return res
      .status(errorHandler.getStatusCode())
      .json(errorHandler.getResponseError());
  }
};