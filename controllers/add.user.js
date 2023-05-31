const ActiveUser = require("../models/active.user.model")

const addUser = async (req, res) => {
    try {
        const { mobileNO, requester } = req.body
        const Exituser = await ActiveUser.findOne({ activeMbNO: mobileNO })
        if (Exituser) {
            await ActiveUser.updateOne({ _id: requester, contactList: { $nin: [Exituser._id] }, "_id": { $ne: { requester } } }, {
                $push: { contactList: Exituser._id }
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

module.exports = addUser