TD.ToDoView = (function(){
  var my = {};

  my.test = function(){
    console.log("test module");
  };

  my.setupButtons = function(){
    //Add Item
    var that = this;
    //console.log(TD.$addBtn);
    that.$addBtn.click(function(){
      TD.ToDoModel.addItem(that.$inputField.val());
    });
  }

  my.refresh = function(){
    var that = this;
    TD.ToDoModel.loadItems(function(){
      console.log(TD.ToDoModel.items);
      that.$inputField.val('');
      my.render();
    });
  };

  my.render = function(){
    var that = this;
    //use class todo-item-grp
    $('.todo-item-grp').remove();

    var items = TD.ToDoModel.items;
    for(var i = 0; i < items.length; i++){
      var $todoRow = $('<tr class="todo-item-grp"></tr>');

      items[i].item;
    }

  }

  my.setup = function(){
    var that = this;
    that.$inputField = $('#item-input-field');
    that.$addBtn = $('#add-item-btn');
    that.$removeAllBtn = $('#remove-all-btn');
    that.$checkAllBtn = $('#complete-all-btn');

    //setup buttons
    my.setupButtons();
    //render
    my.refresh();
  };
  my.setup();
  return my;
})();