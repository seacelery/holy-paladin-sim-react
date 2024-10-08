import { io } from "socket.io-client";
import { CONFIG } from "./config";

const initialiseSocket = () => {
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

    socket.on("iteration_update", (data) => {
        console.log("Iteration update received:", data);
    });

    socket.on("simulation_complete", (data) => {
        console.log("Simulation complete event received:", data);
    });

    return socket;
};

export { initialiseSocket };