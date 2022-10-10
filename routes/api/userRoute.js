const express = require('express')
const router = express.Router()
const {
    getUser, updateUser, findUser
} = require("../../controller/userController")

router.get('/:id', getUser)
router.get('/username/:id', findUser)
router.patch('/:id', updateUser)



module.exports = router