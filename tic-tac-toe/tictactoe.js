//model

var GameModel = function() {

  this.board = [['_','_','_'],
               ['_','_','_'],
               ['_','_','_']];

  this.won = false;
}

var gm = new GameModel();

GameModel.prototype.catsGame = function(){
  for(var i = 0; i < 3; i++){
    for(var j = 0; j < 3; j++){
      if(gm.board[i][j] == '_'){
        return(false);
      }
    }
  }
  return(true);
}

GameModel.prototype.vertical = function(){
  for(var i = 0; i < 2; i++){
    if(gm.board[i][0] == gm.board[i][1] &&
       gm.board[i][1] == gm.board[i][2] &&
       gm.board[i][0] != '_' ){
         return gm.board[i][0];
    }
  }
  if(gm.board[2][0] == gm.board[2][1] &&
     gm.board[2][1] == gm.board[2][2] &&
     gm.board[2][0] != '_')
     {
       return(gm.board[2][0]);
     };
  return null;
}
GameModel.prototype.horizontal = function(){
  for(var i = 0; i < 2; i++){
    if(gm.board[0][i] == gm.board[1][i] &&
       gm.board[1][i] == gm.board[2][i] &&
       gm.board[2][i] != '_' ){
         return gm.board[0][i];
    }
  }
  if(gm.board[0][2] == gm.board[1][2] &&
     gm.board[2][2] == gm.board[0][2] &&
     gm.board[0][2] != '_')
     {
       return(gm.board[0][2]);
     };
  return null;
}

GameModel.prototype.diagonal = function(){
  if(gm.board[0][0] == gm.board[1][1] &&
     gm.board [1][1] == gm.board[2][2] &&
     gm.board [0][0] != '_'){
       return gm.board[0][0];
     }
   if(gm.board[2][0] == gm.board[1][1] &&
      gm.board [1][1] == gm.board[0][2] &&
      gm.board [2][0] != '_'){
        return gm.board[2][0];
      }
    return(null);
}


GameModel.prototype.winner = function(){
  gm.won = true;
  if(gm.diagonal() != null){
    return(gm.diagonal());
  }
  if(gm.horizontal() != null){
     return(gm.diagonal());
  }
  if(gm.vertical() != null){
     return(gm.diagonal());
  }
  gm.won = false;
  return(false);
}




var GameController = function(state) {
  this.state=state;

}

var gc = new GameController();

GameController.prototype.announceState = function(msg){
  $('#msg').text(msg);
}


GameController.prototype.gameTurn = function() {
 var winner = gm.winner();
 if(winner){
   gc.announceState(winner + ' wins!');
 }
 if(gm.catsGame()){
   gm.won = true;
   gc.announceState('Cats Game ,,,^..^,,,~ ');
 }

 if(!gm.won && !gm.winner()){
   gc.announceState(gc.oppositeState() + " Your Turn!!!")
 }else if(!gm.won && !winner){
   gc.announceState(winner + ' wins!');
 }
}


GameController.prototype.addClick = function(tag,col,row){
  this.col = col;
  this.row = row;
  $(tag).click(function(col,row){

    if(gm.won){
      return;
    }
    if( gm.board[tag[2]][tag[3]] != '_' ){
      gc.announceState('Invalid move');
      return;
    }
    gm.board[tag[2]][tag[3]] = gc.toggleState();
    $(tag).text(gm.board[tag[2]][tag[3]]);

    gc.gameTurn();

  });
}


GameController.prototype.oppositeState = function(){
    return (this.state == 'O')?'X':'O';
}

GameController.prototype.toggleState = function(){
  this.state = this.oppositeState();
  return this.state;
}

GameController.prototype.setupBoard = function(){
  for(var r = 2; r >= 0; r--){
    for(var c = 2; c >= 0; c--){
      gm.board[r][c] = '_';
      this.addClick('#b'+ c  + r,c,r);
    }
  }
}


$(function(){

  gm.won = false;
  gc.announceState('X turn');
  gc = new GameController('O');
  gc.setupBoard();

});

//controller


//view

