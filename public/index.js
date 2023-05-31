
let userId = window.location.search.split("=")[1];
const chatcontainer = document.querySelector(".chatcontainer")
const messageInput = document.querySelector(".messageInput")
const chat_container = document.querySelector(".chat_container")
let targetId;
const numberInput = document.querySelector(".numberInput")



// this is add code 

const addFriend = async () => {
    const json = {
        mobileNO: numberInput.value,
    }
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


const getChats = async (targetId,flag="Ok") => {
    let html = ""
    const getChats = await fetch(`/api/v1/task/${targetId}`, { method: "GET" })
    const chats = await getChats.json()
    let margin = 0;
    chats.chat.forEach(chat => {
        if (userId == chat.sender || userId == chat.targetId) {
            let chatMessages = `<div class="message"  style=${userId == chat.sender ? `left:70%;top:${++margin * 10}%;` : `left:10%;top:${++margin * 10}%;`}>
            <p>${chat.message}</p>
        </div>`
            html += chatMessages
        }

    })
    chat_container.innerHTML = html;
}



// this is a open chat code

const openChat = (value) => {
    targetId = value.getAttribute("id");
    getChats(targetId)
}



// this is a send message code



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
    console.log(await res.json());
    getChats(targetId)
}