import ApiResponseHandler from "../helpers/ApiResponseHandler.js";
import ErrorHandler from "../helpers/ErrorHandler.js";
import { createFileServices, createFilesServices, deleteFileServices, deleteFilesServices, getFileServices, getFilesServices, updateFileServices } from "../services/fileServices.js";


export const getFiles = async (req, res) => {
  try {
    const files = await getFilesServices();
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta('status',200)
    apiResponseHandler.setMeta('url',req.originalUrl)
    apiResponseHandler.setData('files',files)
    return res.status(200).json(apiResponseHandler.getApiResponse());
  } catch (error) {
    const errorHandler = new ErrorHandler('Server Internal Error',500,error.message)
    res.status(errorHandler.statusCode).json(errorHandler.getResponseError())
  }
};

export const getFile = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await getFileServices(fileId);
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta('status',200)
    apiResponseHandler.setMeta('url',req.originalUrl)
    apiResponseHandler.setData('file',file)
    return res.status(200).json(apiResponseHandler.getApiResponse());
  } catch (error) {
    const errorHandler = new ErrorHandler('Server Internal Error',500,error.message)
    res.status(errorHandler.statusCode).json(errorHandler.getResponseError())
  }
};
export const createFile = async (req, res) => {
  try {
    const file = req.file;
    const { productId } = req.params;
    const relativePath = `/public/upload/files/${file.filename}`
    const data = {
      name: file.filename,
      type: file.mimetype,
      size: file.size,
      extencion: file.originalname.split(".").pop(),
      path: relativePath,
    //   productId: productId,
    };

    const fileCreated = await createFileServices(data,productId);

    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta('status',200)
    apiResponseHandler.setMeta('url',req.originalUrl)
    apiResponseHandler.setData('file',fileCreated)
    return res.status(200).json(apiResponseHandler.getApiResponse());
  } catch (error) {
    const errorHandler = new ErrorHandler('Server Internal Error',500,error.message)
    res.status(errorHandler.statusCode).json(errorHandler.getResponseError())
  }
};

export const updateFile = async(req, res)=>{
  try {
    const {fileId} = req.params
    const file = req.file
    const relativePath = `/public/upload/files/${file.filename}`
    const data = {
      name: file.filename,
      type: file.mimetype,
      size: file.size,
      extencion: file.originalname.split(".").pop(),
      path: relativePath,
    };
    const updatedFile = await updateFileServices(fileId,data);
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta('status',200)
    apiResponseHandler.setMeta('url',req.originalUrl)
    apiResponseHandler.setData('file',updatedFile)
    return res.status(200).json(apiResponseHandler.getApiResponse());
  } catch (error) {
    const errorHandler = new ErrorHandler('Server Internal Error',500,error.message)
    res.status(errorHandler.statusCode).json(errorHandler.getResponseError())
  }
}

export const createFiles = async (req, res) => {
  try {
    const { productId } = req.params;
    const data = req.files.map((file) => {
    const relativePath = `/public/upload/files/${file.filename}`
      return {
      name: file.filename,
      type: file.mimetype,
      size: file.size,
      extencion: file.originalname.split(".").pop(),
      path: relativePath,
    }});

    const files = await createFilesServices(data,productId);

    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta('status',200)
    apiResponseHandler.setMeta('url',req.originalUrl)
    apiResponseHandler.setData('files',files)
    return res.status(200).json(apiResponseHandler.getApiResponse());
  } catch (error) {
    const errorHandler = new ErrorHandler('Server Internal Error',500,error.details)
    res.status(errorHandler.statusCode).json(errorHandler.getResponseError())
  }
};

export const deleteFile = async (req, res) => {
  try {
    const { fileId} = req.params;
    const deletedFile = await deleteFileServices(fileId);
    console.log(deletedFile);
    const apiResponseHandler = new ApiResponseHandler();
    apiResponseHandler.setMeta('status',200)
    apiResponseHandler.setMeta('url',req.originalUrl)
    apiResponseHandler.setData('message','deleted succesfully')
    apiResponseHandler.setData('file-delete',deletedFile)
    return res.status(200).json(apiResponseHandler.getApiResponse());
  } catch (error) {
    const errorHandler = new ErrorHandler('Server Internal Error',500,error.message)
    res.status(errorHandler.statusCode).json(errorHandler.getResponseError())
  }
};

export const deleteFiles = async (req, res) => {
  try {
    const { filesId } = req.body;
    const deletedFiles = await deleteFilesServices(filesId)
    return res.json({
      deletedFiles,
    });
  } catch (error) {
    console.log(error);
  }
};
