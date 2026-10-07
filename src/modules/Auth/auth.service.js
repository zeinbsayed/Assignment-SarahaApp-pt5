import Users from "../../DB/Models/users.model.js";
import UserRepository from "../../DB/Repositories/user.repository.js";
import HttpAppError from "../../Utils/Errors/app-error.js";
import { BadRequestException, ConflictException } from "../../Utils/Errors/exception.js";
import { encrypt } from "../../Utils/Security/encryption.security.js";
import { compareTwoHashes, hash } from "../../Utils/Security/hashing.security.js";
////////////////////user sign up////////////////////////
const userRepo=new UserRepository();
export const signUp=async (userData)=>
{
 const{username,email,password,gender,age,phoneNumber}=userData;
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
   ,phoneNumber:encryptionPhone||undefined});
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

    console.log(" email:", email);
    console.log(" emailExists:", emailExists);

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

    return { message: "Login Successful" };
};