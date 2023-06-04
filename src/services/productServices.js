import Products from "../database/models/Products.js";
import ErrorHandler from "../helpers/ErrorHandler.js";

export const getAllProductsServices = async (page, limit) => {
  try {
    const skip = (page - 1) * limit;
    const products = await Products.find()
      .populate("files")
      .populate('brand')
      .populate('category')
      .populate('subcategory')
      .skip(skip)
      .limit(limit);
    const countProducts = await Products.find().countDocuments();
    if (skip >= countProducts) {
      throw new ErrorHandler("this page does not exist");
    }
    return products;
  } catch (error) {
    throw new ErrorHandler(
      error.customMessage || "Server Internal error",
      500,
    );
  }
};

export const createProductServices = async (data) => {
  try {
    const productSave = new Products({
      name: data.name,
      price: data.price,
      discount: data.discount,
      description: data.description,
      brand: data.brand,
      category: data.category,
      subcategory: data.subcategory,
    });
    const product = await productSave.save();

    return product
    // return (
    //   await (
    //     await product.populate({
    //       path: "category",
    //     })
    //   ).populate({ path: "brand" })
    // ).populate({ path: "subcategory" });
  } catch (error) {
    throw new ErrorHandler("Server Internal error", 500);
  }
};

export const getProductById = async (productId) => {
  try {
    const product = await Products.findById(productId)
      .populate("brand")
      .populate({
        path: "files",
      })
      .populate("category")
      .populate("subcategory")
      .exec();
    if (!product || null) throw new Error("El producto no exite");
    return product;
  } catch (error) {
    throw new ErrorHandler("Server Internal error", 500);
  }
};

export const updateProductServices = async (productId, data) => {
  try {
    const updateProduct = await Products.findByIdAndUpdate(
      { _id: productId },
      data,
      { new: true }
    );
    console.log(updateProduct);
    return updateProduct;
  } catch (error) {
    console.log(error);
    throw new ErrorHandler("Server Internal error", 500);
  }
};

export const softDeleteServices = async (productId) => {
  try {
    const product = await Products.findByIdAndUpdate(
      { _id: productId },
      {
        active: false,
      },
      { new: true }
    );
    console.log(product);
    return product;
  } catch (error) {
    throw new ErrorHandler("Server Internal error", 500);
  }
};

export const restoreProductServices = async (productId) => {
  try {
    const product = await Products.findByIdAndUpdate(
      { _id: productId },
      {
        active: true,
      },
      { new: true }
    );
    return product;
  } catch (error) {
    throw new ErrorHandler("Server Internal error", 500);
  }
};
export const deleteProductServices = async (productId) => {
  try {
    const product = await Products.findOneAndDelete({ _id: productId });

    return product;
  } catch (error) {
    throw new ErrorHandler("Server Internal error", 500);
  }
};
