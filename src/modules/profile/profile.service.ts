import { pool } from "../../db"
import type { IProfile } from "./profile.interface"

const InsertProfileIntoDb =async(payload:IProfile)=>{
const {user_id,bio,address,phone,gender}=payload

// check if user exits
const user = await pool.query(`
    SELECT * FROM users WHERE id=$1 
    ` , [user_id],)
    // console.log(user)
    if (user.rows.length===0){
        throw new Error("user not exits");
        
    }


    const result = await pool.query(
        `
       INSERT INTO profiles (user_id,bio,address,phone,gender) 
       VALUES ($1,$2,$3,$4,$5) RETURNING *
        ` ,[user_id,bio,address,phone,gender],
    )
    return result
}
export const profileService ={
    InsertProfileIntoDb
}