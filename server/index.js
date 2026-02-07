import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const codeMap = new Map();

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("CreateRoom", () => {
        const roomCode = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
        console.log("Room created with code:", roomCode);
        socket.emit("roomCreated", { code: roomCode });
        codeMap.set(roomCode, socket.id);
    });

    socket.on("joinRoom", (data) => {
        const { roomCode } = data;
        socket.join(roomCode);
        console.log(`User ${socket.id} joined room: ${roomCode}`);
        socket.emit("joinedRoom", { roomCode });
    });

    socket.on("send_message", (data) => {
        const { roomCode, message, timestamp } = data;
        console.log(`Message in room ${roomCode}: ${message}`);

        // Send ONLY to users in this room
        io.emit(`receive_message-${data.roomCode}`, {
            message,
            timestamp,
            sender: socket.id
        });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

app.post('/joinRoom', (req, res) => {
    console.log("Join room request received with body:", req.body);
    try {
        const { code } = req.body;
        if (codeMap.has(code)) {
            res.send({ available: true });
        } else {
            res.send({ available: false });
        }
    } catch (error) {
        res.status(400).send({ message: "Bad request" });
    }
});

server.listen(3001, () => {
    console.log("Socket.IO server running on port 3001");
});
