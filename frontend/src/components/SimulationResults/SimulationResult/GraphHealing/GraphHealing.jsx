import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { formatThousands } from "../../../../data/breakdown-functions";

const GraphHealing = ({ healingData, manaData, title, colour }) => {
    const svgRef = useRef(null);
    const containerRef = useRef(null);
    const [tooltipContent, setTooltipContent] = useState({ time: "", healing: 0, mana: 0 });
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    useEffect(() => {
        if (!svgRef.current || !containerRef.current) return;

        let healingDataArray = Object.keys(healingData).map(key => ({ key: +key, value: healingData[key] }));
        let manaDataArray = Object.keys(manaData).map(key => ({ key: +key, value: manaData[key] }));

        const createGraph = () => {
            const margin = { top: 30, right: 15, bottom: 75, left: 15 };
            const width = 1250 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            d3.select(svgRef.current).selectAll("*").remove();

            const svgContainer = d3
                .select(svgRef.current)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .style("background", "transparent");

            const svg = svgContainer
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            svg.append("text")
                .attr("x", width / 2)
                .attr("y", -26)
                .attr("text-anchor", "middle")
                .style("font-size", "1.6rem")
                .style("fill", "white");

            const formatTime = (seconds) => {
                let minutes = Math.floor(seconds / 60);
                let remainingSeconds = Math.round(seconds % 60);
        
                if (remainingSeconds === 60) {
                    minutes += 1;
                    remainingSeconds = 0;
                };
            
                return [minutes, remainingSeconds].map(t => String(t).padStart(2, '0')).join(':');
            };
        
            const x = d3.scaleLinear()
                .domain(d3.extent(healingDataArray, d => d.key))
                .range([0, width]);
                
            const y = d3.scaleLinear()
                .domain([0, d3.max(healingDataArray, d => d.value)])
                .range([height, 0]);
        
            const line = d3.line()
                .x(d => x(d.key))
                .y(d => y(d.value))
                .curve(d3.curveMonotoneX);
        
            svg.append("path")
                .datum(healingDataArray)
                .attr("fill", "none")
                .attr("stroke", `${colour}`)
                .attr("stroke-width", 1.5)
                .attr("d", line);
        
            const xAxisGroup = svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x).tickFormat(d => formatTime(d)));
        
            xAxisGroup.append("text")
                .attr("class", "axis-label")
                .attr("x", (width / 2) - 10)
                .attr("y", 51)
                .style("text-anchor", "middle")
                .style("font-size", "1.4rem")
                .text("Time");
        
            xAxisGroup.selectAll("line").style("stroke", "white");
            xAxisGroup.selectAll("path").style("stroke", "white");
            xAxisGroup.selectAll("text").style("fill", "white");
        
            const yRight = d3.scaleLinear()
                .domain([0, d3.max(manaDataArray, d => d.value)])
                .range([height, 0]);
        
            const manaLine = d3.line()
                .x(d => x(d.key))
                .y(d => yRight(d.value))
                .curve(d3.curveMonotoneX);
        
            svg.append("path")
                .datum(manaDataArray)
                .attr("fill", "none")
                .attr("stroke", "var(--mana)")
                .attr("stroke-width", 1.5)
                .attr("d", manaLine);
        
            const legendData = [
                { label: "Healing", color: "var(--healing-font)" },
                { label: "Mana", color: "var(--mana)" }
            ];
        
            const legend = svg.selectAll(".legend")
                .data(legendData)
                .enter().append("g")
                .attr("class", "legend")
                .attr("transform", (d, i) => "translate(0," + i * 20 + ")");
        
            legend.append("rect")
                .attr("x", width - 38)
                .attr("y", -10)
                .attr("width", 35)
                .attr("height", 1)
                .style("fill", d => d.color);
        
            legend.append("text")
                .attr("x", width - 44)
                .attr("y", -10)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .text(d => d.label)
                .style("fill", "white")
                .style("font-size", "12px");

            svgContainer.on("mousemove", function(event) {
                const [mouseX, mouseY] = d3.pointer(event);
                const containerRect = containerRef.current.getBoundingClientRect();

                const adjustedMouseX = mouseX - margin.left;
                const adjustedMouseY = mouseY - margin.top;

                if (adjustedMouseX >= 0 && adjustedMouseX <= width && adjustedMouseY >= 0 && adjustedMouseY <= height) {
                    const time = formatTime(x.invert(adjustedMouseX));
                    const healing = healingData[`${Math.round(x.invert(adjustedMouseX))}`];
                    const mana = manaData[`${Math.round(x.invert(adjustedMouseX))}`];

                    setTooltipContent({ time, healing, mana });
                    setTooltipPosition({ 
                        x: event.clientX - containerRect.left + 10, 
                        y: event.clientY - containerRect.top - 15 
                    });
                    setIsTooltipVisible(true);
                } else {
                    setIsTooltipVisible(false);
                }
            })
            .on("mouseout", function() { 
                setIsTooltipVisible(false);
            });
        };

        createGraph();
    }, [healingData, manaData, title, colour]);

    return (
        <div ref={containerRef} style={{ position: "relative" }}>
            <svg ref={svgRef}></svg>
            {isTooltipVisible && (
                <div
                    className="graph-tooltip"
                    style={{
                        position: "absolute",
                        left: `${tooltipPosition.x}px`,
                        top: `${tooltipPosition.y}px`,
                        opacity: 1,
                        zIndex: 10000,
                        pointerEvents: "none",
                        backgroundColor: "var(--panel-colour-2)",
                        padding: "0.5rem",
                        borderWidth: "0.1rem",
                        borderRadius: "0.3rem",
                        textAlign: "left",
                        fontSize: "1.4rem",
                        border: "1px solid var(--border-colour-3)"
                    }}
                >
                    <div className="tooltip-time">{tooltipContent.time}</div>
                    <div style={{ color: "var(--healing-font)" }}>{formatThousands(tooltipContent.healing)}</div>
                    <div style={{ color: "var(--mana)" }}>{formatThousands(tooltipContent.mana)}</div>
                </div>
            )}
        </div>
    );
};

export default GraphHealing;