var GameModel = function(w,h,dir,startX,startY){
  this.w = w;
  this.h = h;
  this.direction = dir;//N 0, E 1, S 2, W 3
  this.x = startX;
  this.y = startY;
  this.board = [];
}

GameModel.prototype.buildBoard = new function(){
  for(var i = 0; i < w; i++){
    var row = [];
    for(var j = 0; j < h; j++){
      row.push('_');
    }
    this.board.push(row);
  }
}

GameModel.prototype.step = new function(){

}


var GameController = new function(){

}
