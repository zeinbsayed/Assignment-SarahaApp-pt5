import { Router } from "express";
import * as authService from "./auth.service.js"
import * as validators from "./auth.validation.js";
import { ZodError } from "zod";
import { validation } from "../../Middlewares/validation.middleware.js";
import { BadRequestException } from "../../Common/Utils/Errors/exception.js";
import { authenticate } from "../../Middlewares/authentication.middleware.js";
import { decodeRefreshToken } from "../../Middlewares/decodeRefreshToken.middleware.js";
const authRouter=Router();

////////////////////user signUp//////////////////////////////
authRouter.post('/register',validation(validators.signup),async(req,res)=>
{
   // const{firstName,lastName,email,password,gender,age,phoneNumber}=req.body;
    /*const result=await authService.signUp({firstName,lastName,email,password,gender,age,phoneNumber});
    res.status(201).json({message:"User created successfully",userData:result})*/
    //console.log({firstName,lastName,email,password,gender,age,phoneNumber});
    
   /* const validationResult = signupSchema.safeParse(req.body);
    console.log("validationResult:",validationResult);
    
    if(!validationResult.success)
    {
        throw new BadRequestException("validationError",validationResult.error.issues)
    }
*/
const result = await authService.signUp(req.validate.body);

res.json({
    message: "User registered successfully",
    userData: result
});
  
})


///////////////////User signIn/////////////////////////
authRouter.post('/login',validation(validators.login),async(req,res,next)=>
{

    /*const validationResult = loginSchema.safeParse(req.body);
    if(!validationResult.success)
    {
        throw new BadRequestException("validationError",validationResult.error.issues)
    }
*/

const result = await authService.login(req.validate.body);

res.json({
    message: "User Logged successfully",
    userData: result
});
})    //const result=await authService.login(validationResult);
    //res.json({message:"User Logged successfully",userData:result})
  




authRouter.post('/refresh-token',async(req,res,next)=>
{
    const {refreshtoken}=req.headers;
   
    
    if(!refreshtoken)
    {
        throw new BadRequestException('Refresh Token is required',null,'MISSING_REFRESH_TOKEN')
    }
    const result=await authService.refreshToken(refreshtoken)
    res.status(200).json({message:"Token refreshed successfully",data:result})
})

//google-register

authRouter.post('/google-register',async(req,res,next)=>
{
    
    const {idToken}=req.body;
   
    
    if(!idToken)
    {
        throw new BadRequestException('Google Token id is required',null,'MISSING_TOKEN_ID')
    }
    const result=await authService.googleRegister(idToken)
    res.status(200).json({message:"user registered successfully",data:result});
    
})


//google-login
authRouter.post('/google-login',async(req,res,next)=>
{
    
    
    
    
    
    const {idToken}=req.body;
   

    
    if(!idToken)
    {
        throw new BadRequestException('Google Token id is required',null,'MISSING_TOKEN_ID')
    }
    const result=await authService.googleLogin(idToken)
    res.status(200).json({message:"user logged successfully",data:result})
})

////////////logout 
//google-login
authRouter.post('/logout',authenticate,decodeRefreshToken,async(req,res,next)=>
{
    console.log("AcessTokenData",req.accessTokenData);
    console.log("RefreshTokenData",req.refreshTokenData);
    const result=await authService.logout(req.accessTokenData,req.refreshTokenData)
    res.status(200).json({message:"user logged out successfully",data:result})
})
export default authRouter;