import mongoose from "mongoose";
import {DB_URI } from "../../Config/config.js";
import dns from "node:dns"
dns.setServers(["1.1.1.1"]);
 const dbConnection=async()=>
{
    try {
        await mongoose.connect(DB_URI);
        console.log("Database connectes sucessfully");
        
    } catch (error) {
        console.log("Database failed to connect",error);
        
    }

}
export default dbConnection;