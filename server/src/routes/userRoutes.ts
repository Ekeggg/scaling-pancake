import express from "express"
import usersController from "../controllers/users"

const router = express.Router()

router.route("/signup")
    .post(usersController.createUser)

router.route("/auth")
    .post(usersController.loginUser)
router.route("/logout")
    .post(usersController.logoutUser)

export default router