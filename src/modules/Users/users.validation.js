import { z } from "zod";
import { isValidObjectId } from "mongoose";
import { signupSchema } from "../Auth/auth.validation.js";

export const userIdSchema = z.string().refine(
  (id) => isValidObjectId(id),
  {
    message: "Invalid User ID",
  }
);
  
export const user = z.object({
  body: signupSchema,

  query: z.object({
    userId: userIdSchema
  }),

  params: z.object({
    userId: userIdSchema
  })
});
export const userSchema = z.object({
  body: z.object({}).optional(),
  query: z.strictObject({}),
  params: z.object({
    userId: userIdSchema
  })
});