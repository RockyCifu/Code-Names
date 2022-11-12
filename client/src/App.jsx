import useSocket from "./hooks/useSocket"
import Chat from "./components/chat/Chat"
import "./App.css"

const App = () => {
  const { socket } = useSocket(":8000")
  return <Chat socket={socket} />
}

export default App
