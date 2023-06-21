import {
  createCategoryServices,
  getCategories,
  getCategoryById,
  updateCategoryServices,
  deleteCategoryServices,
} from "../services/categoryServices.js";
import ErrorHandler from "../helpers/ErrorHandler.js";
import ApiResponseHandler from "../helpers/ApiResponseHandler.js";
export const getAllCategories = async (req, res) => {
  try {
    const categories = await getCategories();
    console.log(categories);
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", req.originalUrl);
    apiResponseHandler.setData("categories", categories);
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
export const getCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await getCategoryById(categoryId);
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", req.originalUrl);
    apiResponseHandler.setData("category", category);
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
        url: "api/category",
      },
      error: errorHandler.getResponseError(),
    };
  }
};
export const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const data = {
      name,
      description,
    };

    const category = await createCategoryServices(data);
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", req.originalUrl);
    apiResponseHandler.setData("data", category);
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
        url: "api/category",
      },
      error: errorHandler.getResponseError(),
    };
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { categoryId } = req.params;
    const data = {
      name,
      description,
    };
    const category = await updateCategoryServices(categoryId, data);
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", req.originalUrl);
    apiResponseHandler.setData("category", category);
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
        url: "api/category",
      },
      error: errorHandler.getResponseError(),
    };
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await deleteCategoryServices(categoryId);
    console.log(category);
    if (!category || category.error)
      return res.status(400).json({
        response: {
          status: false,
          message: "category not exist",
        },
      });
    return res.status(200).json({
      meta: {
        status: 200,
        url: req.originalUrl,
      },
      response: {
        message: "deleted category succes ",
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
        url: "api/category",
      },
      error: errorHandler.getResponseError(),
    };
  }
};
