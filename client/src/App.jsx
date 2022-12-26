import { Routes, Route } from "react-router-dom"
import useSocket from "./hooks/useSocket"

import "./App.css"
import LandingPage from "./pages/LandingPage"
import GameLobby from "./pages/GameLobby"

const App = () => {
  const { socket } = useSocket(":8000")

  return socket ? (
    <div className="site-container">
      <Routes>
        <Route exact path="/" element={<LandingPage socket={socket} />} />
        <Route exact path="/rooms/:id" element={<GameLobby socket={socket} />} />
      </Routes>

      {/* <div className="title">CODENAMES</div>
      <Game socket={socket} />
      <div className="title">CODENAMES</div> */}
    </div>
  ) : (
    "Loading..."
  )
}

export default App
