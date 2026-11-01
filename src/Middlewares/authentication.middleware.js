import envConfig from "../../Config/config.js";
import UserRepository from "../DB/Repositories/user.repository.js";
import { BadRequestException } from "../Common/Utils/Errors/exception.js";
import { decodeToken, verifyToken } from "../Common/Utils/token.utils.js";
import { tokenTypesEnum } from "../Common/constants.js";

export const authenticate=async(req,res,next)=>
{
    const userRepo=new UserRepository();
    const {authorization}=req.headers;  

    
    if(!authorization)
    {
        throw new BadRequestException('Authorization is missing !');
    }
     const [prefix,token]=authorization.split(" ");
    if(prefix!='Bearer'||!token)
    {
        throw new BadRequestException('Invalid authorization header format ')
    }
     //const decodedData=verifyToken(token,envConfig.jwt.user.access_token_secret);
       /*const user= await userRepo.findDocumentById(decodedData._id);
     if(!user)
     {
        throw new BadRequestException('user not found',null,'UNAUTHORIZED');
     }*/
     const {user,tokenData}=await decodeToken({token,tokenType:tokenTypesEnum.ACCESS_TOKEN});
     
    //console.log("userrrr",user);
    
     req.authUser=user;
     req.accessTokenData=tokenData;
     next();
}

/*export const authorize=>()
{
    return (req,res,next)=>{}
}*/