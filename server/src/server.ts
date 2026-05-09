import express from "express";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./routes/userRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL,
}))
app.use(express.json())

app.use("/api/users", userRoutes)
app.use("/api/tasks", taskRoutes)

app.listen(process.env.PORT, ()=>{
    console.log("Server is running on port ",process.env.PORT);
})