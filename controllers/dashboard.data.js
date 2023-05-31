const ActiveUser = require("../models/active.user.model")
const dashboardData = async (req, res) => {
    try {
        const exitUser = await ActiveUser.findById(req._parsedUrl.query.split("=")[1])
        if(exitUser){
            const data = await ActiveUser.find({_id:{$in:exitUser.contactList}})
            res.render("dashboard",{
                data:data
            })
        }else{
            res.redirect("/login")
        }
    }catch (error) {
        console.log(error.message);
    }
}

module.exports = dashboardData