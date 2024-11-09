import React, { useEffect } from 'react';
import * as d3 from 'd3';

const WheelOfFortune = () => {
  const data = [
    { label: 'Dell LAPTOP', question: 'What CSS property is used for specifying the area between the content and its border?' },
    { label: 'IMAC PRO', question: 'What CSS property is used for changing the font?' },
    { label: 'SUZUKI', question: 'What CSS property is used for changing the color of text?' },
    { label: 'HONDA', question: 'What CSS property is used for changing the boldness of text?' },
    { label: 'FERRARI', question: 'What CSS property is used for changing the size of text?' },
    { label: 'APARTMENT', question: 'What CSS property is used for changing the background color of a box?' },
    { label: 'IPAD PRO', question: 'Which word is used for specifying an HTML tag that is inside another tag?' },
    { label: 'LAND', question: 'Which side of the box is the third number in: margin:1px 1px 1px 1px;' },
    { label: 'MOTOROLLA', question: "What are the fonts that don't have serifs at the ends of letters called?" },
    { label: 'BMW', question: 'With CSS selectors, what character prefix should one use to specify a class?' },
  ];

  useEffect(() => {
    d3.select('#chart').selectAll('*').remove();

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    const blueColor = '#FFA500'; // Equivalent to bg-blue-400

    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height + 50)
      .attr('viewBox', `0 0 ${width} ${height + 50}`)
      .style('max-width', '100%')
      .style('height', 'auto')
      .style('background-color', '#f9f9f9');

    const grooveSpacing = 5;
    const grooveStartRadius = radius - 30;
    for (let i = 0; i < 5; i++) {
      svg.append("circle")
        .attr("cx", width / 2)
        .attr("cy", height / 2 + 25)
        .attr("r", grooveStartRadius - i * grooveSpacing)
        .attr("fill", "none")
        .attr("stroke", "#e0e0e0")
        .attr("stroke-width", 1)
        .attr("opacity", 0.7);
    }

    const container = svg.append('g')
      .attr('class', 'chartholder')
      .attr('transform', `translate(${width / 2}, ${height / 2 + 25})`);

    const vis = container.append('g');

    const pie = d3.pie().sort(null).value(() => 1);
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const arcs = vis.selectAll('g.slice')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'slice');

    arcs.append('path')
      .attr('fill', blueColor) // Apply blue color to all sections
      .attr('d', arc)
      .attr('stroke', '#f9f9f9')
      .attr('stroke-width', '2px');

    arcs.append('text')
      .attr('transform', d => {
        const angle = (d.startAngle + d.endAngle) / 2;
        const x = Math.cos(angle - Math.PI / 2) * (radius - 50);
        const y = Math.sin(angle - Math.PI / 2) * (radius - 50);
        return `translate(${x},${y}) rotate(${angle * 180 / Math.PI - 90})`;
      })
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', 'black')
      .text((d, i) => data[i].label);

    svg.append("polygon")
      .attr("points", `${width / 2 - 12},15 ${width / 2 + 12},15 ${width / 2},40`)
      .attr("fill", "red");

    function spin() {
      container.on('click', null);

      const sliceAngle = 360 / data.length;
      const randomIndex = Math.floor(Math.random() * data.length);
      const rotation = 360 * 3 + (360 - randomIndex * sliceAngle) - (sliceAngle / 2);

      vis.transition()
        .duration(3000)
        .attrTween('transform', () => {
          const interpolateRotation = d3.interpolate(0, rotation);
          return t => `rotate(${interpolateRotation(t)})`;
        })
        .on('end', () => {
          d3.select('#question h1').text(data[randomIndex].question);
          container.on('click', spin);
        });
    }

    container.on('click', spin);
  }, [data]);

  return (
    <div id="chart" className="w-[400px] h-[450px] bg-[#f9f9f9]"></div> 
  );
};

export default WheelOfFortune;


