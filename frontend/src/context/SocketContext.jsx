// frontend/src/context/SocketContext.jsx
import React, { createContext, useContext, useEffect } from "react";
import io from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const socket = io("http://localhost:5000", {
    transports: ["websocket"],
  });

  useEffect(() => {
    console.log("[SocketProvider] Connected:", socket.id);

    return () => {
      console.log("[SocketProvider] Disconnecting socket...");
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\context\SocketContext.jsx