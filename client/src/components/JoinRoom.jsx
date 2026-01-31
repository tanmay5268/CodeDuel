import { useState,useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import Room from "./Room";
const JoinRoom = () => {

    const [joinCode, setJoinCode] = useState(null);
    const [codeSuccess, setCodeSuccess] = useState(false);
    const socketRef = useRef(null);
    function handelCode(code) {
        setTimeout(() => {
            setJoinCode(code);
        }, 500);
    }
    function joinwithCode() {
        // const socket = io("http://localhost:3001");
        // socket.on("connect", () => {
        //     console.log("Connected with ID:", socket.id);
        //     socket.emit("roomCode", { code: joinCode });
        // });
        axios.post('http://localhost:3001/joinRoom', {
            code: joinCode
        }).then((res) => {
            if (res.data.available) {
                const socket = io("http://localhost:3001");
                socket.on("connect", () => {
                    socketRef.current = socket;
                    console.log("Connected with ID:", socket.id);
                    setCodeSuccess(true);
                });
            } else {
                console.log("Room code not available");
            }
        }).catch((err) => {
            console.log("Error joining room:", err.message);
        })
    }
    return (
        <div className=" flex flex-col items-center text-center mb-6 border-2 p-2 rounded-lg">
            <button onClick={() => { joinwithCode() }} className="bg-blue-500  hover:bg-blue-700 text-white font-bold mb-6 py-2 px-4 rounded">Join Room</button>
            <input onChange={(e) => { handelCode(e.target.value) }} type="text" placeholder="Enter Room Code" className="mb-3 p-2 rounded-lg outline" />
            {codeSuccess && <div>Joined Room Successfully!
                <Room socket={socketRef.current} roomCode={joinCode}></Room></div>}
        </div>
    )
}

export default JoinRoom