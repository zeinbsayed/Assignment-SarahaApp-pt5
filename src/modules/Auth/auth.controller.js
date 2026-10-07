import { Router } from "express";
import * as authService from "./auth.service.js"
import * as validators from "./auth.validation.js";
import { BadRequestException } from "../../Utils/Errors/exception.js";
import { ZodError } from "zod";
import { validation } from "../../Middlewares/validation.middleware.js";
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
  








export default authRouter;