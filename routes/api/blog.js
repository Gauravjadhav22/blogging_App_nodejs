const express = require('express')
const router = express.Router()
const {
    createBlog, getUserBlogs, deleteBlog, updateABlog, getABlog
} = require("../../controller/blogController")

router.route('/').get(getUserBlogs).post(createBlog)

router.route('/:id').get(getABlog).patch(updateABlog).delete(deleteBlog)


module.exports = router