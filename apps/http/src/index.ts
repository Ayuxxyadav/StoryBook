const express = require("express")
import { Request , Response } from "express";
import {signupSchema,signinSchema, createStorySchema} from "@repo/zod/zod"
import {prisma} from "@repo/db/client"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cors from "cors"
import Middleware from "./middleware";



dotenv.config()
const Port = process.env.Port

const Secret = String(process.env.JWT_SECRET)
const app = express();
app.use(express.json())

app.use(cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));



app.post("/signup",async(req:Request,res:Response)=>{
  const parsedData= signupSchema.safeParse(req.body)
  if(!parsedData.success){
    return res.status(400).json({
        message:"Signup input validation failed"
    })
  }

  const {username,email,password} = parsedData.data
  const hashedPassword = await bcrypt.hash(password,10)

  const data =  await prisma.user.create({
    data:{
        username : username,
        email : email ,
        password : hashedPassword
    }
   })

   return res.status(200).json({
        message:"User created successfully",
        Id: data.username
    })

})
app.post("/signin",async(req:Request,res:Response)=>{
      const parsedData= signinSchema.safeParse(req.body)
  if(!parsedData.success){
    return res.status(400).json({
        message:"Signin input validation failed"
    })
  }
    const {username , password} = parsedData.data

    const User = await prisma.user.findUnique({
        where:{
            username : username
        }
    })
    if(!User){
           return res.status(400).json({
        message:"User not registered.Please signup first",
        
    })
    }
    const comparePassword = bcrypt.compare(password,User.password)
        if(!comparePassword){
           return res.status(400).json({
        message:"password Incorrect",
        
    })
    }
     const Token = jwt.sign({
        userId : User.id
     },Secret,
    {
        expiresIn:4*60*1000
    })

    res.status(200).json({
        message:"User logged in successfully",
         token : Token
})
})


app.post("/create",Middleware,async(req:Request,res:Response)=>{
  const parsedData= createStorySchema.safeParse(req.body)
  if(!parsedData.success){
    return res.status(400).json({
        message:"Story Schema  input validation failed"
    })
  }
    const {title , description , content} = parsedData.data
    
    const userId = (req.userId)
    if(!userId){
        return null;
    }


    const storyData = await prisma.story.create({
        data : {
            Title: title,
            Description : description,
            Content : content,
            authorId :userId
        }
    })

    return res.status(201).json({
        message:"Your storybook is created successfully",
        StoryBookId:storyData.id
        
    })
})
app.put("/edit/:id",Middleware,async(req:Request,res:Response)=>{
    const storyId = String(req.params);
    const {title , description , content} = req.body;
    const userId = req.userId

    if(!storyId){
        return res.status(400).json({
            message:"StoryId not provided"
        })
    }
   try {
        const storyData = await prisma.story.findUnique({
        where : {
            id : storyId
        }})
        if(!storyData){ 
            return res.status(400).json({
            message:"Storybook not found"
        })}
        if(storyData.id !== userId){
          return res.status(400).json({
            message:"You are not authorized to edit this Story book"
        })
        }

        const updatedData = prisma.story.update({
            where : {id:storyData.id},
            data : {
                Title: title,
                Description : description,
                Content : content
            }
        })
        return res.json({
            message: "StoryBook updated successfully",
            story: updatedData
        });

   } catch (error) {
    console.log(error);
   }

})
app.delete("/delete/:id",Middleware,async(req:Request,res:Response)=>{
    const storyId = String(req.params);
    const userId = req.userId

    if(!storyId){
        return res.status(400).json({
            message:"StoryId not provided"
        })
    }
   try {
        const storyData = await prisma.story.findUnique({
        where : {
            id : storyId
        }})
        if(!storyData){ 
            return res.status(400).json({
            message:"Storybook not found"
        })}
        if(storyData.id !== userId){
          return res.status(400).json({
            message:"You are not authorized to delete this Story book"
        })
        }

        const deletedData = prisma.story.delete({
            where : {id:storyData.id}
        })
        return res.json({
            message: "StoryBook deleted successfully",
        });

   } catch (error) {
    console.log(error);
   }

})



app.listen(Port,()=>{
console.log(`server listening at ${Port}`)
})
