import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { formatThousands } from '../../../../../data/breakdown-functions';

const BellCurveBarChart = ({ data, title, colour }) => {
    const svgRef = useRef(null);
    const containerRef = useRef(null);
    const [tooltipContent, setTooltipContent] = useState('');
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);

    useEffect(() => {
        if (!svgRef.current || !containerRef.current) return;

        const values = Object.values(data);
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values) + 100;

        const numIntervals = 50;
        const range = maxValue - minValue;
        const intervalWidth = range / numIntervals;
        const intervalCounts = Array(numIntervals).fill(0);

        values.forEach(value => {
            const intervalIndex = Math.floor((value - minValue) / intervalWidth);
            intervalCounts[intervalIndex]++;
        });

        const intervals = Array.from({ length: numIntervals }, (_, i) => {
            const intervalMin = minValue + i * intervalWidth;
            const intervalMax = i === numIntervals ? maxValue + 1 : intervalMin + intervalWidth;
            return { interval: `${formatThousands(intervalMin)} - ${formatThousands(intervalMax)}`, count: intervalCounts[i] };
        });

        const percentileBrackets = intervals.map(interval => {
            const intervalMax = parseFloat(interval.interval.split(" - ")[1].replace(/,/g, ''));
            const percentiles = [0.25, 0.53, 0.75, 0.95, 0.989, 0.999];
            const percentileValues = percentiles.map(p => d3.quantile(values.sort((a, b) => a - b), p));
            
            let intervalPercentile;
            if (intervalMax <= percentileValues[0]) intervalPercentile = 25;
            else if (intervalMax <= percentileValues[1]) intervalPercentile = 50;
            else if (intervalMax <= percentileValues[2]) intervalPercentile = 75;
            else if (intervalMax <= percentileValues[3]) intervalPercentile = 95;
            else if (intervalMax <= percentileValues[4]) intervalPercentile = 98.9;
            else if (intervalMax <= percentileValues[5]) intervalPercentile = 99.9;
            else intervalPercentile = 100;

            return { interval: interval.interval, percentile: intervalPercentile };
        });

        const margin = { top: 30, right: 30, bottom: 75, left: title === "HPS" ? 75 : 45 };
        const width = 1240 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3.select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleBand()
            .domain(intervals.map(d => d.interval))
            .range([0, width])
            .padding(0.1);

        const y = d3.scaleLinear()
            .domain([0, d3.max(intervals, d => d.count)])
            .range([height, 0]);

        svg.selectAll(".bar")
            .data(intervals)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.interval))
            .attr("y", d => y(d.count))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.count))
            .attr("fill", d => {
                const percentileBracket = percentileBrackets.find(pb => pb.interval === d.interval);
                if (percentileBracket) {
                    const percentile = percentileBracket.percentile;
                    if (percentile <= 25) return "#666";
                    if (percentile <= 50) return "#1eff00";
                    if (percentile <= 75) return "#0070ff";
                    if (percentile <= 95) return "#a335ee";
                    if (percentile <= 98.9) return "#ff8000";
                    if (percentile <= 99.9) return "#e268a8";
                }
                return "#e5cc80";
            });

        const xAxis = svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).tickFormat(() => "").tickSize(0));

        xAxis.append("text")
            .attr("class", "axis-label")
            .attr("x", width / 2)
            .attr("y", 45)
            .style("text-anchor", "middle")
            .text("HPS")
            .style("fill", "white")
            .style("font-size", "1.4rem");

        xAxis.append("text")
            .attr("class", "axis-label")
            .attr("x", -17)
            .attr("y", 35)
            .style("text-anchor", "start")
            .text(formatThousands(minValue))
            .style("fill", "white")
            .style("font-size", "1.4rem");

        xAxis.append("text")
            .attr("class", "axis-label")
            .attr("x", width + 17)
            .attr("y", 35)
            .style("text-anchor", "end")
            .text(formatThousands(maxValue))
            .style("fill", "white")
            .style("font-size", "1.4rem");

        const maxTicks = 15;
        const yAxis = svg.append("g")
            .call(d3.axisLeft(y)
                .ticks(Math.min(maxTicks, d3.max(intervals, d => d.count) + 1))
                .tickFormat(d => Math.round(d)));

        yAxis.append("text")
            .attr("class", "axis-label")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", title === "HPS" ? -55 : -30)
            .style("text-anchor", "middle")
            .text("Iterations")
            .style("fill", "white")
            .style("font-size", "1.4rem");

        yAxis.selectAll("text").style("fill", "white");

        const handleMouseMove = (event) => {
            const containerRect = containerRef.current.getBoundingClientRect();
            const [mouseX, mouseY] = d3.pointer(event);

            const adjustedMouseX = mouseX - margin.left;
            const adjustedMouseY = mouseY - margin.top;

            if (adjustedMouseX >= 0 && adjustedMouseX <= width && adjustedMouseY >= 0 && adjustedMouseY <= height) {
                const index = Math.floor((adjustedMouseX / width) * intervals.length);
                const interval = intervals[index].interval;

                setTooltipContent(interval);
                setTooltipPosition({
                    x: event.clientX - containerRect.left + 10,
                    y: event.clientY - containerRect.top - 15
                });
                setIsTooltipVisible(true);
            } else {
                setIsTooltipVisible(false);
            }
        };

        const handleMouseOut = () => {
            setIsTooltipVisible(false);
        };

        d3.select(svgRef.current)
            .on("mousemove", handleMouseMove)
            .on("mouseout", handleMouseOut);

    }, [data, title, colour]);

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
                    <span className="tooltip-time">{tooltipContent}</span>
                </div>
            )}
        </div>
    );
};

export default BellCurveBarChart;