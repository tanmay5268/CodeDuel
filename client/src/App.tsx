import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateRoom } from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";
import Room from "./components/Room";
import { SocketProvider } from "./context/SocketContext";
export function App() {
  return (
    <SocketProvider>
    <Router>
      <Routes>
        <Route
          path="/create"
          element={
            <div className="flex items-center justify-center min-h-screen bg-amber-900">
              <div className="flex flex-col">
                <CreateRoom />
              </div>
            </div>
          }
        />

        <Route
          path="/join"
          element={
            <div className="flex items-center justify-center min-h-screen bg-amber-900">
              <div className="flex flex-col">
                <JoinRoom />
              </div>
            </div>
          }
        />
        
        <Route path="/room/:roomCode" element={<Room />} />

      </Routes>
    </Router>
    </SocketProvider>
  );
}

export default App;
