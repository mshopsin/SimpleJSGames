// var Cat = function(name) {
//   this.name = name;
//   return 'hello';
// }
//
// var myCat = Cat('Jim');
// console.log(myCat);
// console.log(myCat.length);



var Hanoi = function(){
  this.towers = [[3, 2, 1], [], []];

}

Hanoi.prototype.checkWin = function(){
  return (this.towers[2].toString() == [3, 2, 1].toString());
}

Hanoi.prototype.move = function(from, to){
  console.log("hi");
  if(this.towers[from].length == 0){
    return(false);
  }

  if(this.towers[to].length == 0){
      this.towers[to].push(this.towers[from].pop());
      return(true);
  }


  if(this.towers[to].peek() > this.towers[from].peek()){
    this.towers[to].push(this.towers[to].pop());
    this.towers[to].push(this.towers[from].pop());
    return(true);
  }
  return(false);
}

var myHanoi;

var GameController = function(){
  this.towers = [];
}

var gc = new GameController();

// var from_tower;
// var to_tower;
// var source;


GameController.prototype.makeMove = function(){
  myHanoi.move(this.towers[0],this.towers[1]);
  this.displayMagic();
  if(myHanoi.checkWin()){
    this.showMsg("You win.");
  }
  else
  {
    this.showMsg("You can do it!  Keep trying!");
  }
};

GameController.prototype.displayMagic = function(){
  for(var i = 0; i < 3; i++){
    $('#tw' + i).text(myHanoi.towers[i]);
  }
}


GameController.prototype.handleSelection = function(num){

  this.towers.push(num);
  console.log(this.towers);
  if(this.towers.length == 2){
    if(!this.makeMove()){
      this.showMsg("invalid move");
    }
    this.towers = [];
  }

  if(this.towers.length > 2){
    this.towers = [];
  }


}

GameController.prototype.showMsg = function(msg){
  $('#msg').text(msg);
}

$(function(){
  [0, 1, 2].forEach(function(i){
    $('#tw' + i).click(function(){
      gc.handleSelection(i);
    });
  })

  myHanoi = new Hanoi();
  gc.displayMagic();

  gc.source = true;



});
