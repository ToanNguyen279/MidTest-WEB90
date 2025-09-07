import express from "express"
import { createPost, editPost } from "../controller/post.controller.js"
import UsersModel from "../model/model.user.js"

const postRouter = express.Router()

const checkApiKey = async (req, res, next) => {
    const { apiKey } = req.query

    if (!apiKey) {
        return res.status(400).send({
            status: 400,
            message: "ApiKey is missing"
        })
    }

    const user = await UsersModel.findOne({ apiKey: apiKey })
    console.log(user)
    if (!user) {
        return res.status(404).send({
            status: 404,
            data: {},
            message: "User not found"
        })
    }
    req.user = user
    next()
}

// ý 3

postRouter.post("/", checkApiKey, createPost)

// ý 4

postRouter.post("/:id", checkApiKey, editPost)

export default postRouter