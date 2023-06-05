const connectToDB = require("../config/database");
const http = require("./chat")
const port = process.env.PORT|| 3000

const start = async () => {
    try {
        await connectToDB()
       http.listen(port,()=>{
        console.log("server is listen on port "+port);
       })
    } catch (error) {
        console.log(error)
    }
}
start();