import multer from 'multer'
import fs from 'node:fs'
import crypto from 'node:crypto'
import { allowedExtentions } from '../Common/constants.js'
import { BadRequestException } from '../Common/Utils/Errors/exception.js'
import { fileTypeFromFile } from 'file-type'
export const multerUpload=({desiredPath})=>
    //validate if destination is exist
{   const fullDestinationPath=`uploads/${desiredPath}`
     
    if(!fs.existsSync(fullDestinationPath))
    {
        fs.mkdirSync(fullDestinationPath,{recursive:true})
    }
    //storage-disk storage 
    const storage=multer.diskStorage({
        destination:function(req,file,cb)
        {
            cb(null,fullDestinationPath)
        }  ,
        filename:function(req,file,cb)
        {
           const suffix = `${crypto.randomBytes(5).toString('hex')}_${Date.now()}`;
            cb(null,`${suffix}__${file.originalname}`)
        }
    });

    //file filter
    const fileFilter=async(req,file,cb)=>
    {
        const fileMimeType=file.mimetype; 
        const [fileType,inputFileExtention]=fileMimeType.split('/');
        const fileExtentions=allowedExtentions[fileType];
      
        if(fileExtentions.includes(inputFileExtention))
        { 
            cb(null,true)

        }else{
            cb(new BadRequestException('Invalid File Extention'),false)
        }

    }
  return multer({storage,fileFilter})
}