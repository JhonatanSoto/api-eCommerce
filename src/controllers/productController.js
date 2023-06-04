import ErrorHandler from "../helpers/ErrorHandler.js";
import ApiResponseHandler from "../helpers/ApiResponseHandler.js";
import {
  createProductServices,
  getAllProductsServices,
  getProductById,
  restoreProductServices,
  updateProductServices,
  softDeleteServices,
  deleteProductServices,
} from "../services/productServices.js";

export const createProduct = async (req, res) => {
  try {
    const data = req.body;
    const product = await createProductServices(data);
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", req.originalUrl);
    apiResponseHandler.setData("product", product);
    return res.status(200).json(apiResponseHandler.getApiResponse());
  } catch (error) {
    const errorHandler = new ErrorHandler(
      "Server Internal Error",
      500,
      error.message
    );
    res.status(errorHandler.statusCode).json(errorHandler.getResponseError());
  }
};
export const getAllProducts = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const products = await getAllProductsServices(page, limit);

    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", req.originalUrl);
    apiResponseHandler.setMeta("page", parseInt(page));
    apiResponseHandler.setMeta("total", products.length);
    apiResponseHandler.setData("products", products);
    return res.status(200).json(apiResponseHandler.getApiResponse());
  } catch (error) {
    const errorHandler = new ErrorHandler(
      error.message || "Server Internal Error",
      500,
      req.originalUrl,
    );
    res.status(errorHandler.statusCode).json(errorHandler.getResponseError());
  }
};
export const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await getProductById(productId);
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", req.originalUrl);
    apiResponseHandler.setData("product", product);
    return res.status(200).json(apiResponseHandler.getApiResponse());
  } catch (error) {
    const errorHandler = new ErrorHandler(
      "Server Internal Error",
      500,
      error.message
    );
    res.status(errorHandler.statusCode).json(errorHandler.getResponseError());
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log(productId);
    const data = req.body;
    const updatedProduct = await updateProductServices(productId, data);
    console.log(updateProduct);
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", req.originalUrl);
    apiResponseHandler.setData("message", "updated sucessfully");
    apiResponseHandler.setData("product", updatedProduct);
    return res.status(200).json(apiResponseHandler.getApiResponse());
  } catch (error) {
    console.log(error);
    const errorHandler = new ErrorHandler(
      "Server Internal Error",
      500,
      error.message
    );
    res.status(errorHandler.statusCode).json(errorHandler.getResponseError());
  }
};

export const deactivateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const product = await softDeleteServices(productId);
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", req.originalUrl);
    apiResponseHandler.setData("message", "Product deactivated successfully!!");
    apiResponseHandler.setData("product", product);
    return res.status(200).json(apiResponseHandler.getApiResponse());
  } catch (error) {
    const errorHandler = new ErrorHandler(
      error.customMessage || "Server Internal Error",
      error.statusCode || 500,
      req.originalUrl
    );
    res.status(errorHandler.statusCode).json(errorHandler.getResponseError());
  }
};
export const restoreProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const restoreProduct = await restoreProductServices(productId);
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", req.originalUrl);
    apiResponseHandler.setData("message", "Product restoring successfully!!");
    apiResponseHandler.setData("product", restoreProduct);
    return res.status(200).json(apiResponseHandler.getApiResponse());
  } catch (error) {
    const errorHandler = new ErrorHandler(
      error.customMessage || "Server Internal Error",
      error.statusCode || 500,
      req.originalUrl
    );
    res.status(errorHandler.statusCode).json(errorHandler.getResponseError());
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deletedProduct = await deleteProductServices(productId);
    if (!deletedProduct) {
      throw new ErrorHandler("Product not found", 404);
    }
    const apiResponseHandler = new ApiResponseHandler();

    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", req.originalUrl);
    apiResponseHandler.setData("message", "Product deleting successfully!!");
    return res.status(200).json(apiResponseHandler.getApiResponse());
  } catch (error) {
    const errorHandler = new ErrorHandler(
      error.customMessage || "Server Internal Error",
      error.statusCode || 500,
      req.originalUrl
    );
    res.status(errorHandler.statusCode).json(errorHandler.getResponseError());
  }
};
