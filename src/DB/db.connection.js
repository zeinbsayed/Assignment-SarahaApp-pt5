import mongoose from "mongoose";

import dns from "node:dns"
import { dbConfig } from "../../Config/db.config.js";
dns.setServers(["1.1.1.1"]);
 const dbConnection=async()=>
{
    try {
        await mongoose.connect(dbConfig);
        console.log("Database connectes sucessfully");
        
    } catch (error) {
        console.log("Database failed to connect",error);
        
    }

}
export default dbConnection;