import envConfig from "../../../Config/config.js";
import { emailTransporter } from "../Clients/email.client.js"
import { BadRequestException } from "../Utils/Errors/exception.js";
import { EventEmitter } from "events";
export const sendEmail=async({to,subject='No-Reply',message,attachments=[]})=>
{

    
    const {email}=envConfig;
    console.log("email",email);
    
    if(!message&&!attachments.length)
    {
        throw new BadRequestException('message or attachment are required ..',null,'SEND_EMAIL_ERROR')
    }
    try {
  const info = await emailTransporter.sendMail({
    from: `"NO-Reply" <${email.user}>`, 
    to, 
    subject, 
    html:message ,
    attachments: attachments
  });
  return true;
} catch (err) {
  console.error("Error while sending mail:", err);
  throw new BadRequestException("Error while sending mail:",null,'SEND_EMAIL_ERROR')
}
}

//event 

export const  eventEmitter=new EventEmitter();
eventEmitter.on('sendMailEvent',({to,subject='NO_Reply',message,attachments=[]})=>
{
     sendEmail({
        to,
        subject,
        message,
        attachments
       })
       console.log("data received successfully");
       

})
