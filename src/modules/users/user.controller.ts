import type { Request, Response } from "express";
import { pool } from "../../db";
import { userServices } from "./user.service";

 const createUser = async (req: Request, res: Response)=>{

  try {
   const result =await userServices.createUserIntoDb(req.body)
   
    res.status(200).json({
      message: "User Created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
}

// Get all users
const getAllUsers= async (req: Request, res: Response) => {
  try {
const result = await userServices.getAllUsersFromDb()
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    res.status(200).json({
      message: "Users retrieve successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
}
// Get single user
const getSingleUser= async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
 const result = await userServices.getSingleUserFromDb(id as string)

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    // console.log(getSingleUser)
    res.status(200).json({
      message: `user ${id} is retrieve successfully`,
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
}
// update whole user with put
const updateUser=async (req: Request, res: Response) => {
  const id = req.params.id;
//   const { name, age, is_active } = req.body;

  try {
    const result = await userServices.updateUserFromDb(req.body , id as string)

    res.status(200).json({
      message: "Users retrieve successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message,
      error: error,
    });
  }
};

//delete user
 const deleteUser= async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
 const result = await userServices.deleteUserFromDb(id as string)
    // console.log(deleteUser);
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};


export const userController ={
    createUser ,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}