import { Router, type Request, type Response } from "express";
import { pool } from "../../db";
import { userController } from "./user.controller";

export const router = Router()

router.post("/",userController.createUser )
router.post("/",userController.getAllUsers )
router.post("/",userController.getSingleUser )
router.post("/",userController.updateUser )

router.post("/",userController.deleteUser )


export const userRoutes =router