const isDevelopment = window.location.hostname === "localhost";

const CONFIG = {
    backendUrl: isDevelopment 
        ? "http://localhost:5000" 
        : 'https://holy-paladin-sim-react-5296562cb014.herokuapp.com'
};

export { CONFIG };