import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.connection.js";

export class Comments extends Model{}
{

    Comments.init({
          id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        content:{
            type:DataTypes.TEXT,
            allowNull:false
        }

    },
    {sequelize,
    freezeTableName:true,
    paranoid:true
    }
    );
}