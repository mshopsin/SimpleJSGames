TD.ToDoModel = (function(){
  var my = {};

  my.loadItems = function(callback){
      TD.ToDoRouter.indexToDoItem(
        function(results){
          my.indexLoadedItems(results);
          callback();
      });
  };

  my.indexLoadedItems = function(items){
    var that = this;
    that.items = items;
  }

  my.addItem = function(itemName){
    var newToDoItem = TD.ToDoItem.create(null,0,itemName);
    TD.ToDoRouter.newToDoItem(
      newToDoItem,
      function(){
        TD.ToDoView.refresh();
    });
  }

  my.changeStatus = function(item, callback){

    TD.ToDoRouter.updateItem(item,callback);
  };

  my.removeItem = function(item, callback){
    TD.ToDoRouter.removeItem(item,callback);
  }

  return my;
})();