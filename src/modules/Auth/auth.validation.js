import * as z from "zod";

export const loginSchema=z.strictObject({
    email:z.email({error:"provide valid email"}),
    password:z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!%&*])[A-Za-z\d@#$!%&*]{8,}$/,{error:"password must contain at least 8 chars and must atleast one UpeerCase and at least one lowecase and at least one digit and symbol"})
});

export const login=z.object({
    body:loginSchema,
    query:z.strictObject({
        lang:z.enum(["en","ar"]).default("en")
    }),
    params:z.strictObject({

    })
})

export const signupSchema=loginSchema.extend({
   username: z.string().regex(/^[A-Za-z\u0621-\u064A]+(?:\s+[A-Za-z\u0621-\u064A]+)+$/,{error:"username must contain two parts"}),
    phoneNumber:z.string().regex(/^(\+20|0020)?1[0125][0-9]{8}$/),
    age:z.number().min(16,{error:"age must be at least 16 years old"}).max(60).optional(),
    gender:z.enum(['male','female','other']).default("male"),
    confirmPassword:z.string()
}).
/*superRefine((data,ctx)=>
{
    if(data.password!==data.confirmPassword)
    {
        ctx.addIssue({
            code:"custom",
        message:"password and confirmation password is missmatch ",
        path:["confirmPassword"]
        })

    }
    if(!data.username.includes(" "))
    {
         ctx.addIssue({
            code:"custom",
        message:"username must contain two parts ",
        path:["username"]
        })
    }
})*/
refine((data)=>
{
    return data.password==data.confirmPassword
},
{
    message:"password and confirmation password is missmatch ",
    path:["confirmPassword"]
});


export const signup=z.object({
    body:signupSchema,
    query:z.strictObject({
        lang:z.enum(["en","ar"]).default("en")
    }),
    params:z.strictObject({

    })
})