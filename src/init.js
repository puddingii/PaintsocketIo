import express from "express";
import socketIO from "socket.io";
import morgan from "morgan";
import events from "./events";
import socketController from "./socketController";

const PORT = 4050;
const app = express();
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(morgan("dev"));
app.use(express.static(process.cwd() + "/src/static"));
app.get("/", (req, res) => res.render("home", { 
    events: JSON.stringify(events)
}));

const handleListening = () =>
    console.log(`Server running : http://localhost:${PORT}`);

const server = app.listen(PORT, handleListening);

const io = socketIO(server);

io.on("connection", (socket) => socketController(socket, io));
//client가 접속하면 connection이라는 event를 발생시킴. 그리고 socket은 하나의 socket임
