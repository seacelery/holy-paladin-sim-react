import { createContext, useEffect, useState } from "react";

const VersionContext = createContext();

const VersionProvider = ({ children }) => {
    const [version, setVersion] = useState("live");

    useEffect(() => {
        setVersion(localStorage.getItem("version") || "live");
        document.documentElement.setAttribute("data-version", version);
    }, [version]);

    const changeVersion = (newVersion) => {
        setVersion(newVersion);
        localStorage.setItem("version", newVersion);
    };

    return (
        <VersionContext.Provider value={{ version, changeVersion }}>
            {children}
        </VersionContext.Provider>
    );
};

export { VersionContext, VersionProvider };