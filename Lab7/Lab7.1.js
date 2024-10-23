function init() {
	// Set dimensions for the SVG canvas
	var w = 600;
	var h = 300;
	var margin = { top: 20, right: 30, bottom: 40, left: 50 };

	// Define dataset variable
	var dataset;

	// Load CSV data
	d3.csv("Unemployment_78-95.csv", function(d) {
			return {
					date: new Date(+d.year, +d.month - 1),  // Convert year and month into a Date object
					number: +d.number                       // Convert the number to an integer
			};
	}).then(function(data) {
			dataset = data;

			// Call the area chart function to draw the chart
			areaChart(dataset);
	});

	// Define the area chart function
	function areaChart(dataset) {
			var margin = { top: 20, right: 30, bottom: 40, left: 50 };
			var w = 600 - margin.left - margin.right;
			var h = 300 - margin.top - margin.bottom;

			// Create xScale for dates using d3.scaleTime
			var xScale = d3.scaleTime()
					.domain([
							d3.min(dataset, function(d) { return d.date; }),   // Minimum date in the dataset
							d3.max(dataset, function(d) { return d.date; })    // Maximum date in the dataset
					])
					.range([0, w]);

			// Create yScale for unemployment numbers using d3.scaleLinear
			var yScale = d3.scaleLinear()
					.domain([0, d3.max(dataset, function(d) { return d.number; })])  // Maximum unemployment value
					.range([h, 0]);

			// Append the SVG to the chart div
			var svg = d3.select("#chart")
					.append("svg")
					.attr("width", w + margin.left + margin.right)
					.attr("height", h + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			// Define the area generator
			var area = d3.area()
					.x(function(d) { return xScale(d.date); })  // Mapping dates to x-axis
					.y0(function() { return yScale.range()[0]; })  // Bottom of the area (yScale range base, i.e., 0)
					.y1(function(d) { return yScale(d.number); })  // Top of the area (unemployment numbers)
					.curve(d3.curveMonotoneX);  // Smooth the area curve

			// Append the path for the area chart
			svg.append("path")
					.datum(dataset)
					.attr("fill", "steelblue")
					.attr("stroke", "none")
					.attr("d", area);

			// Add a line at the half-million unemployed mark
			svg.append("line")
					.attr("class", "halfMilMark")
					.attr("x1", 0) // Start from the leftmost side of the chart
					.attr("y1", yScale(500000)) // Y-position at half a million
					.attr("x2", w) // End at the rightmost side of the chart
					.attr("y2", yScale(500000)) // Same Y-position for a straight line
					.attr("stroke", "red")
					.attr("stroke-width", 1)
					.attr("stroke-dasharray", "4,4"); // Dashed line for emphasis

			// Add a text label to annotate the half-million line
			svg.append("text")
					.attr("class", "halfMilLabel")
					.attr("x", 10) // X-position slightly off the left side
					.attr("y", yScale(500000) - 10) // Y-position just above the line
					.attr("fill", "red")
					.text("Half a million unemployed");

			// Add the x-axis to the SVG
			var xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%Y"));
			svg.append("g")
					.attr("transform", "translate(0," + h + ")")
					.call(xAxis);

			// Add the y-axis to the SVG
			var yAxis = d3.axisLeft(yScale);
			svg.append("g")
					.call(yAxis);
	}
}

window.onload = init;
