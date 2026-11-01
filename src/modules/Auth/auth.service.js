
import UserRepository from "../../DB/Repositories/user.repository.js";
import envConfig from "../../../Config/config.js";
import HttpAppError from "../../Common/Utils/Errors/app-error.js";
import { BadRequestException, ConflictException } from "../../Common/Utils/Errors/exception.js";
import { encrypt } from "../../Common/Utils/Security/encryption.security.js";
import { compareTwoHashes, hash } from "../../Common/Utils/Security/hashing.security.js";
import {  decodeToken, generateToken } from "../../Common/Utils/token.utils.js";
import { providersEnum, tokenTypesEnum } from "../../Common/constants.js";
import  {OAuth2Client} from 'google-auth-library'
import crypto from 'node:crypto'
import { calculateTTL, set } from "../../Common/Services/redis.service.js";
import { v4 as uuidv4 } from 'uuid'; 
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


//buldTokens/////////////////////
const bulidTokens=(user)=>
{
   const tokenPayload={_id:user._id,email:user.email,role:user.role};
     const accessToken=generateToken(tokenPayload,
    envConfig.jwt.user.access_token_secret,
    {expiresIn:envConfig.jwt.user.access_token_expires_in,jwtid:uuidv4()})
     const refreshToken=generateToken(tokenPayload,
    envConfig.jwt.user.refresh_token_secret,
    {expiresIn:envConfig.jwt.user.refresh_token_expires_in,jwtid:uuidv4()})

   return {accessToken,refreshToken };
}
//////////////////////////
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
  return bulidTokens(emailExists)
    
};

export const refreshToken=async(userRefeshToken)=>
{
   
    
 const user =await decodeToken({token:userRefeshToken,tokenType:tokenTypesEnum.REFRESH_TOKEN})
 
 const accessToken=generateToken({_id:user._id,email:user.email,role:user.role},
    envConfig.jwt.user.access_token_secret,
    {expiresIn:envConfig.jwt.user.access_token_expires_in,jwtid:uuidv4()});
  return { message: "Token refreshed Successful",accessToken };
}

const verifyIdToken=async(token)=>
{
   
    
const client = new OAuth2Client();
/*
async function verify() {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: envConfig.GCP.client_id,  
  });
  console.log(({"tiket":ticket}));
  
  const payload = ticket.getPayload();
  return payload;*/



try {




  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: envConfig.GCP.client_id,
  });

  const payload = ticket.getPayload();



  return payload;
} catch (error) {
  console.error("Google verification failed:", error.message);
  throw error;
}

}

//update or create
const updateOrCreateUser=async(user,googleTokenPayload)=>
{
   const {sub,email,given_name,family_name}=googleTokenPayload;
   if(user)
   {
      //update
      const updatedUser=await userRepo.findByIdAndUpdateDocument(user._id,{email,firstName:given_name,lastName:family_name},{new:true,runValidators: true})
     
    console.log("Updated user:", updatedUser);
      return updatedUser;
   
   }else
   {
      //add
      const hashedPassword=await hash(crypto.randomBytes(12).toString('hex'))
      return userRepo.createOneDocument({googleSub:sub
         ,provider:providersEnum.GOOGLE
         ,firstName:given_name
         ,lastName:family_name||""
         ,email,
      password:hashedPassword})
   }

}


/*export const googleRegister=async(idToken)=>
{
   const googleTokenPayload=await verifyIdToken(idToken);
   if(!googleTokenPayload||!googleTokenPayload.email_verified)
   {
      throw new BadRequestException('Not verifiesd user email ',null,'EMAILNOTVERIFIED')
   }
   //find _user 
   const  user=await userRepo.findOneDocument({googleSub:googleTokenPayload.sub,provider:providersEnum.GOOGLE})
   const handeledUser=updateOrCreateUser(user,googleTokenPayload)
    return  bulidTokens(handeledUser);

  
}

export const googleLogin=async (idToken)=>
{
   return true;
  

}
*/

export const googleRegister = async (idToken) => {
  const googleTokenPayload = await verifyIdToken(idToken);

  if (!googleTokenPayload || !googleTokenPayload.email_verified) {
    throw new BadRequestException(
      "Not verified user email",
      null,
      "EMAILNOTVERIFIED"
    );
  }

  const { sub, email } = googleTokenPayload;

  let user = await userRepo.findOneDocument({
    googleSub: sub,
    provider: providersEnum.GOOGLE
  });
 
  if (!user) {
    user = await userRepo.findOneDocument({ email });
  }

  const handledUser = await updateOrCreateUser(
    user,
    googleTokenPayload
  );


  return bulidTokens(handledUser);
}

export const googleLogin = async (idToken) => {
  const googleTokenPayload = await verifyIdToken(idToken);

  
  if (!googleTokenPayload || !googleTokenPayload.email_verified) {
    throw new BadRequestException(
      "Not verified user email",
      null,
      "EMAILNOTVERIFIED"
    );
  }
  //107966536649499866335
    const { sub } = googleTokenPayload;
  let user = await userRepo.findOneDocument({
    googleSub: sub,
    provider: providersEnum.GOOGLE
  });

 
  if (!user) {
   throw new BadRequestException(
      " User not found",
      null,
      "USER_NOT_FOUND"
    );
  }
  return bulidTokens(user);
}

  export const logout=async(accessTokenData,refreshTokenData)=>
  {
    const {exp:accessExpiration,jti:accessId}=accessTokenData;
    const {exp:refreshExpiration,jti:refreshId}=refreshTokenData;
    const accessTTL=calculateTTL(accessExpiration);
    const refreshTTL=calculateTTL(refreshExpiration);
    Promise.all(
      [
        set({key:`bl_${tokenTypesEnum.ACCESS_TOKEN}_${accessId}`,value:"true",options:{EX:accessTTL}}),
        set({key:`bl_${tokenTypesEnum.REFRESH_TOKEN}_${refreshId}`,value:"true",options:{EX:refreshTTL}})

      ]
    )
    return {accessTTL,refreshTTL};
    
  }