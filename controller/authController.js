const User = require('../models/user')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { StatusCodes } = require('http-status-codes')

const authController = async (req, res) => {

    const { username, passwd } = req.body

    if (!username || !passwd) {
        return res.status(StatusCodes.BAD_REQUEST).json({ "msg": "username  and password are required" })
    }

    //finding user in db
    const foundUser = await User.findOne({ username: username })
    if (!foundUser) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ "msg": "user does not exists" })
    }



    const match = await bcrypt.compare(passwd, foundUser.passwd);

    if (match) {

        const refreshToken = jwt.sign(
            {
                user: {
                    username: foundUser.username,
                }

            }, process.env.REFRESH_TOKEN_SECRETE, {
            expiresIn: '2h'

        }
        )


        const accessToken = jwt.sign({
            user: {
                username: foundUser.username,
                gmail: foundUser.gmail,
                fullname: foundUser.fullname,
                userId: foundUser._id
            }
        }, process.env.ACCESS_TOKEN_SECRETE, { expiresIn: '15m' })

        foundUser.refreshToken = refreshToken;

        const result = await foundUser.save()
        // Creates Secure Cookie with refresh token
        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        });

        // Send authorization access token to user

        res.status(StatusCodes.OK).json({ "username": foundUser.username, "fullname": foundUser.fullname, "gmail": foundUser.gmail, accessToken })

    }
    else {
        return res.status(StatusCodes.UNAUTHORIZED)
    }




}


module.exports = authController
