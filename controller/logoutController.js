const { StatusCodes } = require("http-status-codes")
const User = require("../models/user")

const logoutController = async (req, res) => {

    //on client delete accessToken 
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(StatusCodes.NO_CONTENT)

    const refreshToken = cookies.jwt

    //looking for is the refreshToken in db
    const foundUser = await User.findOne({refreshToken}).exec()

    if (!foundUser) {

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.status(StatusCodes.NO_CONTENT);



    }
    //Delete refreshToken in db
    foundUser.refreshToken = ''
    await foundUser.save();


    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.status(204);














}


module.exports = logoutController

