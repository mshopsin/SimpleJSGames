var Fleet = (function(){ //<--
  Ship.SHEILD_RADIUS = 14;
  function Ship(x,y, game){
    this.velocity = new Object();
    this.velocity['x'] = 0;
    this.velocity['y'] = 0;
    this.centerX = x;
    this.centerY = y;
    this.game = game;
  }

  Ship.prototype.update = function(){
    this.centerX += this.velocity['x'];
    this.centerY += this.velocity['y'];
  };

  Ship.prototype.power = function(dx, dy){
    this.velocity['x'] += dx;
    this.velocity['y'] += dy;
  };

  Ship.prototype.draw = function(ctx){
    // ctx.fillStyle = "black";
    // ctx.beginPath();
    // ctx.moveTo(this.centerX,this.centerY);
    // ctx.quadraticCurveTo(this.centerX,this.centerY,
    //   this.centerX+this.velocity['x'],
    //   this.centerY+this.velocity['y']);
    // ctx.stroke();

    ctx.fillStyle = "blue";
    ctx.beginPath();

    ctx.arc(
      this.centerX,
      this.centerY,
      Ship.SHEILD_RADIUS,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();


  };

  Ship.prototype.isHit = function(){
    //check to see if hit
    for(var i = 0; i < this.game.asteroids.length; i++){
      // console.log(this.distance(this.game.asteroids[i]));
      if( this.distance(this.game.asteroids[i]) < 1.5 * Ship.SHEILD_RADIUS){
        return true;
      }
    }
    return false;
  };

  Ship.prototype.distance = function(asteroid){
    var x_sqr = Math.pow((asteroid.centerX - this.centerX),2);
    var y_sqr = Math.pow((asteroid.centerY - this.centerY),2);
    return Math.sqrt(x_sqr + y_sqr);
  }


  return{
    Ship: Ship
  };

})();