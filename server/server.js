import express from "express"
import http from "http"
import { Server } from "socket.io"
import CodeNamesUtil from "./util/CodeNamesUtil.js"

const app = express()
const PORT = 8000

const httpServer = http.createServer(app)
const io = new Server(httpServer, { cors: { origin: ["http://localhost:5173"] } })

const rooms = []
let key = null

io.on("connection", (socket) => {
  socket.emit("room-update", rooms)

  socket.on("join-room", (data) => {
    socket.join(data.id)
    socket.to(data.id).emit("new-member", `${socket.id} joined the room`)
  })

  socket.on("create-room", (data) => {
    rooms.push(data)
    io.emit("room-update", rooms)
    socket.emit("navigate-to-room", { roomId: data.id })
  })

  socket.on("client-message", (data) => {
    socket.broadcast.emit("server-message", data)
  })

  socket.on("new-game", (data) => {
    key = CodeNamesUtil.createNewKey(data.wasRedFirst ? "blue" : "red")
    CodeNamesUtil.printKey(key)
    io.emit("new-game", CodeNamesUtil.createNewGame(data))
  })

  socket.on("card-flipped", ({ index, game }) => {
    const updatedGame = CodeNamesUtil.handleSelection(game, key[index])
    updatedGame.board = CodeNamesUtil.updateBoard(game.board, key[index], index)
    io.emit("game-update", updatedGame)
  })

  socket.on("new-clue", ({ game, clue, number }) => {
    const teamToAddGuesses = game.isRedTurn ? "red" : "blue"
    const newGuesses = {
      ...game.guessesRemaining,
      [teamToAddGuesses]: game.guessesRemaining[teamToAddGuesses] + number,
    }
    io.emit("game-update", { ...game, clue: clue + " " + number, guessesRemaining: newGuesses })
  })

  socket.on("team-passed", ({ game }) => {
    io.emit("game-update", CodeNamesUtil.handlePass(game))
  })

  socket.on("disconnect", () => {})
})

httpServer.listen(PORT, () => console.log("Server is running at http://localhost:8000"))
