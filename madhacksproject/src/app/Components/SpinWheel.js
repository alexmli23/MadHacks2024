import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const WheelOfFortune = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  // Retrieve and validate the userId from localStorage only once on component mount
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      console.log("Retrieved userId from localStorage:", storedUserId); // Debugging log
    } else {
      console.error("User ID is missing in localStorage");
      setError("User ID is missing. Please log in again.");
    }
  }, []);

  // Fetch interests only if userId is defined and valid
  useEffect(() => {
    if (!userId) {
      console.warn("No valid userId found; skipping fetch.");
      return;
    }

    const fetchInterests = async () => {
      try {
        console.log("Fetching interests for userId:", userId); // Debugging log
        const response = await fetch(`http://localhost:5001/get-interests/${userId}`);
        const result = await response.json();

        if (response.ok) {
          // Map the interests to the data format required for the wheel
          const interestsData = result.interests.map(interest => ({
            label: interest,
            question: `Tell me something about ${interest}?`,
          }));
          setData(interestsData);
          console.log("Fetched interests:", interestsData); // Debugging log
        } else {
          console.error('Error fetching interests:', result.message);
          setError(result.message || "Failed to fetch interests.");
        }
      } catch (error) {
        console.error('Error fetching interests:', error);
        setError("Failed to fetch interests.");
      }
    };

    fetchInterests();
  }, [userId]);

  // Render the wheel only if data is available
  useEffect(() => {
    if (data.length === 0) return;

    d3.select('#chart').selectAll('*').remove();

    const width = 400;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    const blueColor = '#1E90FF';

    const svg = d3.select('#chart')
      .append('svg')
      .attr('width', width)
      .attr('height', height + 50)
      .attr('viewBox', `0 0 ${width} ${height + 50}`)
      .style('max-width', '100%')
      .style('height', 'auto')
      .style('background-color', '#f9f9f9');

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
        .attr('fill', '#F6995C')
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
    <div id="chart" className="w-[400px] h-[450px] bg-[#f9f9f9]">
      <div id="question" className="text-center mt-4">
        <h1>Click the wheel to spin!</h1>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default WheelOfFortune;


