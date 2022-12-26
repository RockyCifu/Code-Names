import { useState, useEffect } from "react"
import Board from "../components/board/Board"
import Chat from "../components/chat/Chat"
import Status from "../components/status/Status"

const initialGameState = () => ({
  board: [],
  redTeam: [],
  blueTeam: [],
  spyMasters: { red: "", blue: "" },
  score: { red: 0, blue: 0 },
  clue: null,
  guessesRemaining: null,
  gameOver: true,
  wasRedFirst: false,
  isRedTurn: false,
  usedBonus: false,
})

const Game = ({ socket }) => {
  const [game, setGame] = useState(initialGameState)

  useEffect(() => {
    if (socket) {
      socket.on("new-game", (data) => setGame(data))
      socket.on("game-update", (data) => setGame(data))
    }
  }, [socket])

  const handleNewGame = () => {
    socket.emit("new-game", { wasRedFirst: game.wasRedFirst })
  }

  const handlePass = () => {
    socket.emit("team-passed", { game })
  }

  console.log(game)
  return (
    <div className="container">
      <Status socket={socket} game={game} handleNewGame={handleNewGame} handlePass={handlePass} />
      <Board socket={socket} game={game} />
      <Chat socket={socket} game={game} />
    </div>
  )
}

export default Game
