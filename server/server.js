import express from "express"
import http from "http"
import { Server } from "socket.io"

const app = express()
const PORT = 8000

const httpServer = http.createServer(app)
const io = new Server(httpServer, { cors: { origin: ["http://localhost:5173"] } })

io.on("connection", (socket) => {
  console.log("Connection Established!")

  socket.on("client-message", (data) => {
    socket.broadcast.emit("server-message", data)
  })

  socket.on("disconnect", (socket) => {
    console.log("User left")
  })
})

httpServer.listen(PORT, () => console.log("Server is running at http://localhost:8000"))
