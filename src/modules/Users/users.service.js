
import Users from "../../DB/Models/users.model.js";
import { decrypt } from "../../Common/Utils/Security/encryption.security.js";
import UserRepository from "../../DB/Repositories/user.repository.js";
import HttpAppError from "../../Common/Utils/Errors/app-error.js";


//////////userRepo instance//////////////////
const userRepo=new UserRepository();
/////////////////////Get User Profile Data////////////////////////
export const getUserProfile=async(user)=>
{
  // console.log(userId);
   
  /*  if(!isValidObjectId(userId))
    {
      //throw new Error("In-Valid ObjectId")
      throw new HttpAppError("In-Valid ObjectId",409,{InvalidObjectID:userId},"IDConflict");
        
    }*/
    //const user= await Users.findById(userId);
    //const decodedData=verifyToken(token,ACCESS_TOKEN_SECRET);
   // console.log(decodedData);
    
    //const user= await userRepo.findDocumentById(userId);
   
    if(user.phoneNumber)
    {
   user.phoneNumber=decrypt(user.phoneNumber);
    }
    
    /*if(!user)
    {
       // throw new Error("User Not found");
       throw new HttpAppError("User Not found",404,{"Notfound":user},"NOTFOUND");

    }*/
   return user;
}
////////////////////Get All Users////////////////////
export const getAllUsers=async()=>
{
 const users= await Users.find().select("-password").sort({firstName:-1}).limit(3).skip(1);
 if(users.length==0)
 {
    //throw new Error("No Users Found");
    throw new HttpAppError("No Users Found",404,{"Notfound":users},"NOTFOUND");
    
 }
 return users;
}
////////////////Update User Profile(UpdateOne)/////////////////////////////////
export const updateProfile=async(inputs,userId)=>
{
 const{firstName,lastName,email,password,gender,age}=inputs;
 //return Users.updateOne({_id:userId},{firstName,lastName,email,password,gender,age});
  return userRepo.updateOneDocument({_id:userId},{firstName,lastName,email,password,gender,age});

}
////////////////Update User Profile(findByIdAndUpdate)/////////////////////////////////
export const findByIdAndUpdate=async(userId,inputs)=>
{
 const{firstName,lastName,email,password,gender,age}=inputs;
 //return Users.findByIdAndUpdate(userId,{firstName,lastName,email,password,gender,age},{new:true,runValidators:true});
 return userRepo.findByIdAndUpdateDocument(userId,{firstName,lastName,email,password,gender,age},{new:true,runValidators:true});

}

////////////////Update User Profile(findOneAndUpdate)/////////////////////////////////
export const findOneUpdate=async(userId,inputs)=>
{
 const{firstName,lastName,email,password,gender,age}=inputs;
 //return Users.findOneAndUpdate({_id:userId},{firstName,lastName,email,password,gender,age},{new:true,runValidators:true});
 return userRepo.findOneAndUpdateDocument({_id:userId},{firstName,lastName,email,password,gender,age},{new:true,runValidators:true});

}
/////////
////////////////Update User Profile(save)/////////////////////////////////
export const save=async(userId,inputs)=>
{
 const{firstName,lastName,email,password,gender,age}=inputs;
 //const user=await Users.findById(userId);
  const user=await userRepo.findDocumentById(userId);
 if(firstName) user.firstName=firstName;
 if(lastName) user.lastName=lastName;
 if(email)
    {
    //const emailExists=await Users.findOne({email,_id:{$ne:userId}})
    const emailExists=await userRepo.findOneDocument({email,_id:{$ne:userId}})
      if(emailExists)
       {
        // throw new Error("Email already exists");
         throw new HttpAppError("Email already exists",409,{duplicateEmail:email},"EmailConflict");
         
       }
      user.email=email;  
    } 
 if(password) user.password=password;
 if(gender) user.gender=gender;
 if(age) user.age=age;
 return user.save();
}

////////////////delete User Profile(UpdateOne)/////////////////////////////////
export const deleteProfile=async(userId)=>
{
    //return Users.deleteOne({_id:userId});
    return userRepo.deleteOneDocument({_id:userId});
}
////////////////delete User Profile(findByIdAndDelete)/////////////////////////////////
export const findByIdAndDelete=async(userId)=>
{
 //return Users.findByIdAndDelete(userId);
 return userRepo.findByIdAndDeleteDocument(userId);
}

////////////////delete User Profile(findOneAndDelete)/////////////////////////////////
export const findOneAndDelete=async(userId)=>
{
 //return Users.findOneAndDelete({_id:userId});
 return userRepo.findOneAndDeleteDocument({_id:userId});
}
////////////////upload User Profile picture(uploadProfilePicture)/////////////////////////////////
export const uploadProfilePicture=async(file,user)=>
{
 console.log("path",file.path);
 
 const result=await userRepo.findByIdAndUpdateDocument(user._id,{profilePicture:file.path},{new:true});
 console.log(result);
 return result;
 
}