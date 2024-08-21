import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "./GraphBuffs.scss";

const GraphBuffs = ({ data, title, colour, awakening = false, awakeningTriggers = null, encounterLength = null }) => {
    const svgRef = useRef(null);
    const containerRef = useRef(null);
    const [tooltipContent, setTooltipContent] = useState({ time: "", count: 0 });
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    useEffect(() => {
        if (!svgRef.current || !containerRef.current || !data) return;

        const buffCountDataArray = Object.keys(data).map(key => ({ key: +key, value: data[key] }));

        const createGraph = () => {
            const margin = { top: 60, right: 20, bottom: 55, left: 65 };
            const width = 600 - margin.left - margin.right;
            const height = 300 - margin.top - margin.bottom;

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
                .style("font-size", "1.4rem")
                .style("fill", "white")
                .text(`${title} Count`);

            const formatTime = (seconds) => {
                let minutes = Math.floor(seconds / 60);
                let remainingSeconds = Math.round(seconds % 60);

                if (remainingSeconds === 60) {
                    minutes += 1;
                    remainingSeconds = 0;
                }

                return [minutes, remainingSeconds].map(t => String(t).padStart(2, '0')).join(':');
            };

            const x = d3.scaleLinear()
                .domain(d3.extent(buffCountDataArray, d => d.key))
                .range([0, width]);

            const y = d3.scaleLinear()
                .domain([0, d3.max(buffCountDataArray, d => d.value)])
                .range([height, 0]);

            const line = d3.line()
                .x(d => x(d.key))
                .y(d => y(d.value))
                .curve(d3.curveMonotoneX);

            svg.append("path")
                .datum(buffCountDataArray)
                .attr("fill", "none")
                .attr("stroke", colour)
                .attr("stroke-width", 1.5)
                .attr("d", line)

            const xAxisGroup = svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x).tickFormat(d => formatTime(d)));

            xAxisGroup.append("text")
                .attr("class", "axis-label")
                .attr("x", (width / 2) - 10)
                .attr("y", 41)
                .style("text-anchor", "middle")
                .text("Time")
                .style("font-size", "1.4rem");

            xAxisGroup.selectAll("line").style("stroke", "white");
            xAxisGroup.selectAll("path").style("stroke", "white");
            xAxisGroup.selectAll("text").style("fill", "white");

            const yAxisGroup = svg.append("g")
                .call(d3.axisLeft(y));

            yAxisGroup.append("text")
                .attr("class", "axis-label")
                .attr("transform", "rotate(-90)")
                .attr("x", -height / 2)
                .attr("y", -35)
                .style("text-anchor", "middle")
                .text("Count")
                .style("font-size", "1.4rem");

            yAxisGroup.selectAll("line").style("stroke", "white");
            yAxisGroup.selectAll("path").style("stroke", "white");
            yAxisGroup.selectAll("text").style("fill", "white");

            svgContainer.on("mousemove", function(event) {
                const [mouseX, mouseY] = d3.pointer(event);
                const containerRect = containerRef.current.getBoundingClientRect();

                const adjustedMouseX = mouseX - margin.left;
                const adjustedMouseY = mouseY - margin.top;

                if (adjustedMouseX >= 0 && adjustedMouseX <= width && adjustedMouseY >= 0 && adjustedMouseY <= height) {
                    const time = formatTime(x.invert(adjustedMouseX));
                    const count = data[`${Math.round(x.invert(adjustedMouseX))}`];

                    setTooltipContent({ time, count });
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

            if (awakening && awakeningTriggers) {
                const findPeakIntervals = (data, cooldownPeriod, iterations) => {
                    let interval = 65;
                    let previousPeak = 0;
                    let peaks = [];               
                
                    while (previousPeak <= encounterLength) {
                        let filteredEntries = Object.entries(data)
                            .filter(([key, _]) => Number(key) <= interval && Number(key) > previousPeak + cooldownPeriod);
                
                        if (filteredEntries.length === 0) {
                            interval += 65;
                            if (interval > encounterLength) {
                                break;
                            };
                            continue;
                        };
                
                        let highestValueEntry = filteredEntries.reduce((prev, current) => {
                            return (prev[1] > current[1]) ? prev : current;
                        }, [null, -Infinity]);
                
                        let keyWithHighestValue = Number(highestValueEntry[0]);

                        if (highestValueEntry[1] >= iterations * 0.01) {
                            peaks.push({ key: keyWithHighestValue });
                        };
                
                        previousPeak = keyWithHighestValue;
                        interval = keyWithHighestValue + Math.max(65, keyWithHighestValue - previousPeak);
                    };
                    return peaks;
                };

                const cooldownPeriod = 30;
                const iterations = 100; // You might want to make this a prop or state
                const peaks = findPeakIntervals(awakeningTriggers, cooldownPeriod, iterations);

                peaks.forEach(point => {
                    svg.append("line")
                        .attr("x1", x(point.key))
                        .attr("x2", x(point.key))
                        .attr("y1", y(point.value))
                        .attr("y2", height)
                        .attr("stroke", "var(--healing-font)")
                        .attr("stroke-width", 1);
                });
            };
        };

        createGraph();
    }, [data, title, colour, awakening, awakeningTriggers]);

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
                    <div style={{ color: colour }}>{Math.round(tooltipContent.count * 10) / 10}</div>
                </div>
            )}
        </div>
    );
};

export default GraphBuffs;