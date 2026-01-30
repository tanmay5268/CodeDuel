import { io, Socket } from "socket.io-client";
import * as React from "react";

export function CreateRoom() {
    const [code, setCode] = React.useState("noCode");
    const socketRef = React.useRef(false);

    const socketConnect = () => {
        const roomCode = Math.floor(Math.random() * 1000000).toString().padStart(6, "0");
        setCode(roomCode);

        // Disconnect previous socket if exists
        if (socketRef.current) {
            socketRef.current.disconnect();
        }

        // Create new socket connection
        const socket = io("http://localhost:3001");

        socket.on("connect", () => {
            console.log("Connected with ID:", socket?.id);
            socket?.emit("roomCode", { code: roomCode });
        });

        socket.on("roomCode", (data) => {
            console.log("Room code received:", data);
        });
    };

    return (
        <div>
            <button onClick={socketConnect}>Create Room</button>
            <h1>{code}</h1>
        </div>
    );
}
