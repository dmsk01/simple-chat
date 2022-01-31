import React from "react";
import socket from "../socket";

function Chat({ users, messages, userName, roomId, onAddMessage }) {
  const [messageValue, setMessageValue] = React.useState("");
  const messagesRef = React.useRef(null);
  const onSendMessage = () => {
    socket.emit("ROOM:NEW_MESSAGE", {
      userName,
      roomId,
      text: messageValue,
    });
    onAddMessage({ userName, text: messageValue });
    setMessageValue("");
  };

  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  return (
    <div className="chat">
      <div className="chat-users">
        Комната: <b>{roomId}</b>
        <hr />
        <b>Онлайн ({users.length}):</b>
        <ul>
          {users.map((name, index) => (
            <li key={name + index}>{name}</li>
          ))}
        </ul>
      </div>
      <div className="chat-messages">
        <div ref={messagesRef} className="messages">
          {messages.map((message) => (
            <div key={message.text} className={`message ${message.userName === userName ? "my" : ""}`}>
              <p>{message.text}</p>
              <span>{message.userName}</span>
            </div>
          ))}
        </div>
        <form className="form">
          <input value={messageValue} onChange={(e) => setMessageValue(e.target.value)} className="form-control"></input>
          <button onClick={messageValue && onSendMessage} type="button" className="button-send">
            <svg width="{18}" height="{18}" viewBox="0 0 18 18" fill="#666" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.1914 8.74414L0.853488 0.552733C0.787081 0.51953 0.710909 0.511717 0.638644 0.529295C0.472628 0.570311 0.369112 0.73828 0.410128 0.906248L2.09372 7.78515C2.11911 7.88867 2.19528 7.97265 2.29685 8.00586L5.18161 8.99609L2.2988 9.98633C2.19724 10.0215 2.12107 10.1035 2.09763 10.207L0.410128 17.0957C0.39255 17.168 0.400363 17.2441 0.433566 17.3086C0.509738 17.4629 0.697238 17.5254 0.853488 17.4492L17.1914 9.30469C17.2519 9.27539 17.3008 9.22461 17.332 9.16601C17.4082 9.00976 17.3457 8.82226 17.1914 8.74414ZM2.33591 15.1387L3.31833 11.123L9.08396 9.14453C9.12888 9.12891 9.16599 9.09375 9.18161 9.04687C9.20896 8.96484 9.16599 8.87695 9.08396 8.84765L3.31833 6.87109L2.33982 2.87109L14.6054 9.02148L2.33591 15.1387Z" fill="#666" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
