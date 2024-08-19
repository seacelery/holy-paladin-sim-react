import React from "react";
import "./Stats.scss";

const Stats = ({ stats }) => {
    return <div className="timeline-grid-cell">
        <div className="timeline-stat-container" style={{ color: "var(--stat-intellect)" }}>
            <span className="timeline-stat-name">Intellect</span>
            <span className="timeline-stat-rating">{Math.round(stats.intellect.intellect)}</span>
        </div>

        <div className="timeline-stat-container" style={{ color: "var(--stat-haste)" }}>
            <span className="timeline-stat-name">Haste</span>
            <span className="timeline-stat-rating">{Math.round(stats.haste.haste_rating)}</span>
            <span className="timeline-stat-divider">/</span>
            <span className="timeline-stat-percentage">{stats.haste.haste.toFixed(2)}%</span>
        </div>

        <div className="timeline-stat-container" style={{ color: "var(--stat-crit)" }}>
            <span className="timeline-stat-name">Crit</span>
            <span className="timeline-stat-rating">{Math.round(stats.crit.crit_rating)}</span>
            <span className="timeline-stat-divider">/</span>
            <span className="timeline-stat-percentage">{stats.crit.crit.toFixed(2)}%</span>
        </div>

        <div className="timeline-stat-container" style={{ color: "var(--stat-mastery)" }}>
            <span className="timeline-stat-name">Mastery</span>
            <span className="timeline-stat-rating">{Math.round(stats.mastery.mastery_rating)}</span>
            <span className="timeline-stat-divider">/</span>
            <span className="timeline-stat-percentage">{stats.mastery.mastery.toFixed(2)}%</span>
        </div>

        <div className="timeline-stat-container" style={{ color: "var(--stat-versatility)" }}>
            <span className="timeline-stat-name">Versatility</span>
            <span className="timeline-stat-rating">{Math.round(stats.versatility.versatility_rating)}</span>
            <span className="timeline-stat-divider">/</span>
            <span className="timeline-stat-percentage">{stats.versatility.versatility.toFixed(2)}%</span>
        </div>
    </div>;
};

export default Stats;
