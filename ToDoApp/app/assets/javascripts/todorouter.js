TD.ToDoRouter = (function() {
  var my = {};

  my.indexToDoItem = function(callback){
    $.getJSON(
      "/to_do_items.json",
      function(data){
        var items = [];
        for(var i = 0; i < data.length; i++){
          items.push(new TD.ToDoItem.create(
            data[i].id,
            data[i].status,
            data[i].item));
        }
        callback(items);
      }
    );
  };

  my.newToDoItem = function(newItem, callback){
    callback(newItem);
    var that = this;
    $.post(
      "/to_do_items.json",
      {
        todoitem: {id: newItem.id,
               status: newItem.status,
                 item: newItem.item}
        },
        function(response){
          console.log(response);
          callback();
        });
    };

  return my;
})();