"use strict";

// async init function (because of the awaits on fetches)
const initSlide2 = function(data){
  /* Pie chart */
  document.querySelector('#desc-pie-chart').innerHTML = data.piechart.description;
  const pie_chart = document.querySelector('#pie-chart');
  const pie_width = pie_chart.clientWidth;
  const pie_height = pie_chart.clientHeight;
  const coeff = 0.8;
  create_pie_chart(data.piechart.data[0], data.color.main[0], data.color.background[0], pie_chart, pie_width, pie_height, coeff);
  create_pie_chart(data.piechart.data[1], data.color.main[0], data.color.background[0], pie_chart, pie_width, pie_height, coeff);

  /* Bar chart */
  document.querySelector('#desc-bar-chart').innerHTML = data.barchart.description;
  const bar_chart = document.querySelector('#bar-chart');
  const bar_width = bar_chart.clientWidth;
  const bar_height = bar_chart.clientHeight;

  create_bar_chart(data.barchart.data, bar_chart, bar_width, bar_height, data.color.main.slice(0, 2), data.color.background[0]);
};


const create_pie_chart = function(data, main_color, secondary_color, selector, width, height, coeff){
  const radius = Math.min(width, height) / 2 * coeff;

  const d = [
    {value: data.value, color: main_color},
    {value: 100 - data.value, color: secondary_color},
  ];

  const svg = d3.select(selector)
      .append("div")
      .attr("class", "pie-chart")
      .append("svg")
      .attr("viewBox", [0, 0, radius * 2, height])
      .append('g')
      .attr('transform', `translate(${radius},${radius})`);

  const pie = d3.pie()
      .value(d => d.value)
      .sort(null);

  const arc = d3.arc()
      .outerRadius(radius)
      .innerRadius(0);

  const g = svg.selectAll('.arc')
      .data(pie(d))
      .enter().append('g')
      .attr('class', 'arc');

  g.append('path')
      .attr('d', arc)
      .style('fill', d => d.data.color);

  g.filter(d => d.index === 0)
      .append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('dy', '.35em')
      .style('fill', '#ffffff')
      .style('font-size', '10px')
      .style('text-anchor', 'middle')
      .text(d => d.data.value + '%');

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("transform", `translate(0, ${radius * (2 - coeff) })`)
        .style("font-size", "13px")
        .style("fill", "#000000")
        .text(data.year);
}

const create_bar_chart = function(data, selector, width, height, colors, rectangle_color){
  const top = 20;
  const bottom = 20;
  const padding = width * 0.1;

  var colors_map = d3.scaleOrdinal()
      .domain(data.map(function(d) { return d.year; }))
      .range(colors);

  var x = d3.scaleLinear()
      .domain(data.map(function(d) { return d.year; }))
      .range([padding, width - width * 0.05 - padding]);

  var y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return d.value; })])
      .range([0, height - top - bottom]);

  var svg = d3.select(selector)
      .append("svg")
      .attr("viewBox", [0, 0, width, height])

  svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function (d) { return x(d.year); })
      .attr("y", function(d) { return height - y(d.value) - bottom; })
      .attr("width", width * 0.05)
      .attr("height", function(d) { return y(d.value); })
      .style("fill", function(d, i) { return colors_map(i); });

  svg.append("rect")
      .attr("x", padding / 2)
      .attr("y", height - bottom - bottom / 3 + 1)
      .attr("width", width - padding)
      .attr("height", 8)
      .style("fill", rectangle_color);

  svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", function(d) { return x(d.year) + width * 0.05 / 2; })
      .attr("y", function(d) { return height - y(d.value) - bottom - 5;})
      .text(function(d) { return d.value + ' TW'; })
      .style("text-anchor", "middle")
      .style("font-size", "12px")
      .style("fill", "black");

  svg.selectAll(".year-label")
      .data(data)
      .enter()
      .append("text")
      .attr("x", function(d) { return x(d.year) + width * 0.05 / 2; })
      .attr("y", height - 2)
      .text(function(d) { return d.year; })
      .style("text-anchor", "middle")
      .style("font-size", "15px")
      .style("fill", "black");
}
