const MessageList = ({ messages }) => {
  const messageElements = messages.map(({ message, received }, index) => (
    <p style={{ textAlign: received ? "left" : "right" }} key={index}>
      {message}
    </p>
  ))

  return <div className="chat-box">{messageElements}</div>
}

export default MessageList
