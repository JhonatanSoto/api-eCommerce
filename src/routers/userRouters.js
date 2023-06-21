import {Router} from 'express'
import { getProfile, createAcount,updateProfile, restorePassword, deleteUser, updateFileUser } from "../controllers/userController.js";
import upload from '../middlewares/multer.js';
import { verifyToken } from "../middlewares/verifyToken.js";

const routes = Router();

routes.get('/profile',verifyToken,getProfile);
routes.post('/create',upload.single('file'),createAcount);
routes.put('/update',verifyToken,updateProfile);
routes.put('/update-file/',verifyToken,upload.single('file'),updateFileUser);
routes.put('/restore-password',verifyToken,restorePassword);
routes.delete('/delete',verifyToken,deleteUser)

export default routes

