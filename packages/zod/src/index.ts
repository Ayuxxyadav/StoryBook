import z from "zod"


export const signupSchema = z.object({
    username:z.string("username must be unique").min(3),
    email:z.email("email must be unique").min(3),
    password:z.string("password must be atleast 4 char").min(3)
})
export const signinSchema = z.object({
    username:z.string("username must be unique").min(3),
    password:z.string("password must be atleast 4 char").min(3)
})