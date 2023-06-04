import { Router } from "express";
import { createProduct, deactivateProduct, deleteProduct, getAllProducts, getProduct, restoreProduct, updateProduct } from "../controllers/productController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const routes = Router();

routes.get('/',getAllProducts);
routes.get('/:productId',getProduct);

routes.post('/create',verifyToken ,createProduct);

routes.put('/update/:productId',verifyToken,updateProduct);
routes.put('/deactivate/:productId',verifyToken,deactivateProduct);
routes.put('/restore/:productId',verifyToken,restoreProduct);
routes.delete('/delete/:productId',verifyToken,deleteProduct);

export default routes