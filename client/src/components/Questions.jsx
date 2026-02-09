import React from 'react'
import { useSocket } from "../context/SocketContext";
const Questions = (roomCode) => {
    const { socket } = useSocket();
    const[questions,setQuestions]=React.useState([]);
    React.useEffect(() => {
        if (!socket) {
            console.log("Waiting for socket to be initialized...");
            return;
        }
        console.log("Socket is ready! Setting up question listeners.");
        socket.emit("get_questions", { roomCode });

        socket.on(`questions-${roomCode}`, (data) => {
            console.log("Questions received:", data);
            // Handle the received questions here
                setQuestions(data);
        });
        return () => {
            console.log("Cleaning up question listeners.");
            socket.off(`questions-${roomCode}`);
        };

    }, [])

  return (
    <div className='flex items-center justify-around mt-10'>
        <div>questions</div>
        <div className='flex flex-col'>{questions.map((q) => (
            <div key={q.id}>
                <p>{q.ques}</p>
                <input type="text" placeholder='Your answer here' className='border-2 border-gray-300 rounded-md p-2 w-full' />
            </div>
        ))}</div>
    </div>
  )
}

export default Questions
