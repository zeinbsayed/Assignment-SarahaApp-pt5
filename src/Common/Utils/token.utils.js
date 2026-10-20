import jwt from "jsonwebtoken"
import { BadRequestException } from "./Errors/exception.js";
import envConfig from "../../../Config/config.js";
import UserRepository from "../../DB/Repositories/user.repository.js";
import { tokenTypesEnum } from "../constants.js";
const jwtConfig=envConfig.jwt;
const userRepo=new UserRepository();
export const generateToken=(payload,secret,options)=>
{
  return jwt.sign(payload,secret,options);
}
export const verifyToken=(token,secret)=>
{

 
 return jwt.verify(token,secret)
}
export const decodeToken=async({token,tokenType})=>
{


  
 const data=jwt.decode(token); 

 
 if(!data.role)
 {
  throw new BadRequestException('Role not found in token ',null,'MISSING_ROLE')
 }
 const roleSignatures=jwtConfig[data.role];
 let signature;
 switch (tokenType) {
  case tokenTypesEnum.ACCESS_TOKEN:
    signature=roleSignatures.access_token_secret;
    break;
  case tokenTypesEnum.REFRESH_TOKEN:
    signature=roleSignatures.refresh_token_secret;
    break;
  default:
    throw new BadRequestException('Invalid token type',null,'INVALID_TOKEN_TYPE')  

 }

 
    const decodedData=verifyToken(token,signature);
    
    console.log("decodedData:", decodedData);
console.log("userId:", decodedData._id);
    const user= await userRepo.findDocumentById(decodedData._id);
    //console.log(user);
    
    if(!user)
    {
      throw new BadRequestException('User not found',null,'NOTFOUND')

    }
   return user;
}