
import express from "express"
import axios from "./service/api.js"
import mongoose from "mongoose"
import userRouter from "./router/user.router.js"
import postRouter from "./router/post.router.js"


const port = 8080

const hostname = "localhost"

const app = express()

app.use(express.json());

app.use("/users", userRouter)

app.use("/posts", postRouter)

const uri =
    "mongodb+srv://toannguyen270999_db_user:Toannguyen123456XXX@midtestw90.wivdtc9.mongodb.net/MidTest";

mongoose
    .connect(uri)
    .then((res) => {
        console.log("connected to database");
        app.listen(port, hostname, () => {
            console.log(`Server running at http://${hostname}:${port}/`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
