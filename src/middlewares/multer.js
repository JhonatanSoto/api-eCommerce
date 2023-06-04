import multer from "multer";
import path from 'path'
import {v4 as uuid} from "uuid";
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        let folder ;
        req.originalUrl.includes('files') ? folder = 'files' : folder = 'users'  

        const destFile = path.resolve(`public/upload/${folder}`);
        cb(null,destFile)
    },
    filename:(req, file, cb)=>{
        const nameFile = `${file.fieldname}-${uuid()}${path.extname(file.originalname)}`;
        cb(null, nameFile);
    }
});

const upload = multer({storage});

export default upload;