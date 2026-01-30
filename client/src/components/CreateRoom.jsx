import { io, Socket } from "socket.io-client";
import * as React from "react";

export function CreateRoom() {
    const [code, setCode] = React.useState("noCode");
    const socketRef = React.useRef(null);
    const socketConnect = () => {

        if (socketRef.current) {
            socketRef.current.disconnect();
        }
        // Create new socket connection
        socketRef.current = io("http://localhost:3001");
        socketRef.current.on("connect", () => {
            console.log("Connected with ID:", socketRef.current?.id);
            socketRef.current?.emit("CreateRoom");
        });

        socketRef.current.on("roomCreated", (data) => {
            setCode(data.code);
            console.log("Room code received:", data);
        });
    };

    return (
        <div className=" flex flex-col items-center text-center mb-6">
            <button className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={socketConnect}>Create Room</button>
            <h1 className="mt-3 w-fit p-1 rounded-lg outline">{code}</h1>
        </div>
    );
}
