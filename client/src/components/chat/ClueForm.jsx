import useForm from "../../hooks/useForm"

const initialState = {
  clue: "",
  number: "",
}

const ClueForm = ({ socket, game }) => {
  const submitHandler = (values) => {
    const number = parseInt(values.number)
    const clue = values.clue.trim().split(" ")[0]
    if (number) {
      socket.emit("new-clue", { game, clue, number })
    }
  }

  const { values, handleSubmit, handleChange } = useForm(initialState, submitHandler)
  return (
    <form className="clue-form" onSubmit={handleSubmit} style={{ visibility: game.gameOver ? "hidden" : "visible" }}>
      <h2>Please Enter a Clue Below</h2>
      <div className="input-container">
        <div className="input-group">
          <input type="text" name="clue" placeholder="One Word Clue..." value={values.clue} onChange={handleChange} />
        </div>
        <div className="input-group">
          <input type="numeric" name="number" placeholder="How Many..." value={values.number} onChange={handleChange} />
        </div>
      </div>
      <input className={`clue-form-btn transparent`} type="submit" value={"SUBMIT"} />
    </form>
  )
}

export default ClueForm
