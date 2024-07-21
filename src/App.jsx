import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import SimulationOptions from "./components/SimulationOptions/SimulationOptions";
import { VersionProvider } from "./context/VersionContext";

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
            <VersionProvider>
                <Header theme={theme} toggleTheme={toggleTheme} />
                <SimulationOptions />
            </VersionProvider>
        </>
    );
};

export default App;
