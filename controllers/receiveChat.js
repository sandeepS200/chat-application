const MakerChat = require("../models/active.user.model")
const chatMaker = async (req, res) => {
    try {
        const { message, sender, receiver } = req.body
        console.log(req.body);
        const exitUser = await MakerChat.find({$and:[{_id:sender},{_id:receiver}]})
        console.log(exitUser);
        if (exitUser.length!=0) {
            const chat = await MakerChat.updateMany({ _id: { $in: [sender, receiver] } }, {
                $push: {
                    chatList: {
                        message: message,
                        sender: sender,
                        receiver: receiver
                    }
                }
            })
            if(chat){
                res.send("Ok")
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

module.exports = chatMaker