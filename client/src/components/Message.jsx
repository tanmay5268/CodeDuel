import React, { useState } from "react";
const Message = ({ socket, roomCode }) => {
    const [message, setMessage] = useState("");
    function sendMessage() {
        if (!message.trim()) return;
        socket.emit("send_message", {
            roomCode,
            message
        });
        setMessage("");
    }
    return (
        <div>
            <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};
export default Message;