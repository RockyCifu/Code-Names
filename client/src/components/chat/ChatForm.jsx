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
    <form className="chat-form" onSubmit={handleSubmit}>
      <div className="chat-input-container">
        <input
          type="text"
          name="message"
          value={values.message}
          onChange={handleChange}
          placeholder="Type Message ..."
        />
        <button>
          <img src="send-message.png" alt="Send Button" />
        </button>
      </div>
    </form>
  )
}

export default ChatForm
