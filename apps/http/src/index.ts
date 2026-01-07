const express = require("express")
import { Request , Response } from "express";
import {signupSchema,signinSchema} from "@repo/zod/zod"
import {prisma} from "@repo/db/client"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cors from "cors"



dotenv.config()


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

const Port = process.env.Port
app.listen(Port,()=>{
console.log(`server listening at ${Port}`)
})
