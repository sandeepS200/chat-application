const MakerChat = require("../models/active.user.model")
const getChat = async (req, res) => {
    try {
        const targetId = req._parsedUrl.query.split("=")[1]
        console.log(targetId);
        const exitUser = await MakerChat.findById(targetId)
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

module.exports = getChat