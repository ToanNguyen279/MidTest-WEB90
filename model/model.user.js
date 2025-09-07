import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    apiKey: { type: String, default: null }
})

const UsersModel = mongoose.model("Users", userSchema, "Users")

export default UsersModel