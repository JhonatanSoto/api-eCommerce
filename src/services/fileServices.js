import Files from "../database/models/File.js";
import {getProductById} from "../services/productServices.js";
import ErrorHandler from "../helpers/ErrorHandler.js";

export const getFilesServices = async () => {
  try {
    const files = await Files.find();
    return files;
  } catch (error) {
    throw new ErrorHandler("Server Internal Error", 500, error.message);
  }
};
export const getFileServices = async (fileId) => {
  try {
    const file = await Files.findById({ _id: fileId })
    return file;
  } catch (error) {
    throw new ErrorHandler("Server Internal Error", 500, error.message);
  }
};

export const createFileServices = async (data, productId) => {
  try {
    const fileSave = new Files(data);
    await addFileProduct(fileSave, productId);
    const fileCreated = await fileSave.save();
    return fileCreated;
  } catch (error) {
    throw new ErrorHandler("Server Internal Error", 500, error.message);
  }
};

export const createFilesServices = async (files,productId) => {
  try {
    const product = await getProductById(productId);
    if (product) {
      const filesCreated = await Files.insertMany(files);
      await addFilesProduct(filesCreated,product)
      return filesCreated;
    }    
  } catch (error) {
    throw new ErrorHandler("Server Internal Error", 500, error.details);
  }
};

export const updateFileServices = async (fileId, data) => {
  try {
    const updatedFile = await Files.findByIdAndUpdate(fileId, { ...data });
    return updatedFile;
  } catch (error) {
    throw new ErrorHandler("Server Internal Error", 500, error.message);
  }
};

export const addFileProduct =  async (file, product) => {
  try {
    product.files.push(file._id);
    const savedProduct = await product.save();
    return savedProduct;
  } catch (error) {
      throw new ErrorHandler("Server Internal Error", 500, error.message);
  }
}

export const addFilesProduct = async (files, productId) => {
  try {
    const product = await getProductById(productId);
    // se puede iterar y usar un push
    const newFiles = product.files.concat(files);
    product.files = newFiles;
    const savedProduct = await product.save();
    return savedProduct;
  } catch (error) {
    throw new ErrorHandler("Server Internal Error", 500, error.details);
  }
};

export const deleteFileServices = async (fileId) => {
  try {
    // const dltFile = await filesServices.deleteFileProduct(fileId);
    const deletedFile = await Files.findByIdAndDelete(fileId);
    return deletedFile;
  } catch (error) {
    throw new ErrorHandler("Server Internal Error", 500, error.message);
  }
};

export const deleteFilesServices = async (filesIds) => {
  try {
    const deletedFiles = await Files.deleteMany({ _id: { $in: filesIds } });
    return deletedFiles;
  } catch (error) {
    throw new ErrorHandler("Server Internal Error", 500, error.message);
  }
};

export const deleteFileProductServices = async (fileId, productId) => {
  try {
    const product = await productsServices.getProductById(productId);
    const files = product.files;
    const filterFiles = files.filter((file) => file._id != fileId);
    product.files = filterFiles;
    await product.save();
    return filterFiles;
  } catch (error) {
    throw new ErrorHandler("Server Internal Error", 500, error.message);
  }
};


