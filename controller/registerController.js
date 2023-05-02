const User = require("../models/user")
const bcrypt = require("bcrypt")
const { StatusCodes } = require('http-status-codes')

const registerController = async (req, res) => {


    const { fullname, username, gmail, passwd } = req.body

    if (!username || !passwd) {
        return res.status(StatusCodes.BAD_REQUEST).json({ "msg": "fullname username and password are required" })
    }

    const duplicate = await User.findOne({ username }).exec()

    if (duplicate) {
        return res.status(StatusCodes.CONFLICT).json({ "msg": "user already exists try another username" })

    }

    try {
        const hashedPasswd = (await bcrypt.hash(passwd, 10)).toString()
        const result = await User.create({
            fullname: fullname,
            username: username,
            gmail: gmail ? gmail : '',
            passwd: hashedPasswd
        })
        res.status(StatusCodes.CREATED).json({ 'success': `New user ${username} created!` });
        // json({username:result.username,gmail:result.gmail},"successfully registered")
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR)
    }




}

module.exports = registerController