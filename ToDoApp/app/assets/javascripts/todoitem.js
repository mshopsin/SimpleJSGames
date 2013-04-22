TD.ToDoItem = (function(){
  var my = {};

  my.create = function(id, status,item){
    var that = this;
    that.id = id;
    that.status = status;
    that.item = item;
    return that;
  }

  return my;

})();