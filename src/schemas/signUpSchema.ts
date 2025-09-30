import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be at least 2 characters")
  .max(20, "Username must not be more than 20 characters")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username can only contain letters, numbers, and underscores"
  );


export const signUpSchema = z.object({
    username : usernameValidation,
    email : z.string().email({message:"Invalid email"}),
    password : z.string().min(6,{message: "password must be atleast 6 char"})
})
