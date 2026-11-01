import mongoose from "mongoose";
import { genderEnum, providersEnum, roleEnum } from "../../Common/constants.js";

const userSchema=new mongoose.Schema(
   {
    firstName:
    {
      type:String,
      required:true,
      minLength:[3,"First Name must be at least 3 Characters long"],
      maxLength:[30,"First Name must be at most 30 Characters long"],
      lowercase:true,
      trim:true
    },
       lastName:
    {
      type:String,
      required:true,
      minLength:[3,"Last Name must be at least 3 Characters long"],
      maxLength:[30,"Last Name must be at most 30 Characters long"],
      lowercase:true,
      trim:true
    },
      email:
    {
      type:String,
      required:true,
      index:{name:"idx_name_unique",unique:true},
  
    },
    password:
    {
       type:String,
      required:true,

    },
    gender:
    {
      type:String,
      enum:Object.values(genderEnum),
      default:genderEnum.MALE
    },
    age:
    {
      type:Number,
      min:[18,"Age must be at least 18"],
      max:[100,"Age must be at most 100"]
    },
    profilePicture:
    {
      type:String
    },
    phoneNumber:String,
    role:{
      type:String,
      enum:Object.values(roleEnum),
      default:"user"
    },
    googleSub:{
      type:String,
      index:
      {
        name:"idx_google_sub_unique",
        unique:true
      },
    },
      provider:
      {
        type:String,
        enum:Object.values(providersEnum),
        default:providersEnum.SYSTEM
      }
    
   },
   {
    virtuals:
    {
      fullName:
      {
        get(){
         return `${this.firstName}_${this.lastName}`
        }
      }

    },
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
    timestamps:true
   }
)

  
const Users=mongoose.model('Users',userSchema);
export default Users;