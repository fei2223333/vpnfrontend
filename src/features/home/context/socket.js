import React, { createContext, useContext } from 'react';
import io, { Socket } from 'socket.io-client';

// const SOCKET_URL = 'wss://vpnbackend.herokuapp.com';
const SOCKET_URL = 'ws://vpnbackend.herokuapp.com/';
export let socket = io(SOCKET_URL, {
  transports: ['websocket'],
});

socket.on("disconnect", () => {
  console.log(`socket has disconnected`); // undefined
});

export const SocketContext = createContext(socket);
console.log(socket.id);

export const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);

export const useSocket = () => {
  const context = useContext(SocketContext);
  return context;
};