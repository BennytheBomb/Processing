var population;
var lifespan = 300;
var lifeP;
var genP;
var timeP;
var count = 0;
var target;
var maxforce = 0.2;
var generation = 0;
var obstacles = [];

function setup() {
  // put setup code here
  createCanvas(400, 300);
  population = new Population();
  lifeP = createP();
  genP = createP();
  timeP = createP();
  target = createVector(width/2, 50);
  obstacles[0] = new Obstacle(0, 200, 200, 10);
  obstacles[1] = new Obstacle(200, 100, 200, 10);
}

function draw() {
  // put drawing code here
  background(51);
  population.run();
  lifeP.html('Time left: ' + (lifespan - count));
  genP.html('Generation: ' + generation);

  count++;

  if (count == lifespan) {
    population.evaluate();
    population.selection();
    count = 0;
    generation++;
  }

  for (var i = 0; i < obstacles.length; i++) {
    obstacles[i].show();
  }

  ellipse(target.x, target.y, 16, 16);
}

function Obstacle(rx, ry, rw, rh) {
  this.rx = rx;
  this.ry = ry;
  this.rw = rw;
  this.rh = rh;

  this.show = function() {
    fill(255);
    rect(this.rx, this.ry, this.rw, this.rh);
  }
}
