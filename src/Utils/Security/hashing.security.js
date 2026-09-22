import * as argon2  from "argon2"


export const hash=async(plainText)=>
{
  return await argon2.hash(plainText);
}
export const compareTwoHashes=(hash,plainText)=>
{
 return argon2.verify(hash,plainText);
}