import React, { useState } from "react";
import axios from "axios";
import socket from "../../socket";

import "./style.css";

function JoinForm() {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");

  const onEnter = () => {
    if (!roomId || !userName) {
      return alert("Incorrect values");
    }
    axios.post("/rooms", {
      roomId,
      userName,
    });
  };

  return (
    <form className="join">
      <input placeholder="RoomId" type="text" value={roomId} onChange={(event) => setRoomId(event.target.value)} />
      <input placeholder="Name" type="text" value={userName} onChange={(event) => setUserName(event.target.value)} />
      <button onClick={onEnter} className="btn btn-success" type="button">
        Enter
      </button>
    </form>
  );
}

export default JoinForm;
