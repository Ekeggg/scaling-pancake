import express from "express"
import usersController from "../controllers/users.js"

const router = express.Router()


router.route("/signup")
    .post(usersController.createUser)

router.route("/login")
    .post(usersController.loginUser)
router.route("/logout")
    .post(usersController.logoutUser)
router.route("/reset-password")
    .post(usersController.resetPassword)

export default router