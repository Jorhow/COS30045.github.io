function init() {
  // Step 1: Set up the dimensions for the SVG
  var w = 500;
  var h = 300;

  // Step 2: Create the Mercator projection
  var projection = d3.geoMercator()
      .center([145, -36.5])  // Center the map on Victoria, Australia
      .translate([w / 2, h / 2])  // Translate to the center of the SVG
      .scale(2450);  // Scale the map to fit the view

  // Step 3: Create the path generator
  var path = d3.geoPath()
      .projection(projection);

  // Step 4: Append the SVG canvas to the body
  var svg = d3.select("body") 
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style("fill", "grey");

  // Step 5: Set the color scale
  // Choose a sequential color scheme from ColorBrewer (e.g., Blues)
  var color = d3.scaleQuantize()
    .domain([0, 100])  // Adjust this range based on your data
    .range(d3.schemeBlues[9]);  // Using the "Blues" color scheme from ColorBrewer

  // Step 6: Load the GeoJSON data and bind it to paths
  d3.json("LGA_VIC.json").then(function(json) {
    svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", function(d) {
        // Use the value from the LGA's properties to determine the fill color
        return color(d.properties.value);
      })
    });
  }
window.onload = init;
