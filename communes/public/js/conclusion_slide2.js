"use strict";

// async init function (because of the awaits on fetches)
const initSlide2 = function(data){
  /* Pie chart */
  document.querySelector('#desc-pie-chart').innerHTML = data.piechart.description;

  create_pie_chart(data.piechart.data[0], '#pie-chart', data.color.main[0], data.color.background[0]);
  create_pie_chart(data.piechart.data[1], '#pie-chart', data.color.main[0], data.color.background[0]);

  /* Bar chart */
  document.querySelector('#desc-bar-chart').innerHTML = data.barchart.description;

  d3.xml("../img/slope-chart.svg").then(function(xml) {
    var importedNode = document.importNode(xml.documentElement, true);
    d3.select(importedNode).attr("width", "100%").attr("height", "100%");
    d3.select("#slope-chart").node().appendChild(importedNode);
  });
};

const create_pie_chart = function(data, selector, main_color, secondary_color) {
// Set the dimensions of the view box
  var width = 170,
      height = 181,
      viewBox = "0 0 " + width + " " + height,
      radius = Math.min(width, height) / 2;

  const d = [
    {value: data.value, color: main_color},
    {value: 100 - data.value, color: secondary_color}
  ];

// Define the arc generator for the pie chart
  var arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

// Define the pie generator for the data
  var pie = d3.pie()
      .sort(null)
      .value(function (d) {
        return d.value;
      });

// Create the SVG element
  var svg = d3.select(selector)
      .append("div")
      .attr("class", "pie-chart")
      .append("svg")
      .attr("viewBox", viewBox)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + (radius - 10) + ")");


// Bind the data to the pie chart
  var g = svg.selectAll(".arc")
      .data(pie(d))
      .enter().append("g")
      .attr("class", "arc");

// Append the path element for each slice of the pie chart
  g.append("path")
      .attr("d", arc)
      .style("fill", function (d) {
        return d.data.color;
      });


  g.filter(d => d.index === 0)
      .append('text')
      .attr("transform", function (d) {
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr("dy", ".35em")
      .style('fill', '#ffffff')
      .style('font-family', 'Poppins')
      .style('text-anchor', 'middle')
      .text(d => d.data.value + '%');

  svg.append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("transform", `translate(0, ${radius+5})`)
      .style("font-family", "Poppins")
      .style("fill", "#000000")
      .text(data.year);
}
