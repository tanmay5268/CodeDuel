import { io } from "socket.io-client";

const socket = io("http://localhost:3001", { autoConnect: false });

import * as React from "react";
export function CreateRoom() {
    const [code, setCode] = React.useState("noCode");
    function socketConnect() {
        const code = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        setCode(code);
        socket.connect();
        socket.on("connect", () => {
            socket.emit("roomCode", { code: code, socketId: socket.id });
        });
        socket.on('roomCode', (code) => {
            console.log("Room code received:", code);
        })
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-amber-900">
            <div id="main-container" className="flex flex-col items-center justify-center gap-4">
                <h1 className="text-4xl font-bold text-white">Welcome to CodeDuel!</h1>
                <button onClick={() => { socketConnect() }} className="bg-black p-3 rounded-xl text-white text-lg uppercase">Create room</button>
                <h1 className="text-white border p-2 rounded">{code}</h1>
            </div>
        </div>
    );
}

export default CreateRoom;
