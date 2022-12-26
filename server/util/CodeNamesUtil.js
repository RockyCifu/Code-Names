import { words } from "../assets/words.js"
import { keyArray } from "../assets/keyArray.js"

class CodeNamesUtil {
  static createNewGame = (data) => {
    return {
      board: CodeNamesUtil.createNewBoard(),
      redTeam: [],
      blueTeam: [],
      spyMasters: { red: "", blue: "" },
      score: data.wasRedFirst ? { red: 8, blue: 9 } : { red: 9, blue: 8 },
      clue: null,
      guessesRemaining: { red: 0, blue: 0 },
      gameOver: false,
      wasRedFirst: data.wasRedFirst ? false : true,
      isRedTurn: data.wasRedFirst ? false : true,
      usedBonus: false,
    }
  }

  static createNewBoard = () => {
    const wordSet = new Set()
    while (wordSet.size < 25) wordSet.add(words[Math.floor(Math.random() * words.length)])
    return [...wordSet].map((word) => ({ word, flipped: false, image: "word-tile.png" }))
  }

  static createNewKey = (doubleAgentColor) => {
    return [...keyArray, doubleAgentColor].sort(() => Math.random() - 0.5)
  }

  static printKey = (keys) => {
    let result = ``
    for (let i = 1; i <= keys.length; i++) {
      result += keys[i - 1] + " "
      if (i % 5 === 0) {
        result += "\n"
      }
    }
    console.log(result)
  }

  static getImage = (key) => {
    const randomPic = Math.floor(Math.random() * 2) + 1
    if (key === "assassin") return "assassin.png"
    else if (key === "bystander") return `bystander-${randomPic}.png`
    else if (key === "red") return `red-agent-${randomPic}.png`
    else if (key === "blue") return `blue-agent-${randomPic}.png`
    else return "word-tile.png"
  }

  static handleSelection = (game, selection) => {
    if (selection === "assassin") {
      return CodeNamesUtil.handleAssassin(game)
    } else if (selection === "bystander") {
      return CodeNamesUtil.handleBystander(game)
    } else if (selection === "red") {
      return game.isRedTurn ? CodeNamesUtil.handleCorrect(game) : CodeNamesUtil.handleWrong(game)
    } else if (selection === "blue") {
      return game.isRedTurn ? CodeNamesUtil.handleWrong(game) : CodeNamesUtil.handleCorrect(game)
    } else {
      return ""
    }
  }

  static endTurn = (game) => {
    return { ...game, clue: null, isRedTurn: !game.isRedTurn, usedBonus: false }
  }

  static handleAssassin = (game) => {
    return { ...game, gameOver: true, clue: `Game Over ${game.isRedTurn ? "Blue" : "Red"} Team Wins!` }
  }

  static handleBystander = (game) => {
    const whosTurn = game.isRedTurn ? "red" : "blue"
    const guessesRemaining = { ...game.guessesRemaining, [whosTurn]: 0 }
    return this.endTurn({ ...game, guessesRemaining })
  }

  static handleCorrect = (game) => {
    const teamToDecrement = game.isRedTurn ? "red" : "blue"
    const updatedGame = this.checkForWinner({
      ...game,
      score: { ...game.score, [teamToDecrement]: game.score[teamToDecrement] - 1 },
    })
    if (updatedGame.gameOver) {
      return updatedGame
    }

    const lastGuess = game.guessesRemaining[teamToDecrement] === 1

    if (!lastGuess) {
      const currentRemaining = { ...updatedGame.guessesRemaining }
      const guessesRemaining = { ...currentRemaining, [teamToDecrement]: currentRemaining[teamToDecrement] - 1 }
      return { ...updatedGame, guessesRemaining }
    } else if (lastGuess && game.usedBonus) {
      const guessesRemaining = { ...updatedGame.guessesRemaining, [teamToDecrement]: 0 }
      return this.endTurn({ ...updatedGame, guessesRemaining })
    } else {
      return { ...updatedGame, usedBonus: true }
    }
  }

  static handleWrong = (game) => {
    const teamToDecrement = game.isRedTurn ? "blue" : "red"
    const whosTurn = game.isRedTurn ? "red" : "blue"
    const score = { ...game.score, [teamToDecrement]: game.score[teamToDecrement] - 1 }
    const guessesRemaining = { ...game.guessesRemaining, [whosTurn]: 0 }
    const updatedGame = this.checkForWinner({ ...game, score, guessesRemaining })
    return updatedGame.gameOver ? updatedGame : this.endTurn(updatedGame)
  }

  static handlePass = (game) => {
    const teamThatPassed = game.isRedTurn ? "red" : "blue"
    const guessesRemaining = game.guessesRemaining[teamThatPassed] > 0 ? 1 : 0
    return this.endTurn({ ...game, guessesRemaining: { ...game.guessesRemaining, [teamThatPassed]: guessesRemaining } })
  }

  static updateBoard = (board, imageKey, index) => {
    board[parseInt(index)] = { ...board[parseInt(index)], flipped: true, image: CodeNamesUtil.getImage(imageKey) }
    return board
  }

  static checkForWinner = (game) => {
    if (game.score.red === 0 || game.score.blue === 0) {
      const teamThatWon = game.score.red === 0 ? "Red" : "Blue"
      return { ...game, gameOver: true, clue: `Game Over ${teamThatWon} Team Wins!` }
    }
    return game
  }
}

export default CodeNamesUtil
