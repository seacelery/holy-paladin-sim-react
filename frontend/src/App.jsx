import { act, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import SimulationOptions from "./components/SimulationOptions/SimulationOptions";
import Footer from "./components/Footer/Footer";
import { VersionProvider } from "./context/VersionContext";
import { CharacterDataProvider } from "./context/CharacterDataContext"; 
import { SimulationParametersProvider } from "./context/SimulationParametersContext";
import { SocketProvider } from "./context/SocketContext";

const App = () => {
    const [theme, setTheme] = useState("paladin");
    const [characterImported, setCharacterImported] = useState(false);
    const [activeTab, setActiveTab] = useState("Options");

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
                    <SimulationParametersProvider>
                        <CharacterDataProvider>
                            <Header theme={theme} toggleTheme={toggleTheme} setCharacterImported={setCharacterImported} setActiveTab={setActiveTab} />
                            <SimulationOptions characterImported={characterImported} setCharacterImported={setCharacterImported} activeTab={activeTab} setActiveTab={setActiveTab} />
                        </CharacterDataProvider>
                    </SimulationParametersProvider>
                    <Footer />            
                </VersionProvider>
            </SocketProvider>
        </>
    );
};

export default App;
