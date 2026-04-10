import express from "express"
import usersController from "../controllers/users.js"
import {isAuth} from "../middleware/authMiddleware.js"

const router = express.Router()


router.route("/signup")
    .post(usersController.createUser)

router.route("/login")
    .post(usersController.loginUser)
router.route("/logout")
    .post(isAuth, usersController.logoutUser)
router.route("/reset-password")
    .post(isAuth, usersController.resetPassword)

export default router