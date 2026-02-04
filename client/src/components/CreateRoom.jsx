import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

export function CreateRoom() {
    const [code, setCode] = useState("noCode");
    const [codeSuccess, setCodeSuccess] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const navigate = useNavigate();

    const { socket, initializeSocket } = useSocket();

    const handleCreateRoom = async () => {
        if (isCreating) return;

        setIsCreating(true);

        try {
            const newSocket = initializeSocket();

            if (!newSocket) {
                console.error("Failed to initialize socket");
                setIsCreating(false);
                return;
            }

            const handleConnect = () => {
                console.log("Socket connected, now creating room...");

                newSocket.emit("CreateRoom");

                newSocket.once("roomCreated", (data) => {
                    console.log("Room created with code:", data.code);
                    setCode(data.code);
                    setCodeSuccess(true);
                    setIsCreating(false);
                    navigate(`/room/${data.code}`);
                });

                newSocket.off("connect", handleConnect);
            };

            if (newSocket.connected) {
                handleConnect();
            } else {
                newSocket.once("connect", handleConnect);
            }
        } catch (err) {
            console.error("Error creating room:", err);
            setIsCreating(false);
        }
    };

    return (
        <div className="flex flex-col items-center text-center mb-6 p-4 border rounded-lg">
            <h2 className="text-xl font-bold mb-4">Create a New Room</h2>

            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400 mb-4"
                onClick={handleCreateRoom}
                disabled={isCreating}
            >
                {isCreating ? "Creating Room..." : "Create Room"}
            </button>

            {code !== "noCode" && (
                <div className="mt-4 p-2 bg-gray-100 rounded">
                    <p className="text-sm text-gray-600">Your Room Code:</p>
                    <h1 className="text-2xl font-bold">{code}</h1>
                </div>
            )}

            {codeSuccess && (
                <p className="mt-3 text-green-600 font-semibold">
                    Room Created Successfully! Socket is now connected.
                </p>
            )}

            {socket && (
                <p className="mt-3 text-sm text-blue-600">
                    ✓ Socket connected (ID: {socket.id})
                </p>
            )}
        </div>
    );
}
