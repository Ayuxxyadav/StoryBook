import { Request ,Response , NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"



interface Mytoken extends JwtPayload {
 userId : string
}


export  default function Middleware(req:Request,res:Response,next:NextFunction){
    const token = req.headers.authorization || ""
    if(!token){
        return res.status(200).json({
            message:"Token not found",
        })
    }
    const secret = String(process.env.JWT_SECRET)

    const decodedToken =  jwt.verify(token,secret) as JwtPayload

    if(!decodedToken){
            return res.status(200).json({
            message:"Token not matched",
        })
    }

    req.userId = decodedToken.userId

    next();
}