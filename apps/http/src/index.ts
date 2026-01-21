const express = require("express")
import { Request , Response } from "express";
import {signupSchema,signinSchema, createStorySchema} from "@repo/zod/zod"
import {prisma} from "@repo/db/client"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cors from "cors"
import Middleware from "./middleware";
import { uploadImage } from "./middleware";



dotenv.config()
const Port = process.env.Port || 5000;

const Secret = String(process.env.JWT_SECRET)
const app = express();
app.use(express.json())

app.use(cors({
    origin: ["http://localhost:3000",
      "https://story-book-web-eight.vercel.app",
      "https://story-book-backendd.onrender.com"], 

    methods: ["GET", "POST", "PUT", "DELETE","PATCH"],
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
         token : Token,
         userName:User.username,
         email:User.email
})
})


app.get("/Story-Book",async(req:Request,res:Response)=>{

  const Story = await prisma.story.findMany({
    where : {isPublic : true},
    orderBy : {createdAt:"desc"}
  })

  return res.status(200).json({
    message:"fetched data successfully ",
    story : Story

  })
})


app.get("/Story-Book/:id",async(req:Request,res:Response)=>{

  const StoryId= req.params.id

  const Story = await prisma.story.findMany({
    where : {id: StoryId},
    orderBy : {createdAt:"desc"}
  })

  return res.status(200).json({
    message:"fetched data successfully ",
    story : Story

  })
})


// route for gettting list of data 
app.get("/my-story-book",Middleware,async(req:Request, res: Response)=>{
const UserId = req.userId;
if(!UserId){
    return res.status(400).json({
        message:"Token not found"
    })
}

const storyData = await prisma.story.findMany({

    where:{
        authorId:UserId
    },
    
    orderBy: {
      createdAt: "desc",
    },
})
return res.status(200).json({
    message:"Here all your StoryBooks",
    story:storyData
})
})


// route for getting single data 
app.get("/story/:id", Middleware, async (req: Request, res: Response) => {
  const UserId = req.userId; // Middleware se user id
  const storyId = req.params.id; // URL parameter se story id

  if (!UserId) {
    return res.status(403).json({
      message: "Unauthorized",
    });
  }

  try {
    const story = await prisma.story.findFirst({
      where: {
        id: storyId,
        authorId: UserId, // Taaki koi dusra user aapki private story na dekh sake
      },
    });

    if (!story) {
      return res.status(404).json({
        message: "Story not found",
      });
    }

    return res.status(200).json({
      message: "Story fetched successfully",
      story: story,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});


// route for sharing via Converting IsPublic : false to true
app.put("/feature/:id",Middleware,async(req:Request , res:Response)=>{
    const { id } = req.params;
  const authorId = req.userId;

  const story = await prisma.story.updateMany({
    where: {
      id,
      authorId, 
    },
    data: {
      isPublic: true,
    },
  });

  res.json({ message: "Story featured successfully" });
})


//create route with cloundinary Image Middleware
app.post(
  "/create",
  Middleware,
  uploadImage.single("image"),
  async (req: Request, res: Response) => {

    
    const parsedData = createStorySchema.safeParse({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
    });

    if (!parsedData.success) {
      return res.status(400).json({
        message: "Story Schema input validation failed",
        errors: parsedData.error
      });
    }

    const { title, description, content } = parsedData.data;

    const imageUrl = req.file ? req.file.path : null;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const storyData = await prisma.story.create({
      data: {
        Title: title,
        Description: description || null,
        Content: content,
        imageUrl,
        isPublic: false,
        authorId: userId,
      },
    });

    return res.status(201).json({
      message: "Your storybook is created successfully",
      StoryBookId: storyData.id,
      isPublic: storyData.isPublic,
      imageUrl: storyData.imageUrl,
    });
  }
);


//edit route 
app.put("/edit/:id",Middleware,async(req:Request,res:Response)=>{
    const {id} = req.params
    const {title , description , content} = req.body;
    const userId = req.userId


    if(!id){
        return res.status(400).json({
            message:"StoryId not provided"
        })
    }
   try {

        const storyData = await prisma.story.findUnique({
        where : {
            id : id
        }})
        if(!storyData){ 
            return res.status(400).json({
            message:"Storybook not found"
        })}
        if(storyData.authorId !== userId){
          return res.status(400).json({
            message:"You are not authorized to edit this Story book"
        })
        }

        const updatedData = await prisma.story.update({
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



// delete route
app.delete("/delete/:id",Middleware,async(req:Request,res:Response)=>{
    const storyId =req.params.id;
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
        if(storyData.authorId !== userId){
          return res.status(400).json({
            message:"You are not authorized to delete this Story book"
        })
        }

        const deletedData = await prisma.story.delete({
            where : {id:storyData.id}
        })
        return res.json({
            message: "StoryBook deleted successfully",
            StoryBooks:deletedData.Title
        });

   } catch (error) {
    console.log(error);
   }

})


app.listen(Port,()=>{
console.log(`server listening at ${Port}`)
})
