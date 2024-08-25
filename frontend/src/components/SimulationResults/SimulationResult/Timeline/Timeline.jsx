import React, { useState, useCallback, useRef, useMemo } from "react";
import { VariableSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import "./Timeline.scss";
import HeaderRow from "./HeaderRow/HeaderRow";
import GridRow from "./GridRow/GridRow";
import { generatorCooldownsRow, majorCooldownsRow } from "../../../../data/breakdown-objects";

const Timeline = ({ simulationResult, setSimulationResults }) => {
    const [filteredAuras, setFilteredAuras] = useState([]);
    const [filteredCooldowns, setFilteredCooldowns] = useState([]);
    const [filterModalOpen, setFilterModalOpen] = useState(null);
    
    const listRef = useRef();

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

    const headers = ["Time", "Spell", "Resources", "Player Auras", "Target Auras", "Cooldowns", "Counts", "Stats"];
    const timelineData = Object.entries(simulationResult.results.priority_breakdown);

    const rowHeights = useMemo(() => {
        return timelineData.map(([, data]) => {
            const auraCount = Object.keys(data.player_active_auras).length;
            if (auraCount <= 12) return 118;
            return 118 + Math.ceil((auraCount - 12) / 6) * 52.5;
        });
    }, [timelineData]);

    const getItemSize = index => rowHeights[index];

    const Row = useCallback(({ index, style }) => {
        const [time, data] = timelineData[index];
        return (
            <div style={style} className="timeline-row-wrapper">
                <GridRow 
                    time={time} 
                    timelineData={data} 
                    simulationResult={simulationResult}
                    filteredAuras={filteredAuras}
                    filteredCooldowns={filteredCooldowns}
                />
            </div>
        );
    }, [timelineData, simulationResult, filteredAuras, filteredCooldowns]);

    return (
        <div className="breakdown-container">
            <div className="timeline-grid-container">
                <div className="timeline-header-grid">
                    <HeaderRow 
                        headers={headers} 
                        filterModalOpen={filterModalOpen} 
                        setFilterModalOpen={setFilterModalOpen} 
                        allAuras={allAuras} 
                        filteredAuras={filteredAuras} 
                        setFilteredAuras={setFilteredAuras} 
                        allCooldowns={allCooldowns} 
                        filteredCooldowns={filteredCooldowns} 
                        setFilteredCooldowns={setFilteredCooldowns} 
                    />
                </div>
                <div className="timeline-body-grid">
                    <AutoSizer>
                        {({ height, width }) => (
                            <List
                                ref={listRef}
                                height={height}
                                width={width}
                                itemCount={timelineData.length}
                                itemSize={getItemSize}                
                                className="timeline-list"
                            >
                                {Row}
                            </List>
                        )}
                    </AutoSizer>
                </div>
            </div>
        </div>
    );
};

export default Timeline;