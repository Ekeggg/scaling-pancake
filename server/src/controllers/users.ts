import bcrypt from "bcrypt"
import {db} from "../db/index.js"
import { users } from "../db/schema/index.js"
import { eq } from "drizzle-orm"
import { Request, Response, NextFunction } from "express"

declare module "express-session" {
    interface SessionData {
        userId: number;
        userName: string;
        isLoggedIn: boolean;
    }
}

const createUser = async (req: Request, res: Response) => {
    const {name, type, password} = req.body
    if(!name ||!type||!password){
        res.status(400).send("Please fill in required fields")
    }
    const [userExisting] = await db.select().from(users).where(eq(users.name,name))
    if(userExisting){
        res.status(400).send("User already exists")
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    try {
        db.insert(users).values({
            name: name,
            type: type,
            password_hash: hashedPassword,
        })
        
    } catch (error) {
        res.status(400).send("Invalid data")
    }
}

const loginUser = async (req: Request, res: Response) => {
    const {name, password} = req.body
    const [userExisting] = await db.select().from(users).where(eq(users.name,name))
    if(userExisting){
        const passwordMatching = await bcrypt.compare(password,userExisting.password_hash)
        if(passwordMatching){
            req.session.userId = userExisting.id
            req.session.userName = userExisting.name
            req.session.isLoggedIn = true
            res.send()
        }
        else{
            res.status(400).send("Invalid credentials")
        }
    }
    else{
        res.status(400).send("User not found")
    }
}

const logoutUser = (req: Request, res: Response) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            res.status(500).send("Error logging out");
        } else {
            res.clearCookie("connect.sid"); // Clear the session cookie
            res.send();
        }
    });
}

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.isLoggedIn) {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
};

const resetPassword = async (req: Request, res: Response) => {
    const {userId, password, newPassword} = req.body
    const [userExisting] = await db.select().from(users).where(eq(users.id,userId))
    if(userExisting){
        const passwordMatching = await bcrypt.compare(password,userExisting.password_hash)
        if(passwordMatching){
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newPassword,salt)
            try {
                db.update(users).set({password_hash: hashedPassword}).where(eq(users.id,userId))
                res.send()
            } catch (error) {
                res.status(400).send("Invalid data")
            }
        }
        else{
            res.status(400).send("Invalid credentials")
        }
    }
    else{
        res.status(400).send("User not found")
    }
}
export default {createUser, loginUser, logoutUser, isAuthenticated, resetPassword}