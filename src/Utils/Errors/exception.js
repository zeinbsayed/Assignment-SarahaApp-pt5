import HttpAppError from "./app-error.js";

export class BadRequestException extends HttpAppError{
  
    constructor(message="bad-request",
    data={},
    code="BAD REQUEST")
    {

    super(message,400,data,code);
   
   
    }
}


export class ConflictException extends HttpAppError{
  
    constructor(message="conflic",
    data={},
    code="CONFLICT")
    {

    super(message,409,data,code);
   

    }
}
