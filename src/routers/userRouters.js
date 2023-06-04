import {Router} from 'express'
import { getProfile, createAcount,updateProfile, restorePassword, deleteUser } from "../controllers/userController.js";
import upload from '../middlewares/multer.js';
import { verifyToken } from "../middlewares/verifyToken.js";

const routes = Router();

routes.get('/profile',verifyToken,getProfile);
routes.post('/create',upload.single('file'),createAcount);
routes.put('/update/:userId',verifyToken,upload.single('file'),updateProfile);
routes.put('/restore-password/:userId',verifyToken,restorePassword);
routes.delete('/delete/:userId',verifyToken,deleteUser)

export default routes

