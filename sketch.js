var width;
var height;
var player;
var collide = false;
var food = [];

function setup() {
	width = window.innerWidth;
	height = window.innerHeight;
	createCanvas(width, height)
	backgroundColor = color(51);
	
	var middle = createVector(width/2, height/2);
	player = new Player(30, middle);
	
	for (var i=0; i<20; i++){
		newpos = createVector(random(width),random(height))
		newfood = new Food(newpos);
		food.push(newfood);
	}
}

function draw() {
	background(51);
	
	for (var i=0; i<food.length; i++){
		food[i].render();
		
		if (collideCircleCircle(player.pos.x, player.pos.y, player.rad, food[i].pos.x, food[i].pos.y, food[i].size)){
			food.splice(i,1);
			player.eat();
		}
	}
	
	player.render();
	player.update();
}

function Player(rad, pos){
	this.rad = rad;
	
	this.acc = createVector(0,0);
	this.vel = createVector(0,0);
	this.pos = pos;
	
	this.update = function(){
		this.mouse = createVector(mouseX, mouseY);
		this.mouse.sub(this.pos);
		this.acc = createVector(this.mouse.x*.1, this.mouse.y*.1);
		
		this.vel.add(this.acc);
		this.vel.limit(10);
		this.pos.add(this.vel);
	}
	
	this.render = function(){
		fill(255,118,0);
		ellipse(this.pos.x, this.pos.y, this.rad);
	}
	
	this.eat = function(){
		this.rad+=2;
	}
	
}

function Food(pos){
	this.pos = pos;
	this.size = 7;
	
	this.render = function(){
		fill(0,150,255);
		ellipse(this.pos.x, this.pos.y, this.size);
		
	}
	
}