// frontend/src/utils/socket.js
import { io } from "socket.io-client";

// Shared socket instance
export const socket = io("http://localhost:5000", { autoConnect: false });
