import UsersModel from "../model/model.user.js"
import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcrypt"

const getAllUser = async (req, res) => {
    try {
        const data = await UsersModel.find({});

        res.send({
            status: 200,
            data: data,
            message: "Success",
        });
    } catch (error) {
        res.send({
            status: 500,
            message: error.message,
        });
    }
}

const registerUser = async (req, res) => {
    try {
        const { email, password, userName } = req.body

        const checkExist = await UsersModel.find({ email: email })

        if (checkExist.length !== 0) {
            return res.status(400).send({
                status: 400,
                data: {},
                message: "Email already exist"
            })
        }

        const hashPassword = bcrypt.hashSync(password, 10);

        const newUser = await UsersModel.insertOne({
            ...req.body,
            password: hashPassword
        })

        res.send({
            status: 200,
            data: newUser,
            message: "Success"
        })

    } catch (error) {
        res.send({
            status: 500,
            message: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).send({
                status: 400,
                message: "Email or password is invalid"
            })
        }

        const findUser = await UsersModel.findOne({ email: email })

        if (!findUser) {
            return res.status(404).send({
                status: 404,
                message: "Email not found"
            })
        }

        const comparePassword = bcrypt.compareSync(password, findUser.password)

        if (!comparePassword) {
            return res.status(400).send({
                status: 400,
                message: "Password is invalid"
            })
        }

        const apiKey = `mern-$${findUser._id}$-$${email}$-$${uuidv4()}$`

        findUser.apiKey = apiKey

        await findUser.save()

        res.send({
            status: 200,
            data: findUser,
            message: "Login success"
        })

    } catch (error) {
        res.send({
            status: 500,
            message: error.message
        })
    }
}

export { getAllUser, registerUser, loginUser }