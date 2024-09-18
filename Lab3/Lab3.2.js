var w = 500;
var h = 200;
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

		var xScale = d3.scaleLinear()
    .domain([d3.min(dataset, function(d) {
      return d[0];
      }),
      d3.max(dataset, function(d) {
      return d[0];
      })])
      .range([padding, w - padding]);

    var yScale = d3.scaleLinear()
    .domain([d3.min(dataset, function(d) {
      return d[1];
      }),
      d3.max(dataset, function(d) {
      return d[1];
      })])
      .range([h - padding, padding]);

    var svg = d3.select("body")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    var xAxis = d3.axisBottom()
                  .scale(xScale)
                  .ticks(10);



		svg.selectAll("circle")
			.data(dataset)
			.enter()
			.append("circle")
			.attr("cx", function(d) { return xScale(d[0]); })
			.attr("cy", function(d) { return yScale(d[1]); })
			.attr("r", 5)
			.attr("fill", 'lightgreen');

		svg.selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .text(function(d) { return d[0] + "," + d[1]; })
      .attr("x", function(d) { return xScale((d[0]) + 10); })  // Position label to the right of the circle
      .attr("y", function(d) { return yScale(d[1]); })
      .attr("fill", "green");

    svg.append("g")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(xAxis);
