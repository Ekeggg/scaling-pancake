import { Request, Response } from "express"
import { db } from "../db/index.js"
import { tasks } from "../db/schema/index.js"
import { eq } from "drizzle-orm"

const createTask = async (req: Request, res: Response) => {
    const {title, description} = req.body
    if(!req.session.isLoggedIn){
        res.status(401).send("Unauthorized")
    }
    if(!title || !description){
        res.status(400).send("Please fill in required fields")
    }
    try {
        await db.insert(tasks).values({
            title: title,
            description: description,
            user: req.session.userId,
        })
        res.send()
    } catch (error) {
        res.status(400).send("Invalid data")
    }
} 

const getTasks = async (req: Request, res: Response) => {
    if(!req.session.isLoggedIn){
        res.status(401).send("Unauthorized")
    }
    try {
        const userTasks = await db.select().from(tasks).where(eq(tasks.user, req.session.userId as number))
        res.send(userTasks)
    } catch (error) {
        res.status(400).send("Invalid data")
    }
}

// Only for testing purposes, in production we would want to implement a soft delete instead of hard delete
const deleteTask = async (req: Request, res: Response) => {
    const {id} = req.params
    if(!req.session.isLoggedIn || !id){
        res.status(401).send("Unauthorized")
    }
    try {
        const task = await db.select().from(tasks).where(eq(tasks.id, Number(id)))
        if(!task || task[0]?.user !== req.session.userId){
            res.status(404).send("Unauthorized")
            return
        }
        await db.delete(tasks).where(eq(tasks.id, Number(id)))
        res.send()
    } catch (error) {
        res.status(400).send("Invalid data")
    }
}
export {createTask, getTasks, deleteTask}
