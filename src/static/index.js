const socket = io("/");

function sendMessage(message) {
    socket.emit("newMessage", { message });
    console.log(`You: ${message}`);
}

function setNickname(nickname) {
    socket.emit("setNickname", { nickname });
}

function handleMessageNotf(data) {
    const { message, nickname } = data;
    console.log(`${nickname}: ${message}`);
}

socket.on("messageNotif", handleMessageNotf);
