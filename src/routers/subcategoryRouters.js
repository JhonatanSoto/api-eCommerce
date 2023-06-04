import {Router} from 'express'
import { verifyToken } from "../middlewares/verifyToken.js";
import { createSubcategory,getAllSubcategories,updateSubcategory,deleteSubcategory } from '../controllers/subcategoryController.js';
const routes = Router();

routes.get('/',verifyToken,getAllSubcategories);
routes.post('/create',verifyToken,createSubcategory);
routes.put('/update/:subcategoryId',updateSubcategory);
routes.delete('/delete/:subcategoryId',verifyToken,deleteSubcategory)


export default routes

