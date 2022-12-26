import { v4 as uuid } from "uuid"
import Card from "./Card"

const Board = ({ socket, game }) => {
  const cards = game.board?.map((card, index) => (
    <Card
      key={uuid()}
      card={card}
      gameOver={game.gameOver}
      clue={game.clue}
      handleClick={() => socket.emit("card-flipped", { index, game })}
    />
  ))

  return (
    <div className="board-container" style={{ minHeight: "406px" }}>
      {cards}
    </div>
  )
}

export default Board
