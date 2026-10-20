import { resolve } from "node:path";
import { config } from "dotenv";

export const NODE_ENV = process.env.NODE_ENV;

const envPath = {
  development: `.env.development`,
  production: `.env.production`,
};

config({ path: resolve(`./config/${envPath[NODE_ENV]}`) });



const envConfig = {
   
    jwt: {
        user: {
            access_token_secret: process.env.USER_ACCESS_TOKEN_SECRET,
            access_token_expires_in:parseInt(process.env.USER_ACCESS_TOKEN_EXPIRE_IN),
            refresh_token_secret: process.env.USER_REFRESH_TOKEN_SECRET,
            refresh_token_expires_in:parseInt(process.env.USER_REFRESH_TOKEN_EXPIRE_IN)
        },
        admin: {
            access_token_secret: process.env.ADMIN_ACCESS_TOKEN_SECRET,
            access_token_expires_in:parseInt(process.env.ADMIN_ACCESS_TOKEN_EXPIRE_IN),
            refresh_token_secret: process.env.ADMIN_REFRESH_TOKEN_SECRET,
            refresh_token_expires_in:parseInt(process.env.ADMIN_REFRESH_TOKEN_EXPIRE_IN)
        }
    }
};


export default envConfig;
export const port = process.env.PORT ?? 7000;
export const DB_URI = process.env.DB_URI ;
export const IV_LENGTH_S=process.env.IV_LENGTH_S;
export const ENCRYPTION_KEY_S=process.env.ENCRYPTION_KEY_S;
/*export const USER_ACCESS_TOKEN_SECRET=process.env.USER_ACCESS_TOKEN_SECRET;
export const USER_ACCESS_TOKEN_SECRET_EXPIRE_IN=process.env.USER_ACCESS_TOKEN_SECRET_EXPIRE_IN;
export const AMIN_ACCESS_TOKEN_SECRET=process.env.ADMIN_ACCESS_TOKEN_SECRET;
export const ADMIN_ACCESS_TOKEN_SECRET_EXPIRE_IN=process.env.ADMIN_ACCESS_TOKEN_SECRET_EXPIRE_IN;
*/