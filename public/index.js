
let userId = window.location.search.split("=")[1];
let targetId;
const chatcontainer = document.querySelector(".chatcontainer")
const messageInput = document.querySelector(".messageInput")
const chat_container = document.querySelector(".chat_container")
const friendscontainer = document.querySelector(".friendscontainer")
const numberInput = document.querySelector(".numberInput")
targetId= [...friendscontainer.children][0].getAttribute("id")
friendscontainer.setAttribute("id",targetId);
const addFriend = async () => {
    const json = {
        mobileNO: numberInput.value,
    }
    console.log(numberInput.value);
    console.log(userId)
    fetch(`/api/v1/task/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(json),
        headers: {
            "Content-Type": "application/json"
        }
    })
    location.reload()
}


//this  is getchat code


const getChats = async (targetId) => {
    let chatHtml = ""
    const getChats = await fetch(`/api/v1/task/${targetId}`, { method: "GET" })
    const chats = await getChats.json()
    let margin = 0;
    chats.chat.filter((chat) => chat.sender == userId || chat.receiver == userId).map(chat => {
        let chatMessages = `<div class="message"  style=${userId == chat.sender ? `left:70%;top:${++margin * 10}%;` : `left:10%;top:${++margin * 10}%;`}>
                <p>${chat.message}</p>
            </div>`
        chatHtml += chatMessages
    })
    chat_container.innerHTML = chatHtml;
}
getChats(friendscontainer.getAttribute("id"))
const openChat = (value) => {
    targetId = value.getAttribute("id");
    friendscontainer.setAttribute("id", targetId)
    getChats(targetId)
}


const sendMessage = async (value) => {
    let json = {
        message: messageInput.value,
    }
    console.log(messageInput.value);
    const res = await fetch(`/api/v1/task/${userId}&&${targetId}`, {
        method: "PUT",
        body: JSON.stringify(json),
        headers: {
            "Content-Type": "application/json"
        }
    })
    getChats(targetId)
}