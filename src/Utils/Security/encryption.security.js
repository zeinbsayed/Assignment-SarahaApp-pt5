import crypto from "node:crypto"
import { ENCRYPTION_KEY_S, IV_LENGTH_S } from "../../../Config/config.js";
const ENCRYPTION_KEY = Buffer.from(ENCRYPTION_KEY_S,'hex');



const IV_LENGTH=parseInt(IV_LENGTH_S);
export const encrypt=(plainText)=>

{
    console.log(ENCRYPTION_KEY_S.length,ENCRYPTION_KEY.length);
    
    const iv=crypto.randomBytes(IV_LENGTH);
    console.log(IV_LENGTH.length);
    const cipher=crypto.createCipheriv('aes-256-cbc',ENCRYPTION_KEY,iv);
    let encrypted=cipher.update(plainText,'utf-8','hex');
    encrypted+=cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
    

}
export const decrypt=(cipher)=>
{
    const [iv,encrptedText]=cipher.split(':');
    console.log(encrptedText.length);
    
    const ivBuffer=Buffer.from(iv,'hex');
    const decipher=crypto.createDecipheriv('aes-256-cbc',ENCRYPTION_KEY,ivBuffer);
    let decipherText=decipher.update(encrptedText,'hex','utf-8');
    decipherText+=decipher.final('utf-8');
    return decipherText;
}