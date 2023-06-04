import Subcategories from '../database/models/Subcategory.js';
import ErrorHandler from '../helpers/ErrorHandler.js';

export const getSubcategories = async()=>{
    try {
        const subcategories = await Subcategories.find();
        return subcategories
    } catch (error) {
        const errorHandler = new ErrorHandler('Server internal Error',null,error.message)
        return {
            error:errorHandler.getResponseError()
        }
    }
};
export const getSubcategoryById = async(subcategoryId)=>{
    try {
        const subcategory = await Subcategories.findById(subcategoryId);
        return subcategory
    } catch (error) {
        const errorHandler = new ErrorHandler('Server internal Error',null,error.message)
        return {
            error:errorHandler.getResponseError()
        }
    }
};
export const createSubcategoryServices = async (data)=>{
    try {
        const subcategorySave = await Subcategories.create(data);
        const  newSubcategory= await subcategorySave.save();
        return newSubcategory;
    } catch (error) {
        const errorHandler = new ErrorHandler('Server internal Error',null,error.message)
        return {
            error:errorHandler.getResponseError()
        }
    }
}
export const updateSubcategoryServices = async (subcategoryId,data)=>{
    try {
        const subcategory = await Subcategories.findByIdAndUpdate(subcategoryId,{...data},{new:true});
        return subcategory;
    } catch (error) {
        const errorHandler = new ErrorHandler('Server internal Error',null,error.message)
        return {
            error:errorHandler.getResponseError()
        }
    }
}
export const deleteSubcategoryServices = async (subcategoryId)=>{
    try {
        const subcategory = await Subcategories.findByIdAndDelete(subcategoryId);
        return subcategory;
    } catch (error) {
        const errorHandler = new ErrorHandler('Server internal Error',null,error.message)
        return {
            error:errorHandler.getResponseError()
        }
    }
}



