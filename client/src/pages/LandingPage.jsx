import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { v4 as uuid } from "uuid"
import ExistingForm from "../components/landing/ExistingForm"
import NewForm from "../components/landing/NewForm"
import "./landingPage.css"

const LandingPage = ({ socket }) => {
  const [rooms, setRooms] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!socket) return
    socket.on("room-update", (data) => {
      setRooms((prev) => data)
    })
    socket.on("navigate-to-room", ({ roomId }) => {
      navigate(`/rooms/${roomId}`, { state: { redirect: true } })
    })
  }, [socket])

  const handleJoinRoom = (roomId) => {
    navigate(`/rooms/${roomId}`, { state: { redirect: true } })
  }

  const handleNewRoom = (roomName) => {
    socket.emit("create-room", { name: roomName, id: uuid() })
  }

  return (
    <div className="landing-page">
      <div className="landing-page__container">
        <div className="landing-page__image"></div>
        <div className="landing-page__content">
          <ExistingForm handleJoinRoom={handleJoinRoom} rooms={rooms} />
          <NewForm handleNewRoom={handleNewRoom} />
        </div>
      </div>
      <div className="title-block">
        <h1>CODENAMES</h1>
      </div>
    </div>
  )
}

export default LandingPage
