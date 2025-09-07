import PostsModel from "../model/model.post.js"

const createPost = async (req, res) => {
    try {
        const { content } = req.body
        const { user } = req

        console.log(user)

        if (!content) {
            return res.status(400).send({
                status: 400,
                data: {},
                message: "Content is missing"
            })
        }

        const newPost = await PostsModel.insertOne({ userId: user._id, content: content })

        res.send({
            status: 200,
            data: newPost,
            message: "Success"
        })

    } catch (error) {
        res.send({
            status: 500,
            message: error.message
        })
    }
}

const editPost = async (req, res) => {
    try {
        const { id } = req.params
        const { user } = req
        const { content } = req.body

        const findPost = await PostsModel.findOne({ _id: id })

        if (!findPost) {
            return res.status(404).send({
                status: 404,
                message: "Post not found"
            })
        }

        console.log(findPost.userId)
        console.log(user._id.toString())

        if (findPost.userId !== user._id.toString()) {
            return res.status(400).send({
                status: 400,
                message: "You are not allowed to edit this post"
            })
        }

        findPost.content = content

        findPost.updateAt = Date.now()

        await findPost.save()

        res.send({
            status: 200,
            data: findPost,
            message: "Success"
        })

    } catch (error) {
        res.send({
            status: 500,
            message: error.message
        })
    }
}

export { createPost, editPost }