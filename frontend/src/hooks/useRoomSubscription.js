// src/hooks/useRoomSubscription.js
import { useEffect } from "react";
import { useSocket } from "../context/SocketContext";

/**
 * Subscribe to a socket room and optionally listen for events.
 *
 * @param {string} roomId - The room to join.
 * @param {string} [event] - The event name to listen for.
 * @param {(data:any) => void} [handler] - Callback for event payload.
 * @param {object} [options] - Extra options
 * @param {boolean} [options.leaveOnUnmount] - Whether to send leaveRoom on cleanup.
 */
export function useRoomSubscription(roomId, event, handler, options = {}) {
  const socket = useSocket();

  useEffect(() => {
    if (!socket || !roomId) return;

    console.log(`🔌 Joining room: ${roomId}`);
    socket.emit("joinRoom", roomId);

    if (event && handler) {
      socket.on(event, handler);
      console.log(`👂 Subscribed to ${event} in room ${roomId}`);
    }

    return () => {
      if (event && handler) {
        socket.off(event, handler);
        console.log(`❌ Unsubscribed from ${event} in room ${roomId}`);
      }
      if (options.leaveOnUnmount) {
        socket.emit("leaveRoom", roomId);
        console.log(`👋 Left room ${roomId}`);
      }
    };
  }, [socket, roomId, event, handler, options.leaveOnUnmount]);
}

//C:\Users\gupta\Documents\DailyToolbox\frontend\src\hooks\useRoomSubscription.js