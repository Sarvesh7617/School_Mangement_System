import { app } from "./app.js";
import { DBconnect } from "./db/index.js";






DBconnect()
    .then(()=>{
        app.listen(process.env.PORT || 5000,()=>{
            console.log(`Server is running smooth on port ${process.env.PORT || 3000}`)
        })
    })

    .catch((error)=>{
        console.log("DB connection failed", error);
    })