import {Router} from 'express'
import upload from '../middlewares/multer.js';
import { verifyToken } from "../middlewares/verifyToken.js";
import { createBrand, deleteBrand, getAllBrands, getBrand, updateBrand } from '../controllers/brandController.js';
const routes = Router();

routes.get('/',verifyToken,getAllBrands);
routes.get('/:brandId',verifyToken,getBrand);
routes.post('/create',upload.single('file'),createBrand);
routes.put('/update/:brandId',upload.single('file'),updateBrand);
routes.delete('/delete/:brandId',verifyToken,deleteBrand)


export default routes

