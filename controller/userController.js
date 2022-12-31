const User = require('../models/user')
const Blog = require('../models/blog')
const { StatusCodes } = require('http-status-codes')

const getUser = async (req, res) => {

    const { id } = req.params
    try {
        const user = await User.findOne({ _id: id })

        const blogs = await Blog.find({ user: id })
        res.status(StatusCodes.OK).json({ "fullname": user.fullname, "username": user.username, "gmail": user.gmail, "picture": user.picture, blogs })

    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "msg": error.message })
    }
}
const findUser = async (req, res) => {

    const { id } = req.params
    try {
        const user = await User.findOne({ username: id })

        const blogs = await Blog.find({ user: user._id }).populate('user').sort({ createdAt: -1 })
        res.status(StatusCodes.OK).json({ "fullname": user.fullname, "username": user.username, "gmail": user.gmail, "picture": user.picture, blogs })

    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "msg": error.message })
    }
}
const updateUser = async (req, res) => {

    const { id } = req.params

    try {
        const foundUser = await User.findById({ _id: id })
        if (!foundUser) {
            return res.sendstatus(StatusCodes.NOT_FOUND)
        }
        const user = await User.findOneAndUpdate({ _id: id }, { ...req.body })

        // foundUser.picture=req.body.pi

        res.status(StatusCodes.OK).json({ user })

    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ "msg": error.message })
    }
}



module.exports = { getUser, updateUser, findUser }