import Roles from "../database/models/Roles.js";

export const getRoleByName = async(name)=>{
    try {
        const role = await Roles.findOne({name:name}); 
        return role ? role._id : null
    } catch (error) {
       throw new Error('Error getting role') 
    }
}

export const getRoleById = async (roleId)=>{
    const role = await Roles.findOne({_id:roleId});
    return role
}