import React, { useState, useEffect, useRef } from "react";
import "./Timeline.scss";
import HeaderRow from "./HeaderRow/HeaderRow";
import GridRow from "./GridRow/GridRow";
import FilterModal from "./FilterModal/FilterModal";
import { generatorCooldownsRow, majorCooldownsRow } from "../../../../data/breakdown-objects";

const Timeline = ({ simulationResult, setSimulationResults }) => {
    const [visibleRows, setVisibleRows] = useState([]);
    const [currentEndIndex, setCurrentEndIndex] = useState(0);

    const [filteredAuras, setFilteredAuras] = useState([]);
    const [filteredCooldowns, setFilteredCooldowns] = useState([]);
    const [filterModalOpen, setFilterModalOpen] = useState(null);
    
    const generateAllAuras = (priorityBreakdown) => {
        const auras = new Set();
    
        for (const timestamp in priorityBreakdown) {
            const playerAuras = priorityBreakdown[timestamp].player_active_auras;
            Object.keys(playerAuras).forEach(aura => auras.add(aura));
        };
    
        return Array.from(auras);
    };


    const allAuras = generateAllAuras(simulationResult.results.priority_breakdown);
    const allCooldowns = [generatorCooldownsRow, majorCooldownsRow].flat();

    const timelineRef = useRef(null);
    const headers = ["Time", "Spell", "Resources", "Player Auras", "Target Auras", "Cooldowns", "Counts", "Stats"];
    const timelineData = Object.entries(simulationResult.results.priority_breakdown);
    
    const rowHeight = 118;
    const buffer = 9;

    const handleScroll = () => {
        if (!timelineRef.current) return;

        const { scrollTop, clientHeight } = timelineRef.current;
        const visibleRowCount = Math.ceil(clientHeight / rowHeight);
        const totalRows = timelineData.length;

        const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - buffer);
        const endIndex = Math.min(totalRows - 1, startIndex + visibleRowCount + buffer);

        if (scrollTop === 0) {
            const newEndIndex = Math.ceil(clientHeight / rowHeight) + buffer - 1;
            setVisibleRows(timelineData.slice(0, newEndIndex + 1));
            setCurrentEndIndex(newEndIndex);
            return;
        }

        if (endIndex > currentEndIndex) {
            setVisibleRows(prev => {
                const lastVisibleTime = prev[prev.length - 1][0];
                const lastVisibleIndex = timelineData.findIndex(row => row[0] === lastVisibleTime);
                const newRows = timelineData.slice(lastVisibleIndex + 1, endIndex + 1);
                return [...prev, ...newRows];
            });
            setCurrentEndIndex(endIndex);
        }
    };

    useEffect(() => {
        handleScroll();
    }, []);

    useEffect(() => {
        const timeline = timelineRef.current;
        if (timeline) {
            timeline.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (timeline) {
                timeline.removeEventListener("scroll", handleScroll);
            }
        };
    }, [timelineData]);

    return (
        <div className="breakdown-container">
            <div className="timeline-grid-container">
                <div className="timeline-header-grid">
                    <HeaderRow headers={headers} filterModalOpen={filterModalOpen} setFilterModalOpen={setFilterModalOpen} allAuras={allAuras} filteredAuras={filteredAuras} setFilteredAuras={setFilteredAuras} allCooldowns={allCooldowns} filteredCooldowns={filteredCooldowns} setFilteredCooldowns={setFilteredCooldowns} />
                </div>
                <div className="timeline-body-grid" ref={timelineRef}>
                    {visibleRows.map(([time, data]) => (
                        <GridRow 
                            key={time} 
                            time={time} 
                            timelineData={data} 
                            simulationResult={simulationResult}
                            filteredAuras={filteredAuras}
                            filteredCooldowns={filteredCooldowns}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timeline;

// const handleScroll = () => {
//     if (!timelineRef.current) return;

//     const { scrollTop, clientHeight } = timelineRef.current;
//     const visibleRowCount = Math.ceil(clientHeight / rowHeight);
//     const totalRows = timelineData.length;

//     const startIndex = Math.max(0, Math.floor((scrollTop + addedScrollTop) / rowHeight) - buffer);
//     const endIndex = Math.min(totalRows - 1, startIndex + visibleRowCount + buffer);

//     if (scrollTop === 0) {
//         const newEndIndex = Math.ceil(clientHeight / rowHeight) + buffer - 1;
//         setVisibleRows(timelineData.slice(0, newEndIndex + 1));
//         setCurrentEndIndex(newEndIndex);
//         return;
//     }

//     if (endIndex > currentEndIndex) {
//         setVisibleRows(prev => {
//             const lastVisibleTime = prev[prev.length - 1][0];
//             const lastVisibleIndex = timelineData.findIndex(row => row[0] === lastVisibleTime);
        
//             const newRows = timelineData.slice(lastVisibleIndex + 1, endIndex + 1);
//             const rowsToRemove = newRows.length;
        
//             if (rowsToRemove > 0) {
//                 const newAddedScrollTop = addedScrollTop + rowsToRemove * rowHeight;
//                 setAddedScrollTop(newAddedScrollTop);
//             };
            
//             return [...prev.slice(rowsToRemove), ...newRows];
//         });
//         setCurrentEndIndex(endIndex);
//     }
// };