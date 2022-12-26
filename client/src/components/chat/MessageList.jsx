const MessageList = ({ messages }) => {
  const messageElements = messages.map(({ message, received }, index) => (
    <p className={received ? "server-message" : "my-message"} key={index}>
      {message}
    </p>
  ))

  return <div className="chat-box">{messageElements}</div>
}

export default MessageList
