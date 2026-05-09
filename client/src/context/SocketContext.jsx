import {
  createContext,
  useContext,
} from "react";

import { io } from "socket.io-client";

// Create socket connection
const socket = io("http://localhost:5000");

// Create context
const SocketContext = createContext();

// Provider
export const SocketProvider = ({
  children,
}) => {

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook
export const useSocket = () => {
  return useContext(SocketContext);
};