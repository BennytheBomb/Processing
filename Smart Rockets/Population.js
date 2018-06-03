function Population() {
  this.rockets = [];
  this.popsize = 30;
  this.matingpool = [];
  this.bestRocket;
  this.bestTime = lifespan;

  for (var i = 0; i < this.popsize; i++) {
    this.rockets[i] = new Rocket();
  }

  this.evaluate = function() {
    var maxfit = 0;
    var index;
    var time = 0;
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].calcFitness();
      if (this.rockets[i].fitness > maxfit) {
        maxfit = this.rockets[i].fitness;
        index = i;
      }
      time = this.rockets[i].timeToComplete;
      // console.log(time);
      if (time < this.bestTime && time != 1) {
        this.bestTime = time;
      }
    }
    // console.log(maxfit);
    this.bestRocket = this.rockets[index].pos;

    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i].fitness /= maxfit;
    }

    // Probability Function
    // this.matingpool = [];
    //
    // for (var i = 0; i < this.popsize; i++) {
    //   var n = this.rockets[i].fitness * 100;
    //   for (var j = 0; j < n; j++) {
    //     this.matingpool.push(this.rockets[i]);
    //   }
    // }


  }

  this.pickOne = function() {
    var index = 0;
    var r = random(1);

    var sum = 0;
    for (var i = 0; i < this.popsize; i++) {
      sum += this.rockets[i].fitness;
    }

    while(r > 0) {
      r -= this.rockets[index].fitness/sum;
      index++;
    }
    index--;

    return this.rockets[index];
  }

  this.selection = function() {
    var newRockets = [];
    for (var i = 0; i < this.rockets.length; i++) {
      // var parentA = random(this.matingpool).dna;
      // var parentB = random(this.matingpool).dna;

      var parentA = this.pickOne().dna;
      var parentB = this.pickOne().dna;

      var child = parentA.crossover(parentB);
      child.mutation();

      newRockets[i] = new Rocket(child)
    }
    this.rockets = newRockets;
  }

  this.run = function() {
    var shortestDist = this.rockets[0].distToTarget();
    var index = 0;

    for (var i = 0; i < this.popsize; i++) {
      for (var j = 0; j < this.popsize; j++) {
        var dist = this.rockets[j].distToTarget();
        if (dist < shortestDist) {
          shortestDist = dist;
          index = j;
        }
      }

      if (index === i) {
        fill(255, 0, 255, 100);
      } else {
        fill(255, 100)
      }

      this.rockets[i].show();
      this.rockets[i].update();
    }

    stroke(255, 0, 255, 100);
    line(target.x, target.y, this.rockets[index].pos.x, this.rockets[index].pos.y);

    stroke(0, 255, 0);
    if (this.bestRocket) {
      line(this.bestRocket.x, this.bestRocket.y, target.x, target.y);
    }

    stroke(0);
  }
}
