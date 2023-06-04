import bcryptjs from "bcryptjs"
export const encryptPassword = async (password)=>{
    const salt = await bcryptjs.genSalt(10);
    return await bcryptjs.hash(password,salt);
};

export const comparePassword = async(password,hashPassword )=>{
    const matchPassword = await bcryptjs.compare(password,hashPassword)
    return matchPassword
}