var w = 500;
var h = 300;
var padding = 60;
var dataset = 
[
  [2, 8],
  [3, 5],
  [5, 17],
  [6, 6],
  [6, 12],
  [7, 20],
  [8, 22],
  [10,11],
  [5, 12],
  [6, 16]
];

// Set Scale start from 0 from x
var xScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, function(d) {
    return d[0];
  })])
  .range([padding, w - padding]);

// Set Scale start from 0 for y
var yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, function(d) {
    return d[1];
  })])
  .range([h - padding, padding]);

// Create the SVG element
var svg = d3.select("body")
  .append("svg")
  .attr("width", w)
  .attr("height", h);

// Define the X-axis
var xAxis = d3.axisBottom()
  .scale(xScale)
  .ticks(10);

// Define the Y-axis
var yAxis = d3.axisLeft()
  .scale(yScale)
  .ticks(10);

// The circles
svg.selectAll("circle")
  .data(dataset)
  .enter()
  .append("circle")
  .attr("cx", function(d) { return xScale(d[0]); })
  .attr("cy", function(d) { return yScale(d[1]); })
  .attr("r", 5)
  .attr("fill", 'lightgreen');

// Add labels to each of the circles
svg.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(function(d) { return d[0] + "," + d[1]; })
  .attr("x", function(d) { return xScale(d[0]) + 10; })  
  // Position label to the right of the circle
  .attr("y", function(d) { return yScale(d[1]); })
  .attr("fill", "green");

// X-axis
svg.append("g")
  .attr("transform", "translate(0," + (h - padding) + ")")
  .call(xAxis);

// Y-axis
svg.append("g")
  .attr("transform", "translate(" + padding + ",0)")
  .call(yAxis);

// Add X-axis label
svg.append("text")
  .attr("x", w / 1.5)
  .attr("y", h - 20)
  .attr("text-anchor", "middle")
  .attr("fill", "black")
  .text("Tree Age (year)");

// Add Y-axis label
svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -h / 2.5)
  .attr("y", 20)
  .attr("text-anchor", "middle")
  .attr("fill", "black")
  .text("Tree Height (m)");