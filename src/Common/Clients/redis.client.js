//redis_connection

import { createClient } from "redis"
import { redisConfig } from "../../../Config/redis.config.js";

export const redisClient = createClient(redisConfig);
//.on("error", (err) =>console.log("Redis Client error",err))


export const redisConnection=async()=>
{
    try {
        await redisClient.connect();
        console.log('Redis connection success');
        
        
    } catch (error) {
        console.log("Redis Client error",error)
    }

}