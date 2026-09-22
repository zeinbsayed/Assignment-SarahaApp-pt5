import { Router } from "express";
import * as authService from "./auth.service.js"
const authRouter=Router();

////////////////////user signUp//////////////////////////////
authRouter.post('/register',async(req,res)=>
{
    const{firstName,lastName,email,password,gender,age,phoneNumber}=req.body;
    const result=await authService.signUp({firstName,lastName,email,password,gender,age,phoneNumber});
    res.status(201).json({message:"User created successfully",userData:result})
  
})


///////////////////User signIn/////////////////////////
authRouter.post('/login',async(req,res)=>
{
    const{email,password}=req.body;
    //console.log({email,password});
    
    const result=await authService.login({email,password});
    res.json({message:"User Logged successfully",userData:result})
  
})







export default authRouter;