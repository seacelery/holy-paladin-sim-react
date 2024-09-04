import { io } from "socket.io-client";
import { CONFIG } from "./config";

const initialiseSocket = () => {
    console.log("CONFIG object:", CONFIG);
    console.log("backendUrl:", CONFIG.backendUrl);
    const socket = io(CONFIG.backendUrl, {
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