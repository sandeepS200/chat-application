
const ChatCommunity = require("../models/active.user.model")


const dashboardData = async (req, res) => {
    try {
        userId = req._parsedUrl.query.split("=")[1]
        const exitUser = await ChatCommunity.findOne({ _id: userId })
        if (exitUser) {
            const data = await ChatCommunity.find({ _id: { $in: exitUser.contactList } })
            res.render("dashboard", {
                data: data,
                user: exitUser
            })
        } else {
            res.redirect("/login")
        }
    } catch (error) {
        res.send("OOPs 404 Error");
        console.log(error.message);
    }
}


const getChat = async (req, res) => {
    console.log("get");
    try {
        const targetId = req.params.id
        // console.log(targetId);
        const exitUser = await ChatCommunity.findById(targetId)
        if (exitUser) {
            const chat = exitUser.chatList
            if (chat) {
                res.json({
                    chat
                })
            }
        }
        else {
            throw new Error("both user is not exit on this platform")
        }

    } catch (error) {
        console.log(error.message);
    }
}
const sendMessage = async (req, res) => {
    try {
        const [sender, receiver] = req.params.id.split("&&")
        const { message } = req.body
        const exitUser = await ChatCommunity.find({ $or: [{ "_id": sender }, { "_id": receiver }] })
        if (exitUser.length != 0) {
            const chat = await ChatCommunity.updateMany({ _id: { $in: [sender, receiver] } }, {
                $push: {
                    chatList: {
                        message: message,
                        sender: sender,
                        receiver: receiver
                    }
                }
            })
            if (chat) {

            }
        }
        else {
            throw new Error("both user is not exit on this platform")
        }

    } catch (error) {
        console.log(error.message);
        res.send("NOK")
    }
}
const login = async (req, res) => {
    try {
        const { name, email, password, mobileNO } = req.body
        // console.log(req.body);
        const exitInput = await ChatCommunity.findOne({ $or: [{ activeMbNO: mobileNO }, { activeEmail: email }, { activePassword: password }] })
        const exitUser = await ChatCommunity.findOne({ $and: [{ activeEmail: email }, { activeMbNO: mobileNO }, { activePassword: password }] })
        if (exitUser) {
            console.log("i am Exit now");
            res.redirect("/dashboard" + `?user=${exitUser._id}`)
        }
        else if (exitInput) {
            res.redirect("/login")
        }
        else {
            const afterCreateRes = await ChatCommunity.create({
                activeName: name,
                activeEmail: email,
                activePassword: password,
                activeMbNO: mobileNO
            })
            if (afterCreateRes) {
                console.log(afterCreateRes._id);
                res.redirect(`/dashboard?user=${afterCreateRes._id}`)
            }
            else {
                res.send("error in login please try again")
            }
        }
    } catch (error) {
        res.redirect("/login")
    }
}
const addFriend = async (req, res) => {
    try {
        const { mobileNO } = req.body
        const requester = req.params.id
        const exitUser = await ChatCommunity.findOne({ activeMbNO: mobileNO })
        let _id = exitUser._id.toString();
        if (exitUser) {
           
            await ChatCommunity.updateOne({
                $and: [{ _id: requester }, { _id: { $ne: { _id } } }],
                contactList: { $nin: [exitUser._id] }
            }
                ,
                {
                    $push: { contactList: exitUser._id }
                });
            res.status(200).json({
                statusCode:200,
            })
        }
        else {
            res.status(200).json({
                massage: 'user is not login on platform'

            })
        }
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    getChat,
    sendMessage,
    login,
    addFriend,
    dashboardData,
}