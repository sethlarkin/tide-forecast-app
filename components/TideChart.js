import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const TideChart = ({ tideData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (tideData.length > 0) {
      drawChart();
    }
  }, [tideData]);

  const drawChart = () => {
    const svg = d3.select(chartRef.current);
    svg.selectAll("*").remove(); // Clear previous SVG elements

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const x = d3
      .scaleTime()
      .domain(d3.extent(tideData, (d) => new Date(d.t)))
      .range([margin.left, width - margin.right]);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(tideData, (d) => parseFloat(d.v))])
      .range([height - margin.bottom, margin.top]);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(6).tickFormat(d3.timeFormat("%I:%M %p")))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    const line = d3
      .line()
      .x((d) => x(new Date(d.t)))
      .y((d) => y(parseFloat(d.v)))
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .datum(tideData)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line);

    // Tooltip
    const focus = svg
      .append("g")
      .attr("class", "focus")
      .style("display", "none");

    focus
      .append("rect")
      .attr("width", 100)
      .attr("height", 50)
      .attr("fill", "white")
      .attr("stroke", "black");

    focus
      .append("foreignObject")
      .attr("width", 150) // increased from 100 to 150
      .attr("height", 70) // increased from 50 to 70
      .html("<table></table>");

    svg
      .append("rect")
      .attr("class", "overlay")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none")
      .style("pointer-events", "all")
      .on("mouseover", () => focus.style("display", null))
      .on("mouseout", () => focus.style("display", "none"))
      .on("mousemove", mousemove);

    function mousemove(event) {
      const bisectDate = d3.bisector((d) => new Date(d.t)).left;
      const x0 = x.invert(d3.pointer(event)[0]),
        i = bisectDate(tideData, x0, 1),
        d0 = tideData[i - 1],
        d1 = tideData[i];

      if (!d0 || !d1) return;

      const d = x0 - new Date(d0.t) > new Date(d1.t) - x0 ? d1 : d0;

      const xPosition = x(new Date(d.t));
      const yPosition = y(parseFloat(d.v));

      let translationX = xPosition;
      let translationY = yPosition - 50;

      // Adjust the tooltip position if it goes out of the view
      if (translationX + 100 > width) {
        translationX -= 100;
      }
      if (translationY < 0) {
        translationY += 50;
      }

      focus.attr("transform", `translate(${translationX},${translationY})`);

      const tableContent = `
      <style>
        .tide_table {
          font-size: 10px;
        }
      </style>
      <table class="tide_table">
        <tr>
          <td>Time:</td>
          <td>${d3.timeFormat("%I:%M %p")(new Date(d.t))}</td>
        </tr>
        <tr>
          <td>Height:</td>
          <td>${parseFloat(d.v).toFixed(2)} ft.</td>
        </tr>
      </table>
    `;

      focus.select("foreignObject").html(tableContent);
    }
  };

  return (
    <div>
      <svg ref={chartRef} width={500} height={300}></svg>
    </div>
  );
};

export default TideChart;
