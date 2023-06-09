
let userId = window.location.search.split("=")[1];
const socket = io("sandeepchat.onrender.com/admin")
let targetId;
let targetName;
const chatcontainer = document.querySelector(".chatcontainer")
const messageInput = document.querySelector(".messageInput")
const chat_container = document.querySelector(".chat_container")
const right_container = document.querySelector(".right_container")
const friendscontainer = document.querySelector(".friendscontainer")
const friendname = document.querySelectorAll(".friendname")
const numberInput = document.querySelector(".numberInput")
const toggle = document.querySelector(".toggle")
const fName = document.querySelector(".fName")
const container = document.querySelector(".container")
let notFilter = Array.from(friendscontainer.children)
console.log(notFilter);
let temp;
const searchFreindInput = document.querySelector(".searchFreindInput")
const autoComplete = (searchFreindInput, arr) => {
    if (searchFreindInput.value.trim() !== "") {
        friendscontainer.innerHTML = ""
        let searchFreindInput_value = searchFreindInput.value.trim();
        let filteredElementBox = arr.filter((notFilteredElement) => {
            return notFilteredElement.innerText.trim().slice(0, searchFreindInput_value.length) === searchFreindInput_value
        }).map((filteredElement) => {
            // filteredElement.getAttribute("id")
            friendscontainer.innerHTML += filteredElement.outerHTML
            return filteredElement
        })
        if (filteredElementBox.length == 0) {
            friendscontainer.innerHTML = `<div style="width:80%; height:100%; text-align:center;">Not Found </div>`
        }
    }
    else {
        friendscontainer.innerHTML = ""
        arr.map((realElement) => {
            friendscontainer.innerHTML += realElement.outerHTML
        })
    }
}
searchFreindInput.addEventListener("input", () => {
    if (notFilter.length != 0) {
        autoComplete(searchFreindInput, temp)
    }
})


toggle.addEventListener("click", () => {
    right_container.style.visibility = "hidden"
    container.classList.remove("active")
})
// const socket = io("sandeepchat.onrender.com/admin");
const addFriend = async () => {
    try {
        if (numberInput.value!=="") {
            console.log(parseInt(numberInput.value).toString().length);
            const json = {
                mobileNO: numberInput.value,
            }
            console.log(numberInput.value);
            console.log(userId)
            await fetch(`/api/v1/task/${userId}`, {
                method: "PATCH",
                body: JSON.stringify(json),
                headers: {
                    "Content-Type": "application/json"
                }
            })
           
                location.reload()
            
        }
    } catch (error) {
        console.log(error);
    }
}


//this  is getchat code
const getChats = async (targetId) => {
    try {
        if (targetId !== "") {
            let chatHtml = ""
            const getChats = await fetch(`/api/v1/task/${targetId}`, { method: "GET" })
            const chats = await getChats.json()
            let margin = 0;
            chats.chat.filter((chat) => chat.sender === userId || chat.receiver === userId).map(chat => {
                let chatMessages = `<div class="message"  style=${userId === chat.sender ? `left:70%;top:${++margin * 10}%;` : `left:10%;top:${++margin * 10}%;`}>
                <p>${chat.message}</p>
            </div>`
                chatHtml += chatMessages
            })
            chat_container.innerHTML = chatHtml;
        }
    } catch (error) {
        console.log(error);
    }
}


socket.on("receive", (id) => {
    if (friendscontainer.getAttribute("id") === id) {
        getChats(id);
    }
    else {
        console.log("hellow");
    }
    console.log(id);
})





const openChat = (value) => {
    chat_container.innerHTML = ""
    right_container.style.visibility = "visible"
    container.classList.add("active")
    targetName = value.innerText;
    targetId = value.getAttribute("id");
    friendscontainer.setAttribute("id", targetId)
    fName.innerHTML = targetName
    getChats(targetId)
}


const sendMessage = async () => {
    try {
        let json = {
            message: messageInput.value
        }
        fetch(`/api/v1/task/${userId}&&${targetId}`, {
            method: "PUT",
            body: JSON.stringify(json),
            headers: {
                "Content-Type": "application/json"
            }
        });
        socket.emit("send", userId)
        getChats(targetId)
    } catch (error) {
        console.log(error);
    }
}
(() => {
    if (notFilter.length !== 0) {
        targetId = [...friendscontainer.children][0].getAttribute("id")
        targetName = [...friendscontainer.children][0].innerText
        friendscontainer.setAttribute("id", targetId)
        fName.innerHTML = targetName
        temp = notFilter
        getChats(friendscontainer.getAttribute("id"))
    }
    else {
        friendscontainer.innerHTML = "Add friends"
    }
})();

messageInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
})
   