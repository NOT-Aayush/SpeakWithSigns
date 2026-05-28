import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from "./config/db.js";
import errorHandling from "./middleware/errorHandler.js";
import uRouter from "./routes/userRoutes.js";
import createUserTable from "./data/createTables.js";
dotenv.config();

const app =express();
const port = process.env.PORT || 8002;

//importing middlewares
app.use(express.json());
app.use(cors());

//routing
app.use("/user",uRouter);

//error handling
app.use(errorHandling);

//testing postgress
app.get("/",async(req,res)=>{
    const result = await pool.query("Select current_database()");
    res.send(`You asked for: ${result.rows[0].current_database}`)
})

//creating tables
await createUserTable();

//running server
app.listen(port,()=>{
    console.log(`Created the backend on port: ${port}`)
})
process.on("SIGINT", async () => {
    console.log("Closing server...");
    await pool.end();
    process.exit(0);
});