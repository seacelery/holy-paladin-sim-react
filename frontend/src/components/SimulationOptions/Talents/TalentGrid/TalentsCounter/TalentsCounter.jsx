import React from "react";
import "./TalentsCounter.scss";

const TalentsCounter = ({ currentCount, maxCount }) => {
    return (
        <div className="talents-counter">
            <div
                className={`talents-count ${
                    currentCount === maxCount
                        ? "talents-count-perfect"
                        : currentCount > maxCount
                        ? "talents-count-exceeded"
                        : ""
                }`}
            >
                {currentCount}
            </div>
            <div
                className={`talents-total ${
                    currentCount === maxCount
                        ? "talents-count-perfect"
                        : currentCount > maxCount
                        ? "talents-count-exceeded"
                        : ""
                }`}
            >
                / {maxCount}
            </div>
        </div>
    );
};

export default TalentsCounter;
