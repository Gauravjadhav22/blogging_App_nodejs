const User = require("../models/user")
const { StatusCodes } = require("http-status-codes")
const jwt = require('jsonwebtoken')

const refreshTokenController = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(StatusCodes.UNAUTHORIZED);
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) return res.sendStatus(StatusCodes.FORBIDDEN); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRETE,
        (err, decoded) => {
         
            if (err|| foundUser.username !== decoded.user.username) {
                return res.sendStatus(StatusCodes.FORBIDDEN)
            };
            const accessToken = jwt.sign(
                {
                    user: {
                        username: foundUser.username,
                        gmail: foundUser.gmail,
                        fullname: foundUser.fullname,
                        userId: foundUser._id
                    }
                },
                process.env.ACCESS_TOKEN_SECRETE,
                { expiresIn: '15m' }
            );
            res.status(StatusCodes.OK).json({ accessToken })
        }
    );
}


module.exports = refreshTokenController