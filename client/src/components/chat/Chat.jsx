import { useState, useEffect } from "react"
import MessageList from "./MessageList"
import ChatForm from "./ChatForm"

const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (socket) {
      socket.on("server-message", (data) => setMessages((prev) => [...prev, { message: data.message, received: true }]))
    }
  }, [socket])

  const updateMessages = (message) => {
    setMessages((prev) => [...prev, { message, received: false }])
  }

  return (
    <>
      <MessageList messages={messages} />
      <ChatForm socket={socket} updateMessages={updateMessages} />
    </>
  )
}

export default Chat
