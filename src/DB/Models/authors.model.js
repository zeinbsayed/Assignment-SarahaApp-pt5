import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.connection.js";

export class Posts extends Model{}
{
    Posts.init({
          id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        title:{
        type:DataTypes.STRING(100),
        allowNull:false,
        validate:{
                checktitleLength(value) {
                 if (value.length <= 2) {
                  throw new Error("title must be greater than 2 characters",{cause:{status:400}});
               }
                }
            }
        },
        content:{
            type:DataTypes.TEXT,
            allowNull:false
        }

    },
    {sequelize,
    freezeTableName:true
    }
    );
}