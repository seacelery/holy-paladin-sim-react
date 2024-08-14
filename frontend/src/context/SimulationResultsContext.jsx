import { createContext, useState } from "react";

const SimulationResultsContext = createContext();

const SimulationResultsProvider = ({ children }) => {
    const [simulationResults, setSimulationResults] = useState([]);

    return (
        <SimulationResultsContext.Provider value={{ simulationResults, setSimulationResults }}>
            {children}
        </SimulationResultsContext.Provider>
    );
};

export { SimulationResultsContext, SimulationResultsProvider };