import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { useRouter } from 'next/navigation';

const WheelOfFortune = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const interestQuestions = [
    { label: 'politics', question: 'Was the 2024 Presidential Election Rigged?' },
    { label: 'food', question: 'Is Spray Cheese Real?' },
    { label: 'sports', question: 'Who Will Make It to the Super Bowl?' },
    { label: 'popCulture', question: 'Who Does Not Deserve a Grammy Nomination?' },
    { label: 'art', question: 'Is Fan Art a Real Art Form?' },
    { label: 'gaming', question: 'Valorant: Should Chamber Be Nerfed?' },
    { label: 'scienceEducation', question: 'Should University Tuition Cost Less?' },
    { label: 'tech', question: 'Is the Metaverse Innovation or Dystopian?' },
    { label: 'financeEconomics', question: 'What is your take on the current economic trends?' },
    { label: 'beauty', question: 'Sephora, Ulta Beauty, or Drugstore Products?' },
    { label: 'books', question: 'Is Harry Potter Really a Gryffindor?' },
    { label: 'business', question: 'Are Workers\' Unions Beneficial or Mutiny?' },
    { label: 'tvMovies', question: 'Should Disney Keep Making Live-Action Movies of Their Classics?' },
    { label: 'fashion', question: 'What\'s a Trend that Should Stop?' },
  ];

  const router = useRouter();

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
          const interestsData = result.interests
          .map(interest => {
            // Find the matching question from the predefined `interestQuestions` array
            const matchingQuestion = interestQuestions.find(item => item.label === interest);

            // Only include the interest if a matching question is found
            return matchingQuestion ? {
              label: matchingQuestion.label,
              question: matchingQuestion.question,
            } : null;
          })
          .filter(item => item !== null);
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
          const selected = data[randomIndex];
          console.log(selected.label);
          console.log(selected.question);
          d3.select('#question h1').text(selected.question);
          console.log("Pushing to router:", {
            pathname: '/question',
            query: { interest: selected.label, question: selected.question }
          });
          router.push({
            pathname: "/question", // Assuming your question page is at /question
            query: {
              interest: encodeURIComponent(selected.label),
              question: encodeURIComponent(selected.question)
            },
          });
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


