const logoutController = require("../controller/logoutController")

const router = require("express").Router()

router.get('/',logoutController)


module.exports=router