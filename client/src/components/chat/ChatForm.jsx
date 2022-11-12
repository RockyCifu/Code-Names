import useForm from "../../hooks/useForm.jsx"

const initialState = {
  message: "",
}

const ChatForm = ({ socket, updateMessages }) => {
  const submitHandler = ({ message }) => {
    socket.emit("client-message", { message })
    updateMessages(message)
  }

  const { values, handleChange, handleSubmit } = useForm(initialState, submitHandler)

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="message">Message:</label>
        <input type="text" name="message" value={values.message} onChange={handleChange} />
      </div>
      <input type="submit" value="Send" />
    </form>
  )
}

export default ChatForm
