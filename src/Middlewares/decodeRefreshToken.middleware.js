import envConfig from "../../Config/config.js";
import UserRepository from "../DB/Repositories/user.repository.js";
import { BadRequestException } from "../Common/Utils/Errors/exception.js";
import { decodeToken, verifyToken } from "../Common/Utils/token.utils.js";
import { tokenTypesEnum } from "../Common/constants.js";

export const decodeRefreshToken=async(req,res,next)=>
{
    
    const {refreshtoken}=req.headers;  

    
    if(!refreshtoken)
    {
        throw new BadRequestException('refresh token is missing !');
    }
     const [prefix,token]=refreshtoken.split(" ");
    if(prefix!='Bearer'||!token)
    {
        throw new BadRequestException('Invalid refresh token header format ')
    }

     const {tokenData}=await decodeToken({token,tokenType:tokenTypesEnum.REFRESH_TOKEN});
     
   
    
    
     req.refreshTokenData=tokenData;
     next();
}

