import mysql from "mysql2/promise";
import {DB_NAME} from "../constant.js";


export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: DB_NAME,
});





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