import express from "express"
import taskController from "../controllers/tasks.js"

const router = express.Router()

router.route("/")
    .get(taskController.getTasks)
router.route("/create")
    .post(taskController.createTask)
router.route("/delete/:id")
    .post(taskController.deleteTask)
router.route("/update/:id")
    .put(taskController.updateTask)

export default router