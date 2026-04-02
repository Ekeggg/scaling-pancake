import express from "express";
import cors from "cors";
import "dotenv/config";
import session from "express-session"
import { pool } from "./db"
import pgsession from "connect-pg-simple"


const app = express();
const PostgresStore = connectPgSimple(session)

app.use(session({
    store: new PostgresStore({
        pool: pool,
        tableName: 'session',
        createTableIfMissing: true,
    }),
    secret: process.env.PROCESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
      httpOnly: true,              // Security: Prevents JS from accessing cookie
      secure: false,               // Set to true only if using HTTPS (production)
      sameSite: 'lax',
    },
  })
)



app.listen(process.env.PORT, ()=>{
    console.log("Server is running on port ",process.env.PORT);
})