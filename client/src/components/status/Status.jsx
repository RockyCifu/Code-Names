const Status = ({ game, handleNewGame, handlePass }) => {
  const background = game.isRedTurn ? "red-background" : "blue-background"
  const guesses = !game.guessesRemaining ? "" : game.isRedTurn ? game.guessesRemaining.red : game.guessesRemaining.blue

  const getMessage = () => {
    if (game.gameOver) return game.clue ? <span>{game.clue}</span> : <span>"Welcome to Codenames!"</span>
    return game.clue ? (
      <>
        <span>CLUE: {game.clue}</span>
        <span>{game.usedBonus ? "Bonus!" : `GUESSES: ${guesses}`}</span>
      </>
    ) : (
      <span>{`Waiting on ${game.isRedTurn ? "Red" : "Blue"} Team's Spymaster`}</span>
    )
  }

  const getButton = () => {
    return game.gameOver ? (
      <button className={`end-turn-btn ${game.gameOver ? "transparent" : `${background}`}`} onClick={handleNewGame}>
        NEW GAME
      </button>
    ) : (
      <button className={`end-turn-btn ${background}`} onClick={() => handlePass(game)}>
        PASS
      </button>
    )
  }

  return (
    <>
      <div className={`game-status ${background}`}>
        <div className="red-status">
          <div className="img-container red-team"></div>
          <p>{game.score ? game.score.red : 0}</p>
        </div>
        <div className="end-turn-container">{getButton()}</div>
        <div className="blue-status">
          <p>{game.score ? game.score.blue : 0}</p>
          <div className="img-container blue-team"></div>
        </div>
      </div>
      <div className={`status-message ${game.gameOver ? "transparent" : `${background}`}`}>{getMessage()}</div>
    </>
  )
}

export default Status
