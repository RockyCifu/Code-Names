const Card = ({ card, handleClick, gameOver, clue }) => {
  return (
    <div className="card-container">
      <button
        className="card"
        onClick={handleClick}
        style={{ backgroundImage: `url(src/assets/${card.image})` }}
        disabled={card.image !== "word-tile.png" || gameOver || !clue ? true : false}>
        {card.image === "word-tile.png" && (
          <>
            <span>{card.word}</span>
            <span>{card.word}</span>
          </>
        )}
      </button>
    </div>
  )
}

export default Card
