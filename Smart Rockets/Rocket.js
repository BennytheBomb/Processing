function Rocket(dna) {
  this.pos = createVector(width/2, height);
  this.vel = createVector();
  this.acc = createVector();
  this.completed = false;
  this.crashed = false;
  this.timeToComplete = 1;
  this.crashlessTime = 1;

  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;

  this.applyForce = function(force) {
    this.acc.add(force);
  }

  this.calcFitness = function() {
    var d = this.distToTarget();

    // this.fitness = pow(map(d, 0, width, width, 0)/this.timeToComplete,2);
    this.fitness = (lifespan - this.timeToComplete)/(d+1);

    if (this.completed) {
      this.fitness *= 100;
    }
    if (this.crashed) {
      this.fitness /= (lifespan - this.crashlessTime);
    }
  }

  this.distToTarget = function() {
    return dist(this.pos.x, this.pos.y, target.x, target.y)
  }

  this.update = function() {
    var d = this.distToTarget();

    if (d < 10) {
      this.completed = true;
      this.pos = target.copy();
      this.timeToComplete = count;
    }

    for (var i = 0; i < obstacles.length; i++) {
      var o = obstacles[i];
      if (!this.crashed && (this.pos.x > o.rx && this.pos.x < o.rx + o.rw && this.pos.y > o.ry && this.pos.y < o.ry + o.rh)) {
        this.crashed = true;
        this.crashlessTime = count;
      }
    }

    if (!this.crashed && (this.pos.x > width || this.pos.x < 0)) {
      this.crashed = true;
      this.crashlessTime = count;
    }

    if (!this.crashed && (this.pos.y > height || this.pos.y < 0)) {
      this.crashed = true;
      this.crashlessTime = count;
    }

    this.applyForce(this.dna.genes[count]);
    if (!this.completed && !this.crashed) {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(5);
    }
  }

  this.show = function() {
    push();
    noStroke();
    //fill(255, 100);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    rectMode(CENTER);
    rect(0, 0, 25, 5);
    pop();
  }
}
