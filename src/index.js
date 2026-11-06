import express from "express";
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {  port  } from "../Config/config.js";
import {  authRouter, messageRouter, userRouter } from "./modules/index.js";
import dbConnection from "./DB/db.connection.js";
import globalErrorHandler from "./Middlewares/global-error-handler.middleware.js";
import cors from 'cors'
import { redisConnection } from "./Common/Clients/redis.client.js";
import { emailTransporter } from "./Common/Clients/email.client.js";
import { sendEmail } from "./Common/Services/email.service.js";
import { compareTwoHashes } from "./Common/Utils/Security/hashing.security.js";
const app=express();
//const port=3000;
//connect to DB//////////
const startServer = async () => {
    try {
        await dbConnection();

        app.listen(port, () => {
            console.log(`Server Running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
    }
};

//run server/////////
startServer();
//redis Connection
redisConnection();
app.use('/uploads',express.static('uploads'))

//parsing body
app.use(cors(),express.json());

/////////////Routers and Controllers  ///////////
app.use('/users',userRouter)
app.use('/messages',messageRouter);
app.use('/auth',authRouter);



//Sample endPoint //////landing page
app.get('/',(req,res)=>res.send("Hello,This is a sample endpoint "));




///////////////////////////////////
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//try connection 
/*
try {
  await sendEmail({
    to:'the_parallel_world@hotmail.com',
    subject:'test_email',
    message:'<h1>Hello</h1>',
    attachments:[{filename:'20210410_180206.jpg',
     path: path.join(__dirname, '20210410_180206.jpg')
    }]
  })
  console.log("Server is ready to take our messages");
} catch (err) {
  console.error("Verification failed:", err);
}*/
//////////////////////////////////


//////////
//NOT Found Route
app.use((req,res)=>
{
    res.status(404).json({message:"Invalid Route"});
})
//Error Handling MiddleWare
app.use(globalErrorHandler)

 

/**
 * 

startServer();
 */
