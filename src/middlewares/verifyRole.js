import { getRoleById } from "../services/roleServices.js";
import { getUserById } from "../services/userServices.js";


export const isAdmin = async(req, res, next)=>{
    try {
        const {id} = req.user;
        const user = await getUserById(id);
        const userRole = user.role;
        const role = await getRoleById(userRole.id);
        if(role.name === 'admin'){
            next()
            return
        }
        return res.status(400).json({
            meta: {
              status: 400,
            },
            error: {
              message: "Required admin",
            },
          });
    } catch (error) {
        return res.status(500).json({
            meta: {
              status: 500,
            },
            error: {
              message: "Server error",
              details: error.message,
            },
          });
        
    }
}