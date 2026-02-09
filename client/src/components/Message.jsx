import React, { useState, useEffect } from "react";
import { useSocket } from "../context/SocketContext";

const Message = ({ roomCode }) => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [isSending, setIsSending] = useState(false);

    const { socket } = useSocket(); 

    useEffect(() => {
        if (!socket || !roomCode) {
            console.log("Waiting for socket to be initialized...");
            return;
        }

        console.log("Socket is ready! Setting up message listeners for room:", roomCode);

        socket.on(`receive_message-${roomCode}`, (data) => {
            console.log("New message received:", data);
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        socket.on(`error-${roomCode}`, (error) => {
            console.error("Room error:", error);
        });

        return () => {
            console.log("Cleaning up message listeners for room:", roomCode);
            socket.off(`receive_message`);
            socket.off(`error-${roomCode}`);
        };
    }, [socket, roomCode]);

    const sendMessage = () => {
        if (!message.trim()) return;

        if (!socket) {
            console.error("Socket not connected");
            return;
        }

        setIsSending(true);

        socket.emit("send_message", {
            roomCode,
            message,
            timestamp: new Date().toISOString()
        });

        setMessage("");
        setIsSending(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !isSending) {
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Messages Display Area */}
            <div className="flex-1 overflow-y-auto mb-4 p-3 border border-gray-300 rounded bg-gray-50 max-h-96">
                {!socket ? (
                    <p className="text-gray-500 text-center">Connecting to room...</p>
                ) : messages.length === 0 ? (
                    <p className="text-gray-500 text-center">No messages yet. Start a conversation!</p>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className="mb-2 p-2 bg-white rounded shadow-sm">
                            <p className="text-sm text-gray-600">{msg.sender || "You"}</p>
                            <p className="text-base">{msg.message}</p>
                            {msg.timestamp && (
                                <p className="text-xs text-gray-400">
                                    {new Date(msg.timestamp).toLocaleTimeString()}
                                </p>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Message Input Area */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyUp={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border border-gray-300 rounded outline-none focus:border-blue-500"
                    disabled={isSending || !socket}
                />
                <button
                    onClick={sendMessage}
                    disabled={isSending || !message.trim() || !socket}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
                >
                    {isSending ? "Sending..." : "Send"}
                </button>
            </div>

            {socket && (
                <p className="mt-2 text-xs text-gray-500">
                    Socket connected (ID: {socket.id})
                </p>
            )}
        </div>
    );
};

export default Message;
