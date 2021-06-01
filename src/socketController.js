import events from "./events";
import { chooseWord } from "./words";

let sockets = [];
let inProgress = false;
let word = null;
let leader = null;
let timeout = null;

const chooseLeader = () => sockets[Math.floor(Math.random() * sockets.length)];

const socketController = (socket, io) => {
    const broadcast = (event, data) => socket.broadcast.emit(event, data);
    const superBroadcast = (event, data) => io.emit(event, data);   //io는 모든 clients에게 메시지를 보냄.
    const sendPlayerUpdate = () => superBroadcast(events.playerUpdate, { sockets });
    const startGame = () => {
        if(sockets.length > 1) {
            if(inProgress === false) {
                inProgress = true;
                leader = chooseLeader();
                word = chooseWord();
                superBroadcast(events.gameStarting);
                setTimeout(() => {
                    superBroadcast(events.gameStarted);
                    io.to(leader.id).emit(events.leaderNotifi, { word });  //알람을 보낼 때 어던 단어를 그려야하는지 보냄.
                    timeout = setTimeout(endGame, 30000);
                }, 5000);
                
            }
        }
    };
    const endGame = () => {
        inProgress = false;
        superBroadcast(events.gameEnded);
        if(timeout !== null) {
            clearTimeout(timeout);
        }
        setTimeout(() => startGame(), 2000);
    };
    const addPoints = (id) => {
        sockets = sockets.map(socket => {
            if(socket.id === id) {
                socket.points += 10;
            }
            return socket;
        }); //array의 각 요소마다 콜백 함수를 실행하고 그 결과의 array를 반환함. return을 꼭해야함.
        sendPlayerUpdate();
        endGame();
        clearTimeout(timeout);
    };
    
    socket.on(events.setNickname, ({ nickname }) => {
        socket.nickname = nickname;
        sockets.push({ id: socket.id, points: 0, nickname: nickname });
        broadcast(events.newUser, { nickname });
        sendPlayerUpdate();
        startGame();

    });
    
    socket.on(events.disconnect, () => {
        sockets = sockets.filter(aSocket => aSocket.id !== socket.id);
        if(sockets.length === 1) {
            endGame();
        } else if(leader) {
            if(socket.id === leader.id) {
                endGame();
            }
        }
        broadcast(events.disconnected, { nickname: socket.nickname });
        sendPlayerUpdate();
    });

    socket.on(events.sendMsg, ({ message }) => {
        if(message === word) {
            superBroadcast(events.newMsg, { 
                message: `Winner is ${socket.nickname}, word was: ${word}`,
                nickname: "Bot"
            });
            addPoints(socket.id);
        } else {
            broadcast(events.newMsg, { message, nickname: socket.nickname });
        }
    });

    socket.on(events.beginPath, ({ x, y }) => 
        broadcast(events.beganPath, { x, y })
    );

    socket.on(events.strokePath, ({ x, y, color }) => 
        broadcast(events.strokedPath, { x, y, color })
    );


    socket.on(events.fill, ({ color }) => 
        broadcast(events.filled, { color })
    );
};

export default socketController;
