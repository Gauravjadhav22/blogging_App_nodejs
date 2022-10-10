const { StatusCodes } = require('http-status-codes')
const Blog = require('../models/blog')
const Comment = require('../models/comment')


const createBlog = async (req, res) => {

    const { content, } = req.body
    req.body.user = req.user.userId;
    req.body.username = req.user.username;
    if (!content) {
        return res.status(StatusCodes.BAD_REQUEST).json({ "msg": "please enter content .." })

    }

    try {

        const blog = await Blog.create({ ...req.body })

        res.status(StatusCodes.CREATED).json({ blog })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }




}



const updateABlog = async (req, res) => {

    const { id } = req.params



    try {
        const blog = await Blog.findById({ _id: id })

        if (!blog) {

            res.status(StatusCodes.NOT_FOUND).json({ "msg": "no blog found" })
        }
        const updatedBlog = await Blog.findByIdAndUpdate({ _id: id }, { content: req.body.newContent })
        res.status(StatusCodes.OK).json({ updatedBlog })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }





}

const getABlog = async (req, res) => {

    const { id } = req.params



    try {
        const blog = await Blog.findOne({ _id: id })

        if (!blog) {
            res.status(StatusCodes.NOT_FOUND).json({ "msg": "no blog found" })
        }

        res.status(StatusCodes.OK).json({ blog })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }





}


const deleteBlog = async (req, res) => {


    const { id } = req.params



    try {
        const blog = await Blog.findOne({ _id: id })

        if (!blog) {
            return res.status(StatusCodes.NOT_FOUND).json({ "msg": "no blog found" })
        }
        await Blog.findOneAndDelete({ _id: id })

        res.status(StatusCodes.OK).json({ "msg": `${blog.title} is deleted` })

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }


}


const getUserBlogs = async (req, res) => {

    const userId = req.user.userId
    try {
        const blogs = await Blog.find({ user: userId }).sort({ createdAt: -1 })
        res.status(StatusCodes.OK).json(blogs)

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }





}
const getAllBlogs = async (req, res) => {



    try {
        const blogs = await Blog.find({ draft: false }).sort({ createdAt: -1 })

      
        





        res.status(StatusCodes.OK).json(blogs)

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 'message': error.message });
    }





}


module.exports = {
    createBlog, getAllBlogs, deleteBlog, updateABlog, getABlog, getUserBlogs
}