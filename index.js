const express= require("express")
const {connection}= require("./db")
const { userRouter } = require("./routes/user.route")
const { postRouter } = require("./routes/post.route")
const {auth} = require('./middleware/auth.middleware')
const cors=require('cors')

const app= express()
app.use(cors())
app.use(express.json())

app.use("/users",userRouter)
app.use(auth)
app.use("/posts",postRouter)
app.listen(4500,async()=>{
    try {
        await connection
        console.log("connect to db")
    } catch (error) {
        console.log("can't connected")
        console.log(error);
    }
    console.log("Server is running port 4500")
    
})