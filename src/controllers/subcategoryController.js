import {
  createSubcategoryServices,
  getSubcategories,
  updateSubcategoryServices,
  deleteSubcategoryServices,
} from "../services/subcategoryServices.js";
import ErrorHandler from "../helpers/ErrorHandler.js";
import ApiResponseHandler from "../helpers/ApiResponseHandler.js";

export const getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await getSubcategories();
    console.log(subcategories);
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", req.originalUrl);
    apiResponseHandler.setData("data", subcategories);
    return res.status(200).json(apiResponseHandler.getApiResponse());
  } catch (error) {
    const errorHandler = new ErrorHandler(
      "Server Internal Error",
      500,
      error.message
    );
    return {
      meta: {
        success: false,
        status: errorHandler.getStatusCode(),
        url: "api/categories",
      },
      error: errorHandler.getResponseError(),
    };
  }
};
export const createSubcategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const data = {
      name,
      description,
    };

    const subcategory = await createSubcategoryServices(data);
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", req.originalUrl);
    apiResponseHandler.setData("data", subcategory);
    return res.status(200).json(apiResponseHandler.getApiResponse());
  } catch (error) {
    const errorHandler = new ErrorHandler(
      "Server Internal Error",
      500,
      error.message
    );
    return {
      meta: {
        success: false,
        status: errorHandler.getStatusCode(),
        url: "api/subcategory",
      },
      error: errorHandler.getResponseError(),
    };
  }
};
export const updateSubcategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { subcategoryId } = req.params;
    const data = {
      name,
      description,
    };
    const subcategory = await updateSubcategoryServices(subcategoryId, data);
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", req.originalUrl);
    apiResponseHandler.setData("subcategory", subcategory);
    return res.status(200).json(apiResponseHandler.getApiResponse());
  } catch (error) {
    const errorHandler = new ErrorHandler(
      "Server Internal Error",
      500,
      error.message
    );
    return {
      meta: {
        success: false,
        status: errorHandler.getStatusCode(),
        url: "api/subcategory",
      },
      error: errorHandler.getResponseError(),
    };
  }
};

export const deleteSubcategory = async (req, res) => {
  try {
    const { subcategoryId } = req.params;
    const subcategory = await deleteSubcategoryServices(subcategoryId);
    console.log(subcategory);
    if (!subcategory || subcategory.error)
      return res.status(400).json({
        response: {
          status: false,
          message: "subcategory not exist",
        },
      });
    return res.status(200).json({
      meta: {
        status: 200,
        url: req.originalUrl,
      },
      response: {
        message: "deleted subcategory succes ",
      },
    });
  } catch (error) {
    const errorHandler = new ErrorHandler(
      "Server Internal Error",
      500,
      error.message
    );
    return {
      meta: {
        success: false,
        status: errorHandler.getStatusCode(),
        url: "api/subcategory",
      },
      error: errorHandler.getResponseError(),
    };
  }
};
