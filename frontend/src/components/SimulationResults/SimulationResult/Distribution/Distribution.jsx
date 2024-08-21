import React from "react";
import "./Distribution.scss";
import BellCurveBarChart from "./BellCurveBarChart/BellCurveBarChart";

const Distribution = ({ simulationResult }) => {
    const distributionData = simulationResult.results.healing_distribution;

    return <div className="breakdown-container">
        <div className="distribution-breakdown-graph-container">
            <BellCurveBarChart data={distributionData} title="HPS" colour="var(--rarity-epic)" />
        </div>
    </div>;
};

export default Distribution;
