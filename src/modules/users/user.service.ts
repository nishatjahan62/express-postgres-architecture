import { pool } from "../../db";
import bcrypt from "bcrypt"
import type { IUser } from "./user.interface";

const createUserIntoDb =async(payload:IUser)=>{

  
    const {name, email, course, password, age}=payload

    const hashPass = await bcrypt.hash(password,10)
     const result = await pool.query(
      `
        INSERT INTO users (name,email,course,password,age) 
        VALUES ($1,$2,$3,$4,$5)  
        RETURNING *
        `,
      [name, email, course, hashPass, age],
      
     
    );
     delete result.rows[0].password
    return result
    
}

const getAllUsersFromDb =async()=>{
        const result = await pool.query(`
        SELECT * FROM users`);
         delete result.rows[0].password
        return result
}

const getSingleUserFromDb =async(id:string)=>{
    
       const result = await pool.query(
      `
        SELECT * FROM users WHERE id=$1`,
      [id],
    );
     delete result.rows[0].password
    return result
}
const updateUserFromDb = async(payload:IUser , id:string)=>{
const {name, age, is_active}=payload

    const result = await pool.query(
      `
          UPDATE users SET name=$1 ,   age=$2 , is_active=$3 WHERE id=$4 RETURNING *
            `,
      [name, age, is_active, id],
    );
 delete result.rows[0].password
    return result
}

const deleteUserFromDb = async(id:string)=>{
    const result = await pool.query(
      `
    DELETE FROM users WHERE id=$1  
      `,
      [id],
    );
     delete result.rows[0].password
    return result
}

export const userServices = {
    createUserIntoDb,
    getAllUsersFromDb,
    getSingleUserFromDb,
    updateUserFromDb,
    deleteUserFromDb
} 