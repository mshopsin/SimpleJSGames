var Asteroids = (function() {
  function Asteroid(centerX, centerY, radius, velocity) {
    this.centerX = centerX
    this.centerY = centerY;
    this.radius = radius;
    this.velocity = velocity;
  }

  Asteroid.MAX_RADIUS = 25;
  Asteroid.randomAsteroid = function (maxX, maxY) {
    var velocity = new Object();
    velocity['x']  =  17 * Math.random()*(0.5 - Math.random());
    velocity['y']  =  17 * Math.random()*(0.5 - Math.random());
    return new Asteroid(
      maxX * Math.random(),
      maxY * Math.random(),
      Asteroid.MAX_RADIUS * Math.random(),
      velocity
    );
    console.log("new asteroid");
  };

  Asteroid.prototype.update = function() {
    //update position
    this.centerX += this.velocity['x'];
    this.centerY += this.velocity['y'];
  };

  Asteroid.prototype.draw = function (ctx) {
    ctx.fillStyle = "black";
    ctx.beginPath();

    ctx.arc(
      this.centerX,
      this.centerY,
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();

  };
  Game.NUMBER_ASTEROIDS = 15;
  function Game(width, height, num){
    this.width = width;
    this.height = height;

    this.ship = new Fleet.Ship(250, 250, this);

    this.asteroids = []
    for (var i = 0; i < Game.NUMBER_ASTEROIDS; ++i) {
      this.asteroids.push(Asteroid.randomAsteroid(width, height));
    }
  }

  Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (var i = 0; i < this.asteroids.length; ++i) {
      this.ship.draw(this.ctx);
      this.asteroids[i].draw(this.ctx);
    }
    if(this.ship.isHit()){
      clearInterval(this.gameInterval);
      this.gameOverMessage();
    }

  };




  Game.prototype.update = function() {



    this.stepAsteroids();

    this.loopAsteroid();

    this.maintainNumberAsteroids();

  }

  Game.prototype.gameOverMessage = function(){
    console.log('Game over');
    console.log(this.ctx);
    this.ctx.font = "bold 36px sans-serif";
    this.ctx.fillStyle = "#FF0000";
    this.ctx.textBaseline = 'bottom';
    this.ctx.fillText("Game Over", 100, 100);

    // this.ctx.strokeStyle = "#FF0000";

    // console.log(this.ctx);
    // console.log(this.ctx.font);

    // this.ctx.fillRect(20,20,150,100);
  }

  Game.prototype.stepAsteroids = function(){
    for (var i = 0; i < this.asteroids.length; ++i) {
      this.asteroids[i].update();
    }
  }

  Game.prototype.loopAsteroid = function(){
    var that = this;
   // this.asteroids =
    this.asteroids.forEach(function(element){

      // console.log(element.centerX );
      if ( (element.centerX + element.radius) > that.width){
        element.centerX -= that.width;
      }
       if ( (element.centerX - element.radius) < 0){
             element.centerX += that.width;
           }
       if((element.centerY + element.radius) > that.height){
         element.centerY -= that.height;
       }
       if((element.centerY - element.radius) < 0){
          element.centerY += that.height;

        }
    });
  }

  Game.prototype.maintainNumberAsteroids = function(){
    while (this.asteroids.length < Game.NUMBER_ASTEROIDS) {
      this.asteroids.push(Asteroid.randomAsteroid(this.width,this.height));
    }
  }


  Game.prototype.start = function (canvasEl) {
    // get a 2d canvas drawing context. The canvas API lets us call
    // a `getContext` method on a cnvas DOM element.
    this.ctx = canvasEl.getContext("2d");

    // render at 60 FPS
    var that = this;
    this.gameInterval = window.setInterval(function () {
      that.update();
      that.draw(this.ctx);
    }, 100 );
  };

  return {
    Asteroid: Asteroid,
    Game: Game
  };

})();