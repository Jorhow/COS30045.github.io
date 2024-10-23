function init(){
  var w=300;
  var h=300;
  var dataset = [

      { apples: 5, oranges: 10, grapes: 22 },
      { apples: 4, oranges: 12, grapes: 28 },
      { apples: 2, oranges: 19, grapes: 32 },
      { apples: 7, oranges: 23, grapes: 35 },
      { apples: 23, oranges: 17, grapes: 43 }
      ];

  var stack =d3.stack()
                  .keys(["apples","oranges","grapes"]);

  var series=stack(dataset);

  var svg= d3.select("#chart")
              .append("svg")
              .attr("width",w)
              .attr("height",h);

  var color=d3.scaleOrdinal(d3.schemeCategory10);


  var groups =svg.selectAll("g")
                  .data(series)
                  .enter()
                  .append("g")
                  .style("fill", (d,i)=>color(i));

  var yScale=d3.scaleLinear()
                  .domain([0,d3.max(dataset,d=>d.apples +d.oranges +d.grapes)])
                  .range([h,0]);

  var xScale=d3.scaleBand()
                  .domain(d3.range(dataset.length))
                  .range([0,w])
                  .padding(0.1);
  
  var rects = groups.selectAll("rect")
                      .data(d=>d)
                      .enter()
                      .append("rect")
                      .attr("x",(d,i)=>xScale(i))
                      .attr("y",function(d,i){
                          return yScale(d[1]);
                      })
                      .attr("height",d=>yScale(d[0])-yScale(d[1]))
                      .attr("width",xScale.bandwidth());

  var legend = svg.append("g")
                  .attr("transform","translate(10,50)");

  var categories = ["apples","oranges","grapes"];

  categories.forEach((category,i)=>{

      legend.append("rect")
      .attr("x", 0)
      .attr("y", i * 20) // Space out legend items
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color(i));

  legend.append("text")
      .attr("x", 25)
      .attr("y", i * 20 + 15) // Center text vertically
      .text(category);
  })
}