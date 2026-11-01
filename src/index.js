import express from "express";
import {  port  } from "../Config/config.js";
import {  authRouter, messageRouter, userRouter } from "./modules/index.js";
import dbConnection from "./DB/db.connection.js";
import globalErrorHandler from "./Middlewares/global-error-handler.middleware.js";
import cors from 'cors'
import { redisConnection } from "./Common/Clients/redis.client.js";
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

//parsing body
app.use(cors(),express.json());

/////////////Routers and Controllers  ///////////
app.use('/users',userRouter)
app.use('/messages',messageRouter);
app.use('/auth',authRouter);



//Sample endPoint //////landing page
app.get('/',(req,res)=>res.send("Hello,This is a sample endpoint "));










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
