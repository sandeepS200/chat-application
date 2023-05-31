const ActiveUser = require("../models/active.user.model")

const doLogin = async (req, res) => {
    try {
        const { name, email, password, mobileNO } = req.body
        const Exituser = await ActiveUser.findOne({ activeEmail: email, activePassword: password })
        if (Exituser) {
            console.log("i am Exit now");
            res.redirect("/dashboard"+`?user=${Exituser._id}`)
        }
        else{
            console.log("i am creating");
           const afterCreateRes = await ActiveUser.create({
                activeName:name,
                activeEmail:email,
                activePassword:password,
                activeMbNO:mobileNO
            })
            if (afterCreateRes) {
                console.log(afterCreateRes._id);
                res.redirect(`/dashboard?user=${afterCreateRes._id}`)
            }
            else{
                res.send("error in login please try again")
            }
        }
    } catch (error) {
       console.log(error);
    }
}

module.exports = doLogin