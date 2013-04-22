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

    my.updateItem = function(toDoItem, callback){
      var that = this;
      that.callback = callback;
      $.ajax({
        url: "/to_do_items/" + toDoItem.id,
        type: "put",
        dataType: "json",
        data: {
          todoitem: {
            id: toDoItem.id,
            status: toDoItem.status,
            item: toDoItem.item
          }
        },
        statusCode: {
          200: function(){
            TD.ToDoView.refresh();
          }
        }
      });
    };

    my.removeItem = function(removalItem, callback){
      var that = this;
      $.ajax({
        url: "/to_do_items/" + removalItem.id,
        type: "post",
        dataType: "json",
        data: {"_method":"delete"},
        statusCode: {
          200: function(){
            TD.ToDoView.refresh();
          }
        }
      });
    };

  return my;
})();