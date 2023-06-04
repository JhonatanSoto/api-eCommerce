import Brands from '../database/models/Brand.js';
import ErrorHandler from '../helpers/ErrorHandler.js';

export const getBrands = async()=>{
    try {
        const brands = await Brands.find();
        return brands
    } catch (error) {
        const errorHandler = new ErrorHandler('Server internal Error',null,error.message)
        return {
            error:errorHandler.getResponseError()
        }
    }
};
export const getBrandById = async(id)=>{
    try {
        const brand = await Brands.findById(id);
        return brand
    } catch (error) {
        const errorHandler = new ErrorHandler('Server internal Error',null,error.message)
        return {
            error:errorHandler.getResponseError()
        }
    }
};
export const createBrandServices = async (data)=>{
    try {
        const brandSave = await Brands.create(data);
        const newBrand = await brandSave.save();
        return newBrand;
    } catch (error) {
        const errorHandler = new ErrorHandler('Server internal Error',null,error.message)
        return {
            error:errorHandler.getResponseError()
        }
    }
}
export const updateBrandServices = async (brandId,data)=>{
    try {
        const brand = await Brands.findByIdAndUpdate(brandId,{...data},{new:true});
        return brand;
    } catch (error) {
        const errorHandler = new ErrorHandler('Server internal Error',null,error.message)
        return {
            error:errorHandler.getResponseError()
        }
    }
}
export const deleteBrandServices = async (brandId)=>{
    try {
        const brand = await Brands.findByIdAndDelete(brandId);
        return brand;
    } catch (error) {
        const errorHandler = new ErrorHandler('Server internal Error',null,error.message)
        return {
            error:errorHandler.getResponseError()
        }
    }
}



