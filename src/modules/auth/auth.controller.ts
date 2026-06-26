import type { Request, Response } from "express";
import { authServices } from "./auth.service";


const signIn =async(req:Request,res:Response)=>{
    try {

const result =await authServices.signInUserFromDb(req.body)

 res.status(201).json({
        success:true,
        message: "User Sing In successfully",
        data: result
    })
} catch (error:any) {
  res.status(500).json({
       success:false,
      message: error.message,
      error: error,
    });  
 }
}


export const authController ={
    signIn
}