import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    userId: { type: String, required: true },
    content: { type: String, required: true },
    createAt: { type: Date, default: Date.now, required: true },
    updateAt: { type: Date, default: Date.now, required: true }
})

const PostsModel = mongoose.model("Posts", postSchema, "Posts")

export default PostsModel