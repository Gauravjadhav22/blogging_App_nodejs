//packages
require('express-async-errors')
require("dotenv").config()
const express = require("express");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const cors = require('cors')
const cookieParser = require('cookie-parser');

//db
const connect = require("./db/connect");

//routes
const authRoute = require("./routes/authRoute")
const registerRoute = require("./routes/registerRoute")
const refreshTokenRoute = require("./routes/refreshTokenRoute")
const logoutRoute = require("./routes/logoutRoute")
const blogsRoute = require("./routes/blogs")
const apiblogRoute = require("./routes/api/blog")
const userRoute = require("./routes/api/userRoute")
const commentRoute = require("./routes/api/commentRoute")


//middlware
const notFound = require("./middleware/notFound.js");
const errorHandler = require("./middleware/error-handler")
const verifyJwt = require("./middleware/verifyJwt")



const app = express();

//Handle options credentials check -before cors!
//and fetch cookies 
app.use(credentials)

//cross origin resource sharing
app.use(cors(corsOptions))

app.use(express.urlencoded({ extended: false }))

//middleware for json
app.use(express.json())

// middleware for cookies
app.use(cookieParser())



app.use('/auth', authRoute)
app.use('/register', registerRoute)
app.use('/token', refreshTokenRoute)
app.use('/logout', logoutRoute)

app.use('/api/blogs', blogsRoute)
app.use('/api/comment', commentRoute)
app.use(verifyJwt)
app.use('/api/personalblogs', apiblogRoute)
app.use('/api/user', userRoute)


app.use(errorHandler)

app.use(notFound)

const PORT = process.env.PORT || 8080
const Start = async () => {
    try {
        app.listen(PORT, console.log(`server is listening on ${PORT}`))
        await connect(process.env.MONGO_URL).then(() => console.log("connected to db~..."))
    } catch (error) {
        console.log(error);
    }
}

Start();



