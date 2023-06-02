const express = require("express");
const hbs = require("hbs")
const port = process.env.PORT || 3000
const path = require("path");
const connectToDB = require("../config/database");
const { dashboardData} = require("../controllers/makeTask");
const router = require("../routers/chatRouter");
const publicPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")
const multer = require("multer");
const asyncWrapper = require("../middleware/asyncmiddleware");
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(publicPath))
app.set("view engine", "hbs")
app.set("views", viewPath)
app.get("/", (req, res) => {
    res.render("home")
})
app.get("/login", (req, res) => {
    res.render("login")
})
app.use("/api/v1/task", router)
// app.post("/login",doLogin)
// hbs.handlebars.compile()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../upload");
    },
    filename: (req, file, cb) => {
        // console.log(file);
        cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({
    storage: storage
})
app.get("/upload", (req, res) => {
    res.render("upload")
})
app.post("/upload", upload.single("file"), (req, res) => {
    console.log(req.file);
})
app.get("/dashboard", dashboardData)
const start = async () => {
    try {
        await connectToDB()
        app.listen(port, (error) => {
            console.log("your server is started now");
        })
    } catch (error) {
        console.log(error)
    }
}

// app.get("test",asyncWrapper((req,res)=>{

// }))
start();