import { useEffect, useRef } from "react";
import Questions from "./Questions";``
import Message from "./Message";
import { useLocation, useParams } from "react-router-dom";
const Room = () => {
    // i have created this component to render all features that will be used inside a room.
    const { roomCode } = useParams();
    return (
        <div>
            <Message
                roomCode={roomCode}
            />
            <Questions roomCode={roomCode}>

            </Questions>
        </div>
    );
};

export default Room;
