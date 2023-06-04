import { Router } from "express";
import { createFile, createFiles, deleteFile, deleteFiles, getFile, getFiles, updateFile } from "../controllers/fileController.js";
import upload from "../middlewares/multer.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { isAdmin } from "../middlewares/verifyRole.js";


const routes = Router();

routes.get('/',[verifyToken,isAdmin],getFiles);
routes.get('/:fileId',[verifyToken,isAdmin],getFile);
routes.post('/create/:productId',[verifyToken,isAdmin],upload.single('file'),createFile);
routes.post('/create-files/:productId',[verifyToken,isAdmin],upload.any('file'),createFiles);
routes.put('/update/:fileId',[verifyToken,isAdmin],upload.single('file'),updateFile);
routes.delete('/delete/:fileId',[verifyToken,isAdmin],deleteFile);
routes.delete('/delete-files',[verifyToken,isAdmin],deleteFiles);

export default routes;