import { resolve } from "node:path";
import { config } from "dotenv";

export const NODE_ENV = process.env.NODE_ENV;

const envPath = {
  development: `.env.development`,
  production: `.env.production`,
};

config({ path: resolve(`./config/${envPath[NODE_ENV]}`) });

export const port = process.env.PORT ?? 7000;
export const DB_URI = process.env.DB_URI ;
export const IV_LENGTH_S=process.env.IV_LENGTH_S;
export const ENCRYPTION_KEY_S=process.env.ENCRYPTION_KEY_S;
