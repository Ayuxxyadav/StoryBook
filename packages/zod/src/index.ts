import z from "zod"


export const signupSchema = z.object({
    username:z.string("username must be unique").min(3),
    email:z.email("email must be unique").min(3),
    password:z.string("password must be atleast 4 characters").min(3)
})
export const signinSchema = z.object({
    username:z.string("username must be unique").min(3),
    password:z.string("password must be atleast 4 characters").min(3)
})
export const createStorySchema = z.object({
    title:z.string("Title must be atleast 4 characters").min(3),
    description:z.string("Description must be atleast 8 characters").min(7),
    content:z.string("Description must be atleast 10 characters").min(9)
})
