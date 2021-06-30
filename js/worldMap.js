var m = document.getElementById('mapa');
var ancho = window.innerWidth;
var alto = window.innerHeight;

console.log("ANCHO");
console.log(ancho);

console.log("ALTO");
console.log(alto);

//getCoordenadas(artistsJson);

var svg = d3.select("svg")
			.call(d3.zoom().on("zoom", function () {
      			 svg.attr("transform", d3.event.transform)
   			 })),
di = document.getElementById('mapa'),
width = di.offsetWidth*0.7,
height = di.offsetHeight;


var path = d3.geoPath();
var projection = d3.geoMercator()
  .scale(140)
  .center([62,-71])
  .translate([width, height]);

// Data 
var data = d3.map();


d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .await(readyPuntos);

console.log("ArtistsJson desde mapa " + artistsJson)


var fecha = 1266; 


// Function to charge map and points first time
function readyPuntos(error, topo) {

  // Draw the map
  g = svg.append("g")
    .selectAll("path")
    .data(topo.features)
    .enter()
    .append("path")
      // draw each country
      .attr("d", d3.geoPath()
        .projection(projection)
      )
      // set the color of each country
      .attr("fill","cornsilk")
	  .attr("width","100%")
	  .attr("height","100%")
	  .attr("position", "relative");

	 
	for(a = 0; a<artistsJson.artists.length; a++){
		if(artistsJson.artists[a].years[0]<=fecha && artistsJson.artists[a].years[1]>=fecha){
			//getCoordenadas(artistsJson);
			coorX = artistsJson.artists[a].coordenadasXY[0];//+7;
			//console.log(coorX);
			coorY = artistsJson.artists[a].coordenadasXY[1];//*2;
			//console.log(coorY);
			var c = svg.append("circle")
					.attr("id", artistsJson.artists[a].name)
					.attr("cx",coorX)
					.attr("cy", coorY)
					.attr("r", 2)
					.attr("fill", artistsJson.artists[a].color)
					.attr("stroke", artistsJson.artists[a].color)
					.attr("stroke-width", 3)
					.attr("fill-opacity", 1)
					.on("click", colocarImagen)
					.on("mouseover",function(){
					d3.select(this)
						.attr('r', 8)
						//.append("title", info[j]);
						
					})
					.on("mouseout", function(){
						d3.select(this)
							.attr('r',2);
					});
				
		
		}
	}
	
	
	
}


// Function to charge points when date changes 
function cargarPuntos(newFecha){
	svg.selectAll('circle').remove()
	console.log("Nueva fecha " + newFecha);
	if(newFecha<1990 && newFecha>1265){
		newFecha = newFecha; 
	}else{
		newFecha = 1266;
	}
	console.log("Nueva fecha " + newFecha);
	document.getElementById('fecha').value = newFecha; 
	for(a = 0; a<artistsJson.artists.length; a++){
		//getCoordenadas(artistsJson);
		coorX = artistsJson.artists[a].coordenadasXY[0];//+7;
		//console.log(coorX);
		coorY = artistsJson.artists[a].coordenadasXY[1];//*2;
		//console.log(coorY);
		if(artistsJson.artists[a].years[0]<=newFecha && artistsJson.artists[a].years[1]>=newFecha){
			svg.append("circle")
					.attr("id", artistsJson.artists[a].name)
					.attr("cx", coorX)
					.attr("cy", coorY)
					.attr("r", 2)
					.attr("fill", artistsJson.artists[a].color)
					.attr("stroke", artistsJson.artists[a].color)
					.attr("stroke-width", 3)
					.attr("fill-opacity", 1)
					.on("click", colocarImagen)
					.on("mouseover",function(){
					d3.select(this)
						.attr('r', 8)
						//.append("title", info[j]);
						
					})
					.on("mouseout", function(){
						d3.select(this)
							.attr('r',2);
					});
				
		}
	}
}
  
// Function to set image when a point of the map is clicked on
function colocarImagen(){
	console.log(this.id);
	var l =  Object.keys(artistsJson.artists).length;
	if(document.getElementById("txtImagen")!=null){
			document.getElementById("txtImagen").remove(); 
	}
	for(i = 0; i<l; i++){
		if(artistsJson.artists[i].name == this.id){
			document.getElementById('ampliado').src = artistsJson.artists[i].urlImportante; 
			document.getElementById('titulo').innerHTML = artistsJson.artists[i].nameImportant; 
			document.getElementById('descripcion').innerHTML = artistsJson.artists[i].name +", (" + artistsJson.artists[i].years[0] + ", " + artistsJson.artists[i].years[1] + "), genre: " + artistsJson.artists[i].genre + ", nationality: " + artistsJson.artists[i].nationality + ".";
		}
	}
	
}
				 	
