"use client";
import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000/socket-connect");

export default function App() {
useEffect(() =>{
  socket.on("connection", () => {
    
  })
}, [])



  return <div className="App">My Chat</div>;
}
