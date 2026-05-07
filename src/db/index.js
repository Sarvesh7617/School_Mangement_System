import mysql from "mysql2/promise";
import {DB_NAME} from "../constant.js";


export const pool = mysql.createPool(process.env.DATABASE_URL);





export const DBconnect=async()=>{

  try {
    const connection=await pool.getConnection()
    console.log("MySQL connected successfully");
    connection.release();
  } 
  catch(error) {
    console.log("MySQL Connection Failed:", error.message);
  }
}