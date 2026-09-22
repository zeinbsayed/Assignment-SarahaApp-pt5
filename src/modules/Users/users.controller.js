import { Router } from "express";
import Users from "../../DB/Models/users.model.js";
import * as userService from "./users.service.js"
const userRouter=Router();

/////////////////////Get User Profile Data////////////////////////

userRouter.get('/profile/:userId',async(req,res)=>
{
    const{userId}=req.params;
    const result=await userService.getUserProfile(userId);
    res.json({message:"User Profile Data",userData:result})
  
})
/////////////////////Get All Users////////////////////////

userRouter.get('/',async(req,res)=>
{
    const result=await userService.getAllUsers();
    res.json({message:"Users retrived",userData:result})
  
})

/////////////////////Update User Profile(UpdateOne)////////////////////////

userRouter.patch('/update/:userId',async(req,res)=>
{
    const{firstName,lastName,email,password,gender,age}=req.body;
    const {userId}=req.params;
    const result=await userService.updateProfile({firstName,lastName,email,password,gender,age},userId);
    res.json({message:"User Updated Successfully",userUpdated:result})
  
})
/////////////////////Update User Profile(findByIdAndUpdate)////////////////////////

userRouter.patch('/findByIdAndUpdate/:userId',async(req,res)=>
{
    const{firstName,lastName,email,password,gender,age}=req.body;
    const {userId}=req.params;
    const result=await userService.findByIdAndUpdate(userId,{firstName,lastName,email,password,gender,age});
    res.json({message:"User Updated Successfully",userUpdated:result})
  
})
/////////////////////Update User Profile(findOneAndUpdate)////////////////////////

userRouter.patch('/findOneAndUpdate/:userId',async(req,res)=>
{
    const{firstName,lastName,email,password,gender,age}=req.body;
    const {userId}=req.params;
    const result=await userService.findOneUpdate(userId,{firstName,lastName,email,password,gender,age});
    res.json({message:"User Updated Successfully",userUpdated:result})
  
})

/////////////////////Update User Profile(save)////////////////////////

userRouter.patch('/save/:userId',async(req,res)=>
{
    const{firstName,lastName,email,password,gender,age}=req.body;
    const {userId}=req.params;
    const result=await userService.save(userId,{firstName,lastName,email,password,gender,age});
    res.json({message:"User Updated Successfully",userUpdated:result})
  
})


/////////////////////delete User Profile(deleteOne)////////////////////////

userRouter.delete('/delete/:userId',async(req,res)=>
{
   
    const {userId}=req.params;
    const result=await userService.deleteProfile(userId);
    res.json({message:"User deleted Successfully",userDeleted:result})
  
})
/////////////////////delete User Profile(findByIdAndDelete)////////////////////////

userRouter.delete('/findByIdAndDelete/:userId',async(req,res)=>
{
    const {userId}=req.params;
    const result=await userService.findByIdAndDelete(userId);
    res.json({message:"User Deleted Successfully",userDeleted:result})
  
})
/////////////////////delete User Profile(findOneAndUpdate)////////////////////////

userRouter.delete('/findOneAndDelete/:userId',async(req,res)=>
{
    const {userId}=req.params;
    const result=await userService.findOneAndDelete(userId);
    res.json({message:"User delete Successfully",userdeleted:result})
  
})

export default userRouter;