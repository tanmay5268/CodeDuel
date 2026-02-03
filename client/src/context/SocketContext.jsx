import { io } from "socket.io-client";
import React, { createContext, useContext, useState, useCallback } from "react";


const SocketContext = createContext(null);

export function SocketProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(null);

    const initializeSocket = useCallback(() => {
        if (socket) {
            console.log("Socket already exists, reusing it");
            return socket;
        }

        if (isConnecting) {
            console.log("Socket connection already in progress");
            return;
        }

        setIsConnecting(true);
        setError(null);

        try {
            const newSocket = io("http://localhost:3001", {
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                reconnectionAttempts: 5
            });

            newSocket.on("connect", () => {
                console.log("Socket connected with ID:", newSocket.id);
                setIsConnecting(false);
            });

            newSocket.on("disconnect", () => {
                console.log("Socket disconnected");
            });

            newSocket.on("error", (error) => {
                console.error("Socket error:", error);
                setError(error);
            });

            newSocket.on("connect_error", (error) => {
                console.error("Socket connection error:", error);
                setError(error);
            });

            setSocket(newSocket);
            console.log("Socket initialized successfully");

            return newSocket;
        } catch (err) {
            console.error("Error creating socket:", err);
            setError(err);
            setIsConnecting(false);
            return null;
        }
    }, [socket, isConnecting]);

    const disconnectSocket = useCallback(() => {
        if (socket) {
            socket.disconnect();
            setSocket(null);
            console.log("Socket disconnected");
        }
    }, [socket]);

    const value = {
        socket,
        initializeSocket,
        disconnectSocket,
        isConnecting,
        error
    };

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
}

export function useSocket() {
    const context = useContext(SocketContext);

    if (!context) {
        throw new Error(
            "useSocket must be used within a SocketProvider. Make sure your entire app is wrapped with <SocketProvider>"
        );
    }

    return context;
}