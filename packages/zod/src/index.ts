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
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  description: z
    .string()
    .min(7, "Description must be at least 7 characters")
    .optional()
    .or(z.literal("")),

  content: z
    .string()
    .min(9, "Content must be at least 9 characters"),
});

