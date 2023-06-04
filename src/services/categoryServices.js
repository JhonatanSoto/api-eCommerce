import Categories from '../database/models/Category.js';
import ErrorHandler from '../helpers/ErrorHandler.js';

export const getCategories = async()=>{
    try {
        const categories = await Categories.find();
        return categories
    } catch (error) {
        const errorHandler = new ErrorHandler('Server internal Error',null,error.message)
        return {
            error:errorHandler.getResponseError()
        }
    }
};
export const getCategoryById = async(categoryId)=>{
    try {
        const category = await Categories.findById(categoryId);
        return category
    } catch (error) {
        const errorHandler = new ErrorHandler('Server internal Error',null,error.message)
        return {
            error:errorHandler.getResponseError()
        }
    }
};
export const createCategoryServices = async (data)=>{
    try {
        const categorySave = await Categories.create(data);
        const  newCategory= await categorySave.save();
        return newCategory;
    } catch (error) {
        const errorHandler = new ErrorHandler('Server internal Error',null,error.message)
        return {
            error:errorHandler.getResponseError()
        }
    }
}
export const updateCategoryServices = async (categoryId,data)=>{
    try {
        const category = await Categories.findByIdAndUpdate(categoryId,{...data},{new:true});
        return category;
    } catch (error) {
        const errorHandler = new ErrorHandler('Server internal Error',null,error.message)
        return {
            error:errorHandler.getResponseError()
        }
    }
}
export const deleteCategoryServices = async (categoryId)=>{
    try {
        const category = await Categories.findByIdAndDelete(categoryId);
        return category;
    } catch (error) {
        const errorHandler = new ErrorHandler('Server internal Error',null,error.message)
        return {
            error:errorHandler.getResponseError()
        }
    }
}



