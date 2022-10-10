const express = require('express')
const router = express.Router()
const {
     getAllBlogs
} = require("../controller/blogController")

router.route('/').get(getAllBlogs)



module.exports = router