
var viewportWidth = $(window).width();
var viewportHeight = $(window).height();
var width = viewportWidth;
var height = viewportHeight*.6;
var padding = viewportHeight*.1;
var yLabel = height - (padding*.7);


/* 
 * Who are the top 10 contributors (by # of playlists) to the Free Music Archive?
 * see http://freemusicarchive.org/api/docs/ for more details
 */

function requestCurators() {
  d3.jsonp("http://freemusicarchive.org/api/get/curators.jsonp?callback=visualise&limit=10&sort_by=curator_playlists&sort_dir=desc");
}

function visualise(data){
	
	var color = d3.scale.category20c(); 

	var svg = d3.select("article")
		.append("svg")
		.attr({
			"width":width,
			"height":height
		})
		
	
	var rect = svg.selectAll("rect")
    	.data(data.dataset)
    	.enter()
    	.append("rect")
 		.attr("fill", function(d) {
  		return color(Math.floor(d.curator_playlists)); // rgb(25,32,55)
  		 // return "rgb(25, 32, " + d.curator_playlists*15 + ")";
		})
		.attr("x", function(d, i) {
  			return i * (width / 20);  
		 })
		.attr("y", function(d) {
			return height - padding  - d.curator_playlists*15;  
		})
		.attr({
			"width":width/27,
			"height":function(d){return d.curator_playlists * 15;}
			
		})	
		.on("mouseover", function(d,i){
			var xPos = Math.floor(d3.select(this).attr("x"));
			d3.select(this)
				var label = svg.append("text")
				.classed("curatorName",true)
				.text(function(){
					return d.curator_title + ", " + d.curator_playlists;
				})
				.attr({
					"y":yLabel,
					"x":xPos
				})
		})
		.on("mouseout", function(d,i){
			d3.select("text.curatorName").remove();
		})  

}

requestCurators();

