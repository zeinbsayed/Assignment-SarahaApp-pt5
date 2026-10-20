import { Router } from "express";
import Users from "../../DB/Models/users.model.js";
import * as userService from "./users.service.js"
import { validation } from "../../Middlewares/validation.middleware.js";
import { userIdSchema, userSchema } from "./users.validation.js";
import { authenticate } from "../../Middlewares/authentication.middleware.js";
import { authorize } from "../../Middlewares/authorization.middleware.js";
import { roleEnum } from "../../Common/constants.js";
const userRouter=Router();

/////////////////////Get User Profile Data////////////////////////
//validation(userSchema)
userRouter.get('/profile',authenticate,authorize([roleEnum.USER]),async(req,res,next)=>
{
   // const{userId}=req.params;
   const {authorization}=req.headers;
  
   
    //const result=await userService.getUserProfile(req.validate.params.userId);
    const result=await userService.getUserProfile(req.authUser);
    res.json({message:"User Profile Data",userData:result})
  
})
/////////////////////Get All Users////////////////////////

userRouter.get('/',authenticate,authorize([roleEnum.ADMIN]),async(req,res)=>
{
    const result=await userService.getAllUsers();
    res.json({message:"Users retrived",userData:result})
  
})

/////////////////////Update User Profile(UpdateOne)////////////////////////

userRouter.patch('/update/',authenticate,authorize([roleEnum.USER,roleEnum.ADMIN]),async(req,res)=>
{
    const{firstName,lastName,email,password,gender,age}=req.body;
  
    const result=await userService.updateProfile({firstName,lastName,email,password,gender,age},req.authUser._id);
    res.json({message:"User Updated Successfully",userUpdated:result})
  
})
/////////////////////Update User Profile(findByIdAndUpdate)////////////////////////

userRouter.patch('/findByIdAndUpdate/',authenticate,async(req,res)=>
{
    const{firstName,lastName,email,password,gender,age}=req.body;
    //const {userId}=req.params;
    const result=await userService.findByIdAndUpdate(req.authUser._id,{firstName,lastName,email,password,gender,age});
    res.json({message:"User Updated Successfully",userUpdated:result})
  
})
/////////////////////Update User Profile(findOneAndUpdate)////////////////////////

userRouter.patch('/findOneAndUpdate',authenticate,async(req,res)=>
{
    const{firstName,lastName,email,password,gender,age}=req.body;
    //const {userId}=req.params;
    const result=await userService.findOneUpdate(req.authUser._id,{firstName,lastName,email,password,gender,age});
    res.json({message:"User Updated Successfully",userUpdated:result})
  
})

/////////////////////Update User Profile(save)////////////////////////

userRouter.patch('/save',authenticate,async(req,res)=>
{
    const{firstName,lastName,email,password,gender,age}=req.body;
    //const {userId}=req.params;
    const result=await userService.save(req.authUser._id,{firstName,lastName,email,password,gender,age});
    res.json({message:"User Updated Successfully",userUpdated:result})
  
})


/////////////////////delete User Profile(deleteOne)////////////////////////

userRouter.delete('/delete',authenticate,async(req,res)=>
{
   
    //const {userId}=req.params;
    const result=await userService.deleteProfile(req.authUser._id);
    res.json({message:"User deleted Successfully",userDeleted:result})
  
})
/////////////////////delete User Profile(findByIdAndDelete)////////////////////////

userRouter.delete('/findByIdAndDelete',authenticate,async(req,res)=>
{
    //const {userId}=req.params;
    const result=await userService.findByIdAndDelete(req.authUser._id);
    res.json({message:"User Deleted Successfully",userDeleted:result})
  
})
/////////////////////delete User Profile(findOneAndUpdate)////////////////////////

userRouter.delete('/findOneAndDelete',authenticate,async(req,res)=>
{
    //const {userId}=req.params;
    const result=await userService.findOneAndDelete(req.authUser._id);
    res.json({message:"User delete Successfully",userdeleted:result})
  
})

export default userRouter;