
import UserRepository from "../../DB/Repositories/user.repository.js";
import envConfig from "../../../Config/config.js";
import HttpAppError from "../../Common/Utils/Errors/app-error.js";
import { BadRequestException, ConflictException } from "../../Common/Utils/Errors/exception.js";
import { encrypt } from "../../Common/Utils/Security/encryption.security.js";
import { compareTwoHashes } from "../../Common/Utils/Security/hashing.security.js";
import {  decodeToken, generateToken } from "../../Common/Utils/token.utils.js";
import { tokenTypesEnum } from "../../Common/constants.js";
////////////////////user sign up////////////////////////
const userRepo=new UserRepository();
export const signUp=async (userData)=>
{
 const{username,email,password,gender,age,phoneNumber,role}=userData;
 const usernamesplit=username.split(" ");
 const firstName=usernamesplit[0];
 const lastName=usernamesplit[1];
 const emailExists=await userRepo.findUserByEmail(email);
 if(emailExists)
 {
    //throw new Error("Email already exists");
    throw new HttpAppError("Email already exists",409,{duplicateEmail:email},"EmailConflict");
 }
 let encryptionPhone;
 if(phoneNumber) { encryptionPhone=encrypt(phoneNumber)}
// console.log(encryptionPhone);
 const hashedPassword=await hash(password);
 //return Users.create({firstName,lastName,email,password:hashedPassword,gender,age
   //,phoneNumber:encryptionPhone||undefined});
return userRepo.createOneDocument(
   {firstName,
      lastName,
      email,
      password:hashedPassword,
      gender,age
   ,phoneNumber:encryptionPhone||undefined
,role});
 //const userInstance=new Users({firstName,lastName,email,password,gender,age});
 //console.log(userInstance);
 
 //return userInstance.save();
}
///////////////user sign in////////////////////////// 
/*export const login=async({email,password})=>
{
   
   
    const emailExists=await userRepo.findUserByEmail(email);
    
 if(!emailExists)
 {
   // throw new Error("Email already exists");
   // throw new HttpAppError("Email already exists",409,{duplicateEmail:email},"EmailConflict");
    throw new ConflictException("There is a problem with email or password ",{duplicateEmail:email},"EmailConflict");


 }
 
 const isPasswordMatched=await compareTwoHashes(emailExists.password,password);
 if(!isPasswordMatched)
 {
          throw new BadRequestException("There is a problem with email or password");

 }

 
 return {message:'Login Sucessful'};

}
*/
export const login = async (userData) => {
 const { email, password }=userData;
    const emailExists = await userRepo.findUserByEmail(email);

    //console.log(" email:", email);
    //console.log(" emailExists:", emailExists);

    if (!emailExists) {
        console.log("User not found");

        throw new ConflictException(
            "There is a problem with email or password",
            { duplicateEmail: email },
            "EmailConflict"
        );
    }

    console.log(" password:", emailExists.password);

    const isPasswordMatched = await compareTwoHashes(
        emailExists.password,
        password
    );

    if (!isPasswordMatched) {
        throw new BadRequestException(
            "There is a problem with email or password"
        );
    }
  //generate acess token
  //console.log(envConfig.jwt.user);
  const accessToken=generateToken({_id:emailExists._id,email:emailExists.email,role:emailExists.role},
    envConfig.jwt.user.access_token_secret,
    {expiresIn:envConfig.jwt.user.access_token_expires_in})
     const refreshToken=generateToken({_id:emailExists._id,email:emailExists.email,role:emailExists.role},
    envConfig.jwt.user.refresh_token_secret,
    {expiresIn:envConfig.jwt.user.refresh_token_expires_in})
    return { message: "Login Successful",accessToken,refreshToken };
};

export const refreshToken=async(userRefeshToken)=>
{
   
    
 const user =await decodeToken({token:userRefeshToken,tokenType:tokenTypesEnum.REFRESH_TOKEN})
 
 const accessToken=generateToken({_id:user._id,email:user.email,role:user.role},
    envConfig.jwt.user.access_token_secret,
    {expiresIn:envConfig.jwt.user.access_token_expires_in});
  return { message: "Token refreshed Successful",accessToken };
}