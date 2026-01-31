import { useEffect, useRef } from "react";
import Message from "./Message";
import { useLocation, useParams } from "react-router-dom";
const Room = () => {
    const { roomCode } = useParams();
    const location = useLocation();
    const socket = location.state?.socket;

    if (!socket) {
        return <div>Invalid room access</div>;
    }
    return (
        <div>
            <h2>Room: {roomCode}</h2>

            {/* pass props DOWN */}
            <Message
                socket={socket}
                roomCode={roomCode}
            />
        </div>
    );
};

export default Room;
