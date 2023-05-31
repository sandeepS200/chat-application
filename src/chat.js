const express = require("express");
const port = process.env.PORT|| 3000
const path = require("path");
const connectToDB = require("../config/database");
const addUser = require("../controllers/add.user");
const dashboardData = require("../controllers/dashboard.data");
const receivechat = require("../controllers/receiveChat");33
const getChat = require("../controllers/get.chat");
const router = require("../routers/chatRouter");
const publicPath = path.join(__dirname,"../public");
const viewPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(publicPath))
app.set("view engine","hbs")
app.set("views",viewPath)
app.get("/",(req,res)=>{
    res.render("home")
})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.use("/api/v1/task",router)
// app.post("/login",doLogin)
app.post("/addFriend",addUser)
app.get("/getChats",getChat)
app.post("/sendMessage",receivechat)
app.get("/dashboard",dashboardData)
const start = async()=>{
    try {
        await connectToDB()
        app.listen(port,(error)=>{
            console.log("your server is started now");
        })
    } catch (error) {
        console.log(error)
    }
}
start();