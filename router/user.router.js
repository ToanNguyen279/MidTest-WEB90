import express from "express"
import { getAllUser, loginUser, registerUser } from "../controller/user.controller.js";

const userRouter = express.Router()

userRouter.get("/", getAllUser);

// ý 1 
// body
// {
//   "userName": "Nguyen Van F",
//   "email": "nguyenvanf@example.com",
//   "password": "12345"
// }
userRouter.post("/register", registerUser)

// ý 2

userRouter.post("/login", loginUser)

export default userRouter