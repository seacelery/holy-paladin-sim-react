import React, { useContext } from "react";
import "./SimulationResults.scss";
import SimulationResult from "./SimulationResult/SimulationResult";
import { SimulationResultsContext } from "../../context/SimulationResultsContext";

const SimulationResults = () => {
    const { simulationResults, setSimulationResults } = useContext(SimulationResultsContext);

    return <div className="simulation-results">
        {simulationResults.map((result, index) => {
            return <SimulationResult key={index} simulationResult={result} setSimulationResults={setSimulationResults} />;
        })}
    </div>;
};

export default SimulationResults;
