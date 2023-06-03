const express = require("express");
const hbs = require("hbs")
const port = process.env.PORT || 3000
const path = require("path");
const connectToDB = require("../config/database");
const { dashboardData,userId} = require("../controllers/makeTask");
const router = require("../routers/chatRouter");
const publicPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
const asyncWrapper = require("../middleware/asyncmiddleware");
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(publicPath))
app.set("view engine", "hbs")
app.set("views", viewPath)
const http = require("http").createServer(app)
const io = require("socket.io")(http);
var admin = io.of("/admin")
admin.on("connection",(socket)=>{
    socket.on("send",(targetId)=>{
        socket.broadcast.emit("receive",targetId)
    })
})
app.get("/", (req, res) => {
    res.render("home")
})
app.get("/login", (req, res) => {
    res.render("login")
})
app.use("/api/v1/task", router)
app.get("/dashboard", dashboardData)
const start = async () => {
    try {
        await connectToDB()
       http.listen(port,()=>{
        console.log("server is listen on port"+port);
       })
    } catch (error) {
        console.log(error)
    }
}

start();