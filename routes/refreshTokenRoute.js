const refreshTokenController = require("../controller/refreshTokenController")

const router = require("express").Router()

router.get('/',refreshTokenController)


module.exports=router