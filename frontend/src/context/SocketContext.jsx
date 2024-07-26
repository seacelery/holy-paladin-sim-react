import React, { createContext, useState, useEffect } from "react";
import { initialiseSocket } from "../config/socket-config";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(initialiseSocket());
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export { SocketContext, SocketProvider };