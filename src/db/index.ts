import { Pool } from "pg";
import config from "../config";

// neonDB connection
export const pool = new Pool({
  connectionString:config.connection_string
});

export const initDB = async () => {
  try {
    await pool.query(`
             CREATE TABLE IF NOT EXISTS users(
             id SERIAL PRIMARY KEY ,
             name VARCHAR(20),
             email VARCHAR(20) UNIQUE NOT NULL   ,
             course VARCHAR(20),
             password VARCHAR(20) UNIQUE NOT NULL,
             is_active BOOLEAN DEFAULT TRUE,
             age INT ,

             created_at TIMESTAMP DEFAULT NOW(),
             updated_at TIMESTAMP DEFAULT NOW()
             ) 
             
        `);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};