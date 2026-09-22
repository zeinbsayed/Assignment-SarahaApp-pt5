const globalErrorHandler=(error,req,res,next)=>
{
  const status=error.statusCode||500;
  return res
  .status(status)
  .json({
    error,
    message:error.message||"Something went wrong",
    errorBody:error.data,
    errorCode:error.code,
    stack:error.stack
  })
}

export default globalErrorHandler;