// Function to select which graphic to generate depending on the one selected
function barras(){
	var s1 = document.getElementById('seleccion1').selected;
	var s2 = document.getElementById('seleccion2').selected;
	if(s1){
		ejes(ordGenero);
	}
	if(s2){
		ejes(ordPais);
	}
}

// Function which generate the bars of the data passed as argument
function ejes(datos){
	document.getElementById("barras").innerHTML = null;
	console.log(datos);
	var sv = d3.select("#barras"),
		 margin = {top: 20, right: 20, bottom: 30, left: 80},
		 width =330,
		 height =200;
	var xbar = [];
	for (i= 0; i<datos.length; i++){
		xbar[i] = i*(width/datos.length) + 90;
	}
	var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
	if (datos ==ordGenero){
		var y = d3.scaleLinear().rangeRound([height-20, 0]);
	}else{
		y = d3.scaleLinear().rangeRound([height-20, -20]);
	}	
var info = [];
for(j = 0; j<datos.length-1; j++){
	info[j] = "";
	if (datos == ordGenero){
		info[j]= info[j] + "Genre: " + datos[j].genero + " \n";
	}else{
		info[j] = info[j] + "Nation: " + datos[j].pais + " \n";
	}
	info[j] = info[j] + "Proportion: " + Math.round(datos[j].proporcion*1000)/10 +"%"; 
}	

if(datos==ordGenero){
	info[datos.length-1] = "";
	for(z = 0; z<resto.length; z++){
		info[datos.length-1] = info[datos.length-1] + "Genre: " + resto[z].genero + "\n";
		info[datos.length-1] = info[datos.length-1] + "Proportion: " + Math.round(resto[z].proporcion*1000)/10 +"%\n\n"; 
	}
	info[datos.length-1] = info[datos.length-1] + "Total: " + Math.round(datos[datos.length-1].proporcion*1000)/10 +"%"
}else{
	info[datos.length-1] = ""; 
	for(z = 0; z<resto2.length; z++){
		info[datos.length-1] = info[datos.length-1] + "Nation: " + resto2[z].pais + "\n";
		info[datos.length-1] = info[datos.length-1] + "Proportion: " + Math.round(resto2[z].proporcion*1000)/10 +"%\n\n"; 
	}
	info[datos.length-1] = info[datos.length-1] + "Total: " + Math.round(datos[datos.length-1].proporcion*1000)/10 +"%"
}


console.log(info);
var g = sv.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
					
var xAxis = d3.axisBottom(x);
var nticks = 5; 
if(datos == ordGenero){
	nticks = 10;
}
var yAxis = d3.axisLeft(y).ticks(nticks, "%");
			
					  // Define Extent for each Dataset
x.domain(datos.map(function(d) { return d.sname; }));
y.domain([0, d3.max(datos, function(d) { return d.proporcion; })]);
					
	// Add Axes
	// X AXIS
	g.append("g")
		.attr("class", "axis axis--x")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);
	// Y AXIS
	g.append("g")
		.attr("class", "axis axis--y")
		.call(yAxis)
	 .append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", "0.71em")
		.attr("text-anchor", "end")
		.text("Frequency");
	
    for (j = 0; j<datos.length; j++){
		sv.append('rect')
				.attr('class', 'tooltip')
				.style('x', xbar[j])
				.style('y',(height - datos[j].proporcion*1000))
				.style('width',11)
				.style('height', (datos[j].proporcion*1000))
				.style('fill', 'grey')
				.on("mouseover",function(){
					d3.select(this)
						.style('fill', 'orange')
						
				})
				.on("mouseout", function(){
					d3.select(this)
						.style('fill','grey');
				})
				.append('title')
					.style('x',xbar[j])
					.style('y',height/2)
					.attr('class', 'tooltiptext')
					.text(info[j])
	}	
	
	
}
