import express from "express"
import taskController from "../controllers/tasks.js"
import {isAuth} from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/")
    .get(isAuth, taskController.getTasks)
router.route("/create")
    .post(isAuth, taskController.createTask)
router.route("/delete/:id")
    .post(isAuth, taskController.deleteTask)
router.route("/update/:id")
    .put(isAuth, taskController.updateTask)

export default router