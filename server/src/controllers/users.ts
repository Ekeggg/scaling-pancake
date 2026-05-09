import bcrypt from "bcrypt"
import {db} from "../db/index.js"
import { users } from "../db/schema/index.js"
import { eq } from "drizzle-orm"
import { Request, Response } from "express"
import jwt from "jsonwebtoken"

const createUser = async (req: Request, res: Response) => {
    const {name, type, password} = req.body
    if(!name ||!type||!password){
        res.status(400).send("Please fill in required fields")
        return
    }
    const [userExisting] = await db.select().from(users).where(eq(users.name,name))
    if(userExisting){
        res.status(400).send("User already exists")
        return
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    try {
        const [newUser] = await db.insert(users).values({
            name: name,
            type: type,
            password_hash: hashedPassword,
        }).returning()

        const token = jwt.sign(
            { userId: newUser.id, userName: newUser.name },
            process.env.JWT_SECRET || 'secret',
            { expiresIn: '24h' }
        )
        res.status(201).json({ token })
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
            const token = jwt.sign(
                { userId: userExisting.id, userName: userExisting.name },
                process.env.JWT_SECRET || 'secret',
                { expiresIn: '24h' }
            )
            res.json({ token })
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
    res.send() // Frontend will handle by clearing localStorage
}

const resetPassword = async (req: Request, res: Response) => {
    const userId = Number(req.userId)
    const {password, newPassword} = req.body
    const [userExisting] = await db.select().from(users).where(eq(users.id,userId))
    if(!userExisting){
        res.status(400).send("User not found")
        return
    }
    const passwordMatching = await bcrypt.compare(password,userExisting.password_hash)
    if(!passwordMatching){
        res.status(400).send("Invalid credentials")
        return
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword,salt)
    try {
            db.update(users).set({password_hash: hashedPassword}).where(eq(users.id,userId))
            res.send()
    } catch (error) {
        res.status(400).send("Invalid data")
    }
}   

export default {createUser, loginUser, logoutUser, resetPassword}