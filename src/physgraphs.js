//GLOBAL CONSTANTS
FR = 30; // must match the framerate of the draw function.

//Declaration for a point object to be used when graphing.
function Point(x,y){
	//basic coordinate variables
	this.x = x;
	this.y = y;
}
Point.prototype.add = function(x,y){
	this.x += x;
	this.y -= y;
};
//fixes the y choordinates to work with p5.js
Point.prototype.fixChoord = function(){
	if(this.y > 0){
		this.y = this.y*-1; //inverts the y axis so that positive is up not down
	}
};
//inverts both choordinates
Point.prototype.invert = function(){
	this.y *= -1;
	this.x *= -1;
};
//convert choord to pixel position
Point.prototype.makePix = function(xoff, yoff, scalex, scaley){

	this.fixChoord();
	this.x = this.x*scalex+xoff;
	this.y = this.y*scaley+yoff;

};
/*
 * input = takes in two point objects
 * output = returns a new point object
 * whose x and y coords are the respective x and y distances.
 * (basically using the point object like a vector)*/
Point.getDist = function(p1,p2){
	var pFinal = new Point(0,0);
	pFinal.x = Math.abs(p1.x-p2.x); //gets the x distance between points
	pFinal.y = Math.abs(p1.y-p2.y); //gets the y distance between points
	return pFinal;
};
Point.getPoint = function(p){
	var point = new Point(p.x,p.y);
	return point;
};
//a function object for graphing functions
function Equation(){
	//not implemented
}

/*Declaration of plot object which will be graphed
 * on graph object
 * */
function Plot(pointArray, red, green, blue, weight, title = "default"){
	this.data = pointArray; //plot data (an array of points)
	this.color = color(red, green, blue, title = "default"); //the color that the graph will be drawn in
	this.weight = weight; // a number for the stroke thickness of the graph
	this.pointSize = 8;
	this.drawData = true;
	this.plotTitle = title;
	this.timeplot = false;
}
//regular plotting function
Plot.prototype.plot = function(graph){
	//set up the styles for what will be drawn
	fill(this.color);
	stroke(this.color);
	strokeWeight(this.weight);

	//draws the data points and the connecting lines
	for(var i = 0;i<this.data.length;i++){

		if(i<this.data.length-1
			&& this.data[i+1].x <= graph.tr_pix.x
			&& this.data[i+1].y >= graph.tr_pix.y
			&& this.data[i].x >= graph.bl_pix.x
			&& this.data[i].y <= graph.bl_pix.y){
		//if(i<this.data.length-1){
			//draws the connecting lines, scaling the data so that
			//it corresponds to our coordinate space
			line(this.data[i].x, this.data[i].y,
					this.data[i+1].x, this.data[i+1].y);
		}
		//draws the data points, with scaling and offset.
		if(this.data[i].x <= graph.tr_pix.x
			&& this.data[i].y >= graph.tr_pix.y
			&& this.data[i].x >= graph.bl_pix.x
			&& this.data[i].y <= graph.bl_pix.y){
			ellipse(this.data[i].x, this.data[i].y, this.pointSize, this.pointSize);
		}

	}
};

//updates data to user input
Plot.prototype.getUser = function(){
	var d = new Point(0,0);
	var pmouse = new Point(mouseX,mouseY);
	var closest = 100000;
	var closestIndex = 0;
	for(var i=0;i<this.data.length;i++){

		d = Point.getDist(pmouse,this.data[i]);
		if(closest > d.x){
			closest = d.x;
			closestIndex = i;
		}
	}
	//TODO: add boundary limits to this funtion.
	this.data[closestIndex].y = mouseY;
};
Plot.prototype.tpRecord = function(variable, graph){
	this.timeplot = true;
	var bl = graph.bl_pix.x;
	var tr = graph.x_max;
	//var timescale = (tr-bl)/100;
	//var timescale = (graph.x_max-graph.x_min)/graph;
	var timescale = FR;
	for(var i=0;i<this.data.length;i++){
		this.data[i].x -= graph.xunit/timescale; //shift the x-axis
	}
	if(this.data[0] && this.data[0].x < bl){
		this.data.splice(0,1);
	}

	var p = new Point(tr, variable);
	this.data.push(p);

};
//gets distance between two points of data
Plot.prototype.getPointDist = function(num1, num2){
	return dist(this.data[num1].x, this.data[num1].y,
				this.data[num2].x, this.data[num2].y);
};
Plot.prototype.fixChoord = function(scalex, scaley, origin){
	var p = Point.getPoint(origin);
	for(var i = 0;i<this.data.length;i++){
		//this.data[i].fixChoord();
		p.add(this.data[i].x*scalex, this.data[i].y*scaley);
		this.data[i].x = p.x;
		this.data[i].y = p.y;
		p = Point.getPoint(origin);
	}
};

