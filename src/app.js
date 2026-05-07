import express from "express";
import cors from "cors";


const app=express();



app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))



app.use(express.json());



import schoolRouter from "./routes/school.route.js";


app.use("/api/v1/school",schoolRouter);

export {app};