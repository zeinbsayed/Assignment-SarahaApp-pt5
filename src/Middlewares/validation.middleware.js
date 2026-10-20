import { BadRequestException } from "../Common/Utils/Errors/exception.js";

export const validation=(schema)=>
{

    return async(req,res,next)=>
    {
         const validationResult = schema.safeParse({body:req.body,query:req.query,params:req.params});
            if(!validationResult.success)
            {
                throw new BadRequestException("validationError",validationResult.error.issues)
            }
            req.validate=validationResult.data;
        
          next();

    }
}