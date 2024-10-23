function init() {
  // Step 1: Set up the data
  var data = [10, 20, 30, 40, 50, 60]; // Example data array

  var w = 300; // Width of the SVG canvas
  var h = 300; // Height of the SVG canvas
  var outerRadius = w / 2; // Outer radius of the pie chart
  var innerRadius = 0; // Inner radius for a donut chart (0 for pie chart)

  // Create an SVG canvas
  var svg = d3.select("#chart")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .append("g")
      .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")"); // Move to center

  // Step 2: Set up the pie chart parameters
  var arc = d3.arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius); // Set inner radius

  var arcs = svg.selectAll("g.arc")
      .data(pie(dataset1))
      .enter()
      .append("g")
      .attr("class","arc")
      .attr("transform", "translate(" + outerRadius + ")")
  

  var pie = d3.pie(); // Create pie generator

  // Generate the pie chart data
  var pieData = pie(data);

  // Draw the pie chart segments
  svg.selectAll("path")
      .data(pieData)
      .enter()
      .append("path")
      .attr("class", "slice")
      .attr("d", arc)
      .attr("fill", function(d, i) { 
          return d3.schemeCategory10[i]; // Use D3's color scheme
      })
      .attr("stroke", "white") // Stroke for separation
      .attr("stroke-width", "2px");
}

  arcs.append("path")
    attr("fill", function(d, i){
        return VideoColorSpace(i);
    })
    .attr("d", function(d, i){
        return arc(d, i);
    });
    var color = d3.scaleOrdinal(d3.schemeCategory10);

// Call the init function when the window loads
window.onload = init;
