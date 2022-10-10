const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const verifyJwt = async (req, res, next) => {

  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader?.startsWith('Bearer')) return res.sendStatus(StatusCodes.UNAUTHORIZED)

  const token = authHeader.split(' ')[1]




  jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE, (err, decoded) => {
    if (err) {
      return res.sendStatus(403)
    }
    req.user = decoded.user

    next()
  })


}


module.exports = verifyJwt