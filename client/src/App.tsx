import "./index.css";
import { CreateRoom } from "./components/CreateRoom";
import * as React from "react";
export function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-amber-900">
      <CreateRoom />
    </div>
  );
}

export default App;
