const express = require("express")
const router = express.Router();
const { getChat,sendMessage,login,addFriend} = require("../controllers/makeTask")
router.route("/:id").get(getChat)
router.route("/login").post(login)
router.route("/:id").patch(addFriend)
router.route("/:id").put(sendMessage)

module.exports = router