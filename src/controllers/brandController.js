import {
  createBrandServices,
  deleteBrandServices,
  getBrandById,
  getBrands,
  updateBrandServices,
} from "../services/brandServices.js";
import ErrorHandler from "../helpers/ErrorHandler.js";
import ApiResponseHandler from "../helpers/ApiResponseHandler.js";
export const getAllBrands = async (req, res) => {
  try {
    const brands = await getBrands();
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", req.url);
    apiResponseHandler.setData("data", brands);
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
        url: "api/brands",
      },
      error: errorHandler.getResponseError(),
    };
  }
};
export const getBrand = async (req, res) => {
  try {
    const { brandId } = req.params;
    const brand = await getBrandById(brandId);
    if(!brand || brand.error) return res.status(400).json({
      response:{
          status: false,
          message:'brand not exist'
      }
  })
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", req.originalUrl);
    apiResponseHandler.setData("brand", brand);
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
        url: "api/brand",
      },
      error: errorHandler.getResponseError(),
    };
  }
};
export const createBrand = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!req.file)
      return res.status(400).json({
        error: {
          message: "Required logo",
        },
      });
    const data = {
      name,
      description,
      file: req.file.filename,
    };

    const brand = await createBrandServices(data);
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", req.originalUrl);
    apiResponseHandler.setData("data", brand);
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
        url: "api/brand",
      },
      error: errorHandler.getResponseError(),
    };
  }
};
export const updateBrand = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { brandId } = req.params;
    if (!req.file)
      return res.status(400).json({
        error: {
          message: "Required logo",
        },
      });
    const data = {
      name,
      description,
      file: req.file.filename,
    };
    const brand = await updateBrandServices(brandId, data);
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta("status", 200);
    apiResponseHandler.setMeta("url", req.originalUrl);
    apiResponseHandler.setData("brand", brand);
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
        url: "api/brand",
      },
      error: errorHandler.getResponseError(),
    };
  }
};

export const deleteBrand = async (req, res) => {
  try {
    const { brandId } = req.params;
    const brand = await deleteBrandServices(brandId);
    console.log(brand);
    if(!brand || brand.error) return res.status(400).json({
        response:{
            status: false,
            message:'brand not exist'
        }
    })
    return res.status(200).json({
        meta:{
            status: 200,
            url:req.originalUrl
        },
        response:{
            message:'deleted brand succes '
        }
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
        url: "api/brand",
      },
      error: errorHandler.getResponseError(),
    };
  }
};
