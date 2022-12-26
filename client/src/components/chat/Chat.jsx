import { useState, useEffect } from "react"
import MessageList from "./MessageList"
import ChatForm from "./ChatForm"
import ClueForm from "./ClueForm"
import Roster from "./Roster"

const Chat = ({ socket, game }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (socket) {
      socket.on("server-message", (data) => setMessages((prev) => [...prev, { message: data.message, received: true }]))
    }
  }, [socket])

  const updateMessages = (message) => {
    setMessages((prev) => [...prev, { message, received: false }])
  }

  const background = game.isRedTurn ? "red-background" : "blue-background"
  const display = game.clue ? (
    <div className="chat-center-section">
      <MessageList messages={messages} />
      <ChatForm socket={socket} updateMessages={updateMessages} />
    </div>
  ) : (
    <ClueForm socket={socket} game={game} />
  )

  return (
    <div className={`chat-section ${game.gameOver ? "transparent" : `${background}`}`}>
      <Roster />
      {display}
      <Roster />
    </div>
  )
}

export default Chat
