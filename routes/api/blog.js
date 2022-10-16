const express = require('express')
const router = express.Router()
const {
    createBlog, getUserBlogs, deleteBlog, updateABlog, getABlog, likeAndDislike
} = require("../../controller/blogController")

router.route('/').get(getUserBlogs).post(createBlog)
router.route('/like-dislike/:id').post(likeAndDislike)

router.route('/:id').get(getABlog).patch(updateABlog).delete(deleteBlog)


module.exports = router