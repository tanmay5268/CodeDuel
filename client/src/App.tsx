import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateRoom } from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";
import Room from "./components/Room";

export function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="flex items-center justify-center min-h-screen bg-amber-900">
              <div className="flex flex-col">
                <CreateRoom />
                <JoinRoom />
              </div>
            </div>
          }
        />
        <Route path="/room/:roomCode" element={<Room />} />
      </Routes>
    </Router>
  );
}

export default App;
