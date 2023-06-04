import {Router} from 'express'
import { verifyToken } from "../middlewares/verifyToken.js";
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from '../controllers/categoryController.js';
const routes = Router();

routes.get('/',verifyToken,getAllCategories);
routes.get('/:categoryId',verifyToken,getCategory);
routes.post('/create',verifyToken,createCategory);
routes.put('/update/:categoryId',updateCategory);
routes.delete('/delete/:categoryId',verifyToken,deleteCategory)


export default routes

