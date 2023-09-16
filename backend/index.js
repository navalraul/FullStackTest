
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors"
import { Login, Register, getCurrentUser } from "./Controllers/UserControllers.js";
import { AddQuiz } from "./Controllers/QuizController.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.post("/register", Register)

app.post("/login", Login)

app.post("/add-quiz", AddQuiz)

app.post("/get-current-user", getCurrentUser)


mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to DB")
}).catch(()=> {
    console.log("Error in Mongodb", error)
})

app.listen(8000, ()=>{
    console.log("Server running on port 8000")
})