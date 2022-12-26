import { useEffect } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"

const GameLobby = ({ socket }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!location.state?.redirect) {
      navigate("/")
      return
    }
    if (!socket) return
    socket.emit("join-room", { id })

    socket.on("new-member", (data) => console.log(data))
  }, [id, socket])

  return <div>Lobby</div>
}

export default GameLobby
