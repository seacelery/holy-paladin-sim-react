import { io } from "socket.io-client";

const initialiseSocket = () => {
    const socket = io("http://localhost:5000/", {
        transports: ["websocket", "polling"],
    });

    socket.on("connect", function() {
        console.log("Connected to the server");
    });

    socket.on("disconnect", function() {
        console.log("Disconnected from the server");
    });

    socket.on("connect_error", (error) => {
        console.log("Connection failed:", error);
    });

    return socket;
};

export { initialiseSocket };