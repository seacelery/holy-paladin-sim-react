import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import SimulationOptions from "./components/SimulationOptions/SimulationOptions";
import Footer from "./components/Footer/Footer";
import { VersionProvider } from "./context/VersionContext";
import { CharacterDataProvider } from "./context/CharacterDataContext"; 
import { SimulationParametersProvider } from "./context/SimulationParametersContext";
import { SocketProvider } from "./context/SocketContext";

const App = () => {
    const [theme, setTheme] = useState("paladin");

    useEffect(() => {
        setTheme(localStorage.getItem("theme") || "paladin");
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === "paladin" ? "plain" : "paladin";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    return (
        <>
            <SocketProvider>
                <VersionProvider>               
                    <Header theme={theme} toggleTheme={toggleTheme} />
                    <SimulationParametersProvider>
                        <CharacterDataProvider>
                            <SimulationOptions />
                        </CharacterDataProvider>
                    </SimulationParametersProvider>
                    <Footer />            
                </VersionProvider>
            </SocketProvider>
        </>
    );
};

export default App;
