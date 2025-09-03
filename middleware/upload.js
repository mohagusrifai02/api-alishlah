import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'public/gmb');
    },
    filename:(req,file,cb)=>{
        const uniqueName =  Date.now() + '-' + file.originalname;
        cb(null, uniqueName);
    }
});

const fileFilter =(req,file,cb)=>{
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true);
    } else {
        cb(new Error('hanya type gambar yang diizinkan'), false);
    }
}

export const upload = multer({storage, fileFilter});