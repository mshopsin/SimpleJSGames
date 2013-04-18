

var GameModel = function(w,h,dir,startX,startY){
  this.gameOver = false
  this.w = w;
  this.h = h;
  this.direction = dir;//N 0, E 1, S 2, W 3
  this.x = startX;
  this.y = startY;
  this.board = new Array();
  this.blank = ' ';
  this.snakeBody = 'o';
  this.snakeHead = 'e';
  this.fruit  = '';
  this.score = 0;
  this.snakeLength = 4;
  this.snakeHistory = new Array();
}

GameModel.prototype.addFruit = function(){
  var fx = Math.floor(Math.random()*this.w);
  var fy = Math.floor(Math.random()*this.h);

  if(this.board[fy][fx] == this.blank){
    this.board[fy][fx] = this.fruit;
  }else{
    this.addFruit();
  }
}

GameModel.prototype.buildBoard = function(){
  for(var i = 0; i < this.w; i++){
    var row = [];
    for(var j = 0; j < this.h; j++){
      row.push(this.blank);
    }
    this.board.push(row);
  }
}

GameModel.prototype.resetGame = function(){
  this.board = new Array();
  this.score = 0;
  this.snakeLength = 4;
  this.snakeHistory = new Array();
  this.direction = Math.floor(Math.random()*4);

  this.x = Math.floor(Math.random()*(width/2));

  this.y = Math.floor(Math.random()*(height/2));

  this.buildBoard();

}

GameModel.prototype.north =  function(){
  this.direction = 0;
}


GameModel.prototype.east =  function(){
  this.direction = 1;
}


GameModel.prototype.south =  function(){
  this.direction = 2;
}


GameModel.prototype.west =  function(){
  this.direction = 3;
}

GameModel.prototype.step =  function(){
  if(this.gameOver){
    return;
  }
  var oldX = this.x;
  var oldY = this.y;
  //moving
  switch(this.direction){
    //North
    case 0:
      this.y--;
      break;
    case 1:
      this.x++;
      break;
    case 2:
      this.y++;
      break;
    case 3:
      this.x--;
      break;
  }

  if(this.detectCollision()){
    this.gameOver = true;
    alert("you lose");
  }

  //modify the board
  this.board[oldY][oldX] = this.snakeBody;
  this.board[this.y][this.x] = this.snakeHead;
  this.snakeHistory.push(new Array(oldY,oldX));
  this.cleanupTail();

  this.score++;

}

GameModel.prototype.getScore = function(){
  return this.score;
}

GameModel.prototype.cleanupTail = function(){

  while(this.snakeHistory.length > this.snakeLength){
    removeElement = this.snakeHistory.shift();

    this.board[removeElement[0]][removeElement[1]] = this.blank;
  }
}

GameModel.prototype.offBoard = function(){
  if(this.x >= this.w || this.x < 0 ){
    return true;
  }
  if(this.y >= this.h || this.y < 0 ){
    return true;
  }
  return false;
}

GameModel.prototype.hitSelf = function(){
  if(this.board[this.y][this.x] != this.blank){
    return true;
  }
  return false;
}

GameModel.prototype.onFruit = function(){
  if(this.board[this.y][this.x] == this.fruit){
    return true;
  }
  return false;
}

GameModel.prototype.eatFruit = function(){
  this.snakeLength++;
  this.board[this.y][this.x] = this.blank;
  this.addFruit();
}

GameModel.prototype.detectCollision =  function(){
  if (this.onFruit()) {
    this.eatFruit();
    return false;
  } else if (this.offBoard() || this.hitSelf()) {
    return true;
  } else {
    return false;
  }

  return false;
}


var GameView = function(gameModel){
  this.board = gameModel.board;
  this.w     = gameModel.w;
  this.h     = gameModel.h;
  this.gameModel = gameModel
}

GameView.prototype.setupBoard =  function(){

  for(var i = 0; i < this.h; i++){
    $('#gameTable').append($('<tr height=25 >').attr('id','r'+i));
      for(var j = 0; j < this.w; j++){
        var cell = $('#r'+i).append($('<td width=25>').attr('id','r'+i+'c'+j));
        $('#r'+i+'c'+j).text(' ');
      }
  }

  this.drawBoard();
  return;
}

GameView.prototype.drawBoard = function(){
  for(var i = 0; i < this.h; i++){
    for(var j = 0; j < this.w; j++){
      $('#r'+i+'c'+j).text(this.board[i][j]);
    }
  }

  $('#score').text(this.gameModel.score);

}

var GameController = function(gameModel,gameView){
  this.gm = gameModel;
  this.gv = gameView;
  var that = this;
  $(document).keydown(function(e){

    switch(e.keyCode){
      case 37:

        that.gm.west();
        break;
      case 38:

        that.gm.north();
        break;
      case 39:

        that.gm.east();
        break;
      case 40:
        that.gm.south();
        break;
      case 82:
        that.gm.resetGame();
        break;

    }

  });
}

GameController.prototype.setupKeyBindings = function() {

}

GameController.prototype.advance = function(){
  this.gm.step();
  this.gv.drawBoard();

  //if(!this.gm.gameOver){

  //}
}

var Game = function(width,height){
  var bearing = Math.floor(Math.random()*4);

  var startX = Math.floor(Math.random()*(width/2));

  var startY = Math.floor(Math.random()*(height/2));


  this.gm = new GameModel(width,height,bearing,startY,startX);

  this.gv = new GameView(this.gm);

  this.gc = new GameController(this.gm,this.gv);



}

Game.prototype.start = function(){
  this.gm.buildBoard();
  this.gm.addFruit();

  this.gv.setupBoard();

  this.gc.setupKeyBindings();

  window.setInterval(this.gc.advance.bind(this.gc), 200);
}


$(function(){

  var g = new Game(15,15);
  g.start();
});

//<link rel="stylesheet" href="snake.css" />

