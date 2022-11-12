import { useState, useEffect } from "react"
import { io } from "socket.io-client"

const useSocket = (port) => {
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    setSocket(io(port))
  }, [])

  return { socket }
}

export default useSocket
