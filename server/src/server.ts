import express from "express";
import cors from "cors";
import "dotenv/config";
import session from "express-session"
import { pool } from "./db/index.js"
import pgsession from "connect-pg-simple"


const app = express();
const PostgresStore = pgsession(session)

app.use(session({
    store: new PostgresStore({
        pool: pool,
        tableName: 'session',
        createTableIfMissing: true,
    }),
    secret: String(process.env.SESSION_SECRET),
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day 
      httpOnly: true,              
      secure: false,               
      sameSite: 'lax',
    },
  }) as any)
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json())


app.listen(process.env.PORT, ()=>{
    console.log("Server is running on port ",process.env.PORT);
})