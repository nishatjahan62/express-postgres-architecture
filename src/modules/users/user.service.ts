import { pool } from "../../db";
import type { IUser } from "./user.interface";

const createUserIntoDb =async(payload:IUser)=>{

    const {name, email, course, password, age}=payload
     const createUser = await pool.query(
      `
        INSERT INTO users (name,email,course,password,age) 
        VALUES ($1,$2,$3,$4,$5)  
        RETURNING *
        `,
      [name, email, course, password, age],
      
    );
    return createUser

}

const getAllUsersFromDb =async()=>{
        const getAllUsers = await pool.query(`
        SELECT * FROM users`);
        return getAllUsers
}

const getSingleUserFromDb =async(id:string)=>{
    
       const getSingleUser = await pool.query(
      `
        SELECT * FROM users WHERE id=$1`,
      [id],
    );
    return getSingleUser
}
const updateUserFromDb = async(payload:IUser , id:string)=>{
const {name, age, is_active}=payload

    const updateUser = await pool.query(
      `
          UPDATE users SET name=$1 ,   age=$2 , is_active=$3 WHERE id=$4 RETURNING *
            `,
      [name, age, is_active, id],
    );
    return updateUser
}

const deleteUserFromDb = async(id:string)=>{
    const deleteUser = await pool.query(
      `
    DELETE FROM users WHERE id=$1  
      `,
      [id],
    );
    return deleteUser
}

export const userServices = {
    createUserIntoDb,
    getAllUsersFromDb,
    getSingleUserFromDb,
    updateUserFromDb,
    deleteUserFromDb
} 