import { Router } from "express";
const messageRouter=Router();
messageRouter.get('/',(req,res)=>
{
  res.json({message:"welcome to messages"})
})
export default messageRouter;