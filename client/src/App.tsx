import "./index.css";
import { CreateRoom } from "./components/CreateRoom";
import JoinRoom from "./components/JoinRoom";
export function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-900">
      <div className="flex flex-col">
        <CreateRoom />
        <JoinRoom />
        </div>
    </div>
  );
}

export default App;
