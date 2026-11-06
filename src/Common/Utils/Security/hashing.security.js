import * as bcrypt  from "bcrypt"


/*export const hash=async(plainText)=>
{
  return await argon2.hash(plainText);
}
export const compareTwoHashes=(hash,plainText)=>
{
 return argon2.verify(hash,plainText);
}*/
export const hash=async(plainText)=>
{
  return  bcrypt.hash(plainText,10);
}
export const compareTwoHashes=(hash,plainText)=>
{
 return bcrypt.compare(plainText,hash);
}