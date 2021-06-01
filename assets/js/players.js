import { disableCanvas, enableCanvas, hideControls, resetCanvas, showControls } from "./app";
import { disableChat, enableChat } from "./chat";

const board = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");

const addPlayers = (players) => {
    board.innerText = "";
    players.forEach(player => {
        const playerElement = document.createElement("span");
        playerElement.innerText = `${player.nickname}: ${player.points}`;
        board.appendChild(playerElement);
    });
};

const setNotfis = (text = "") => {
    notifs.innerText = "";
    notifs.innerText = text;
}

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = () => {
    setNotfis();
    disableCanvas();
    hideControls();
    enableChat();
};

export const handleLeaderNotifi = ({ word }) => {
    enableCanvas();
    showControls();
    disableChat();
    notifs.innerText = `You are the leader, paint: ${word}`;
};

export const handleGameEnded = () => {
    setNotfis("Game ended.");
    disableCanvas();
    hideControls();
    resetCanvas();
}

export const handleGameStarting = () => setNotfis("Game will start soon");
