import { UnauthorizedException } from "../Common/Utils/Errors/exception.js";

export const authorize=(allowedRoles)=>
{
  return (req,res,next)=>
  {
    const loggedInRoles=req.authUser.role;
    if(!allowedRoles.includes(loggedInRoles))
    {
        throw new UnauthorizedException('User is not authorized to access this resource',null,'Unauthorized ')
    }
    console.log(loggedInRoles,allowedRoles,allowedRoles.includes(loggedInRoles));
    
    next();
  }
}