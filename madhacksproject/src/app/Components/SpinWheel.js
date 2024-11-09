"use client";
import React, { useEffect } from 'react';
import * as d3 from 'd3';

const SpinWheel = () => {
  const data = [
    { label: 'POLITICS', value: 1, question: 'Was the 2024 Presidential election rigged?' },
    { label: 'FOOD', value: 2, question: 'Is spray cheese real?' },
    { label: 'SPORTS', value: 3, question: 'Who will make it to the SuperBowl?' },
    { label: 'ENTERTAINMENT', value: 4, question: 'Who does not deserve a Grammy nomination?' },
    { label: 'ART', value: 5, question: 'Is fanart a real art form?' },
    { label: 'GAMING', value: 6, question: 'Valorant: Should Chamber be nerfed?' },
    { label: 'EDUCATION', value: 7, question: 'Should university tuition cost less?' },
    { label: 'TECHNOLOGY', value: 8, question: 'Is the Metaverse progress or dystopian?' },
    { label: 'BEAUTY', value: 9, question: "Sephora, Ulta Beauty, or drug store products?" },
    { label: 'LITERATURE', value: 10, question: 'Is Harry Potter really a Gryffindor?' },
  ];

  useEffect(() => {
    d3.select('#chart').selectAll('*').remove();

    const width = 500;
    const height = 500;
    const padding = { top: 20, right: 40, bottom: 0, left: 0 };
    const r = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', width + padding.left + padding.right)
      .attr('height', height + padding.top + padding.bottom);

    const container = svg.append('g')
      .attr('class', 'chartholder')
      .attr('transform', `translate(${width / 2 + padding.left}, ${height / 2 + padding.top})`);

    const vis = container.append('g');

    const pie = d3.pie().sort(null).value(() => 1);
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(r);

    const arcs = vis.selectAll('g.slice')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'slice');

    arcs.append('path')
      .attr('fill', (d, i) => color(i))
      .attr('d', arc);

    arcs.append('text')
      .attr('transform', d => {
        const angle = (d.startAngle + d.endAngle) / 2;
        const x = Math.cos(angle - Math.PI / 2) * (r - 50); // Adjusted inward to prevent overlap
        const y = Math.sin(angle - Math.PI / 2) * (r - 50);
        return `translate(${x},${y}) rotate(${angle * 180 / Math.PI - 90})`;
      })
      .attr('text-anchor', 'middle')
      .style('font-size', '12px') // Slightly smaller for fitting
      .style('fill', 'white')
      .each(function (d, i) {
        const label = data[i].label;
        d3.select(this)
          .append('tspan')
          .attr('x', 0)
          .attr('dy', 0)
          .text(label.length > 10 ? label.slice(0, 10) + '...' : label); // Trim if too long
      });

    container.on('click', spin);

    function spin() {
      container.on('click', null);

      const ps = 360 / data.length;
      const rng = Math.floor((Math.random() * 1440) + 360);
      let rotation = (Math.round(rng / ps) * ps);
      const picked = Math.round(data.length - (rotation % 360) / ps) % data.length;

      rotation += 90 - Math.round(ps / 2);
      vis.transition()
        .duration(3000)
        .attrTween('transform', () => {
          const i = d3.interpolate(0, rotation);
          return t => `rotate(${i(t)})`;
        })
        .on('end', () => {
          d3.select('#question h1').text(data[picked].question);
          container.on('click', spin);
        });
    }
  }, [data]);

  return (
    <div className="flex justify-center items-center">
      <div id="chart" className="absolute w-[500px] h-[500px] top-0 left-0 bg-black"></div>
      <div id="question" className="absolute w-[400px] h-[500px] top-0 left-[520px]">
        <h1 className="text-5xl font-bold font-sans absolute top-1/2 transform -translate-y-1/2 text-white"></h1>
      </div>
    </div>
  );
};

export default SpinWheel;




