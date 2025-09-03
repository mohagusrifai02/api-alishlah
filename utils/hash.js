import bcrypt from "bcryptjs";

export const hashPassword = async(plain)=>{
    return await bcrypt.hash(plain, 0);
}

export const comparePassword= async(plain, hashed)=>{
    return await bcrypt.compare(plain, hashed);
}