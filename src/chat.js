const express = require("express");
const path = require("path");
const hbs = require("hbs")
const { dashboardData} = require("../controllers/makeTask");
const router = require("../routers/chatRouter");
const publicPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)
app.set("view engine", "hbs")
app.set("views", viewPath)
const http = require("http").createServer(app)


const io = require("socket.io")(http);
const connection_path = io.of("/admin")
connection_path.on("connection",(socket)=>{
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

module.exports = http;