function Graph(w, h, x_min, x_max, y_min, y_max, resolution){

	// initial variables

	this.width = w;
	this.height = h;
	this.resolution = resolution;
	this.x_min = x_min;
	this.x_max = x_max;
	this.y_min = y_min;
	this.y_max = y_max;


	//styling variables
	this.title = "Title"
	this.xlabel = "X-Axis";
	this.ylabel = "Y-Axis";
	this.showLabels = true;
	this.showTitle = true;
	this.showBorder = true;
	this.borderWidth = 2;
	this.showLegend = false;

	this.x_offset = 0;
	this.y_offset = 0;

	//functional variables
	this.plots = [];

	/* bl = bottom left. coordinates of where the actual graph begins.
	 * tr = top right.
	 * this is used for determining correct positioning of graph coordinates.
	 * */
	this.bl_pix = new Point(this.x_offset+this.width*0.15,
								this.y_offset+this.height*0.95);
	this.tr_pix = new Point(this.x_offset+this.width*0.95,
								this.y_offset+this.height*0.15);
	this.bl_val = new Point(this.x_min, this.y_min);
	this.bl_val.invert();

	//xpix and ypix are the number of pixels between each labeled coord.
	this.xpix = dist(this.bl_pix.x, this.bl_pix.y,
					this.tr_pix.x, this.bl_pix.y)/this.resolution; //xScale in pixels
	this.ypix = dist(this.bl_pix.x, this.bl_pix.y,
					this.bl_pix.x, this.tr_pix.y)/this.resolution; //yScale in pixels

	//xunit and yunit are the number of pixels one unit on the graph is.
	this.xunit = dist(this.bl_pix.x, this.bl_pix.y,
					this.tr_pix.x, this.bl_pix.y)/(this.x_max-this.x_min); //xUnitScale
	this.yunit = dist(this.bl_pix.x, this.bl_pix.y,
					this.bl_pix.x, this.tr_pix.y)/(this.y_max-this.y_min); //yUnitScale

	this.origin = Point.getPoint(this.bl_pix);
	this.origin.add(this.bl_val.x*this.xunit, this.bl_val.y*this.yunit);
	//console.log(this.origin.x, this.origin.y);


}
//redraw background and plots
Graph.prototype.update = function(){

};
//draw the axis, labels, etc... (the graph without the curves)
Graph.prototype.set_offset = function(xoff,yoff){
	this.x_offset = xoff;
	this.y_offset = yoff;

	this.bl_pix = new Point(this.x_offset+this.width*0.15,
								this.y_offset+this.height*0.85);
	this.tr_pix = new Point(this.x_offset+this.width*0.90,
								this.y_offset+this.height*0.15);
	this.bl_val = new Point(this.x_min, this.y_min);
	this.bl_val.invert();


	this.xpix = dist(this.bl_pix.x, this.bl_pix.y,
					this.tr_pix.x, this.bl_pix.y)/this.resolution; //xScale in pixels
	this.ypix = dist(this.bl_pix.x, this.bl_pix.y,
					this.bl_pix.x, this.tr_pix.y)/this.resolution; //yScale in pixels

	this.xunit = dist(this.bl_pix.x, this.bl_pix.y,
					this.tr_pix.x, this.bl_pix.y)/(this.x_max-this.x_min); //xUnitScale
	this.yunit = dist(this.bl_pix.x, this.bl_pix.y,
					this.bl_pix.x, this.tr_pix.y)/(this.y_max-this.y_min); //yUnitScale

	this.origin = Point.getPoint(this.bl_pix);
	this.origin.add(this.bl_val.x*this.xunit, this.bl_val.y*this.yunit);
	console.log(this.origin.x, this.origin.y);
}
Graph.prototype.drawBg = function(bg = color(255), border = color(0)){

	//border
	if(this.showBorder == false){
		noStroke();
	}else{
		stroke(border);
		strokeWeight(this.borderWidth);
	}

	//set background color of graph
	fill(bg);

	//draw base layer of graph
	rect(this.x_offset,
		 this.y_offset,
		 this.width,
		 this.height);

	strokeWeight(1);

	//draw axis
	stroke(0);
	line(this.bl_pix.x, this.bl_pix.y,
			this.tr_pix.x, this.bl_pix.y) //x border
	line(this.bl_pix.x, this.bl_pix.y,
			this.bl_pix.x, this.tr_pix.y) //y border

	//compute resolution values (numeric values)
	var xdiff = (this.x_max - this.x_min)/this.resolution;
	var ydiff = (this.y_max - this.y_min)/this.resolution;

	//draw x values and vertical lines
	fill(0);
	stroke(180);
	var count = this.x_min; //for counting intermediary values
	var pixCount = 0;
		//draw min label
		text(this.x_min, this.bl_pix.x, this.bl_pix.y+20);
	for(var i = 0; i < this.resolution; i++){
		count += xdiff;
		pixCount += this.xpix;
		line(this.bl_pix.x + pixCount, this.bl_pix.y+5,
				this.bl_pix.x + pixCount, this.tr_pix.y);
		text((Math.round(10*count)/10).toString(), this.bl_pix.x + pixCount, this.bl_pix.y+20);
	}

	//draw y values and horizontal lines
	var count = this.y_min; //for counting intermediary values
	var pixCount = 0;
		//draw min label
		text(this.y_min, this.bl_pix.x - 20, this.bl_pix.y);
	for(var i = 0; i < this.resolution; i++){
		count += ydiff;
		pixCount += this.ypix;
		line(this.bl_pix.x - 5, this.bl_pix.y-pixCount,
				this.tr_pix.x, this.bl_pix.y-pixCount);
		text((Math.round(10*count)/10).toString(), this.bl_pix.x - 20, this.bl_pix.y-pixCount);
	}

	//draw title AND axis labels AND legend
	if(this.showTitle == true){
		textSize(16);
		textAlign(CENTER,CENTER);
		if(this.showLegend != true){
			text(this.title, this.x_offset + this.width/2,
					this.y_offset + this.height*.07);
		}
		else{
			//shift the title out of the way of the legend
			//eg--split the space above the graph between them.
			textSize(16);
			textAlign(CENTER,CENTER);
			text(this.title, this.x_offset + this.width/4,
					this.y_offset + this.height*.07);

			//draw frame
			fill(bg);
			stroke(border);

			var top = this.y_offset+this.height*0.02;
			var left= this.x_offset+this.width/2;
			rect(left, top, this.width/2.2, this.height*.1);
			//code for drawing legend.
			textSize(12);
			textAlign(LEFT,TOP);
			noStroke();
			fill(0);
			for(var i=0;i<this.plots.length;i++){
				text(this.plots[i].plotTitle, left+8,top+2);
				top+=12; //shift the count down a line.
			}
		}
	}

	if(this.showLabels == true){
		//xlabel
		textAlign(CENTER,CENTER);
		textSize(12);
		text(this.xlabel,this.x_offset + this.width/2,this.y_offset + this.height*.97);
		//ylabel
		push();
		translate(this.x_offset+this.width*.03-10,this.y_offset + this.height/2)
		rotate(-Math.PI/2);
		text(this.ylabel,0,0)
		pop();
	}

};
//plots all plots on this graph
Graph.prototype.plotAll = function(){
	for(var i = 0; i<this.plots.length;i++){
		if(this.plots[i].timeplot == true){
			var temp = new Plot();
			temp.data = [];
			temp.data[0] = this.plots[i].data[this.plots[i].data.length-1];
			temp.fixChoord(this.xunit,
							this.yunit,
							this.origin);
			this.plots[i].data[this.plots[i].data.length-1] = temp.data[0];
		}
		this.plots[i].plot(this);
	}
};
//add a new plot to the graph.
Graph.prototype.addPlot = function(aplot){
	//var temp = this.getZeroes();
	aplot.fixChoord(this.xunit,
					this.yunit,
					this.origin);
	this.plots.push(aplot);
};
//get the x and y zero.
Graph.prototype.getZeroes = function(){

};
//get pixel x and y values for a point in the graph.
Graph.prototype.getChoord = function(x, y){

};

//this might make more sense to put as part of the Plot object
Graph.makeData = function(xarray, yarray){
	var finalArray = [];
	if(xarray.length == yarray.length){
		for(var i = 0; i<xarray.length;i++){
			var p = new Point(xarray[i],yarray[i]);
			finalArray.push(p);
		}
	}
	else{
		console.log("xarray and yarray lengths differ.");
	}
	return finalArray;
};

//this might make more sense to put as part of the Plot object
Graph.makeUserPlot = function(x1, x2, resolution, colour = color(0), weight = 1, psize = 3){
	var finalArray = [];
	var templot = new Plot();
	templot.data = [];
	templot.weight = weight;
	templot.pointSize = psize;
	templot.color = colour;
	var scale = (x2-x1)/resolution;
	for(var i = x1;i<x2;i += scale){
		var p = new Point(i,0);
		templot.data.push(p);
	}

	return templot;
};
