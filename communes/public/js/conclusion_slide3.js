"use strict";

// async init function (because of the awaits on fetches)
const initSlide3 = function(data){
  /* Bar chart */
  document.querySelector('#desc-bar-chart2').innerHTML = data.barchart_global.description;
  const bar_chart = document.querySelector('#bar-chart2');
  const bar_width = bar_chart.clientWidth;
  const bar_height = bar_chart.clientHeight;

  create_bar_chart2(data.barchart_global.data, bar_chart, bar_width, bar_height, data.color.background[0]);

  const button = document.querySelector('button');

  button.innerHTML = data.bouton.toLowerCase();
  button.style.backgroundColor = data.color.main[0];
};

const create_bar_chart2 = function(data, selector, width, height, rectangle_color){
  const top = 30;
  const bottom = 60;
  const padding = width * 0.1;

  // sort the data by percent the highest first
  data.sort(function(a, b) { return b.percent - a.percent; });

  var x = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([padding, width - width * 0.05 - padding]);

  var y = d3.scaleLinear()
      .domain([40, d3.max(data, function(d) { return d.percent; })])
      .range([0, height - top - bottom]);

  var svg = d3.select(selector)
      .append("svg")
      .attr("viewBox", [0, 0, width, height])

  svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function (d, i) { return x(i); })
      .attr("y", function(d) { return height - y(d.percent) - bottom; })
      .attr("width", width * 0.05)
      .attr("height", function(d) { return y(d.percent); })
      .style("fill", function(d) { return d.color; });

  svg.append("rect")
      .attr("x", padding / 2)
      .attr("y", height - bottom - 8 + 1)
      .attr("width", width - padding)
      .attr("height", 8)
      .style("fill", rectangle_color);

  svg.selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", function(d, i) { return x(i) + width * 0.05 / 2; })
      .attr("y", function(d) { return height - y(d.percent) - bottom - 10;})
      .text(function(d) { return d.percent + ' %'; })
      .style("text-anchor", "middle")
      .style("font-size", "18px")
      .style("fill", "black");

  const legend = svg
      .selectAll(".legend")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr("transform", (d, i) => `translate(${(i % 3) * 145}, ${Math.floor(i / 3) * 30})`);

  legend
      .append("rect")
      .attr("x", 25)
      .attr("y", height - bottom + 10)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d) => d.color);

  legend
      .append("text")
      .attr("x", 47)
      .attr("y", height - bottom + 19)
      .attr("dy", ".35em")
      .style("text-anchor", "left")
      .text((d) => d.energy.toLowerCase());
}
