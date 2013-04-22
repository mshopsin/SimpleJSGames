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
      that.$inputField.val('');
      my.render();
    });
  };

  my.render = function(){
    var that = this;
  //  $('.dropdown-toggle').dropdown();
    //use class todo-item-grp
    $('.todo-item-grp').remove();
    var $todoTable = $('#todo-items');
    var items = TD.ToDoModel.items;
    for(var i = 0; i < items.length; i++){
      var $todoRow = $('<tr class="todo-item-grp"></tr>');
      var $statusCell = $('<td></td>');
      var $itemCell = $('<td></td>');
      $statusCell.append(my.createDropDown(items[i]));
      $itemCell.text(items[i].item);
      $todoRow.append($statusCell);
      $todoRow.append($itemCell);
      $todoTable.append($todoRow);
    }

  }

  my.createDropDown = function(item){

    var $dropDownDiv = $('<div class="btn-group"></div>');
    var $buttonLink = $('<a class="btn dropdown-toggle" data-toggle="dropdown" href="#"></a>');
    $dropDownDiv.append($buttonLink);
    $buttonLink.text(my.getStatusCode(item.status));
    var $spanCaret = $('<span class="caret"></span>');
    $buttonLink.append($spanCaret);
    var $optionList = $('<ul class="dropdown-menu"></ul>');
    $dropDownDiv.append($optionList);

    var $notStartItem = $('<li>Not Started</li>');
    var $inProgressItem = $('<li>In Progress</li>');
    var $completeItem = $('<li>Complete</li>');
    var $dividerToDo = $('<li class="divider"></li>')
    var $removeItem = $('<li>Delete</li>');
    var list = [$notStartItem, $inProgressItem, $completeItem];

    $notStartItem.click(function(){
      item.status = 0;
      TD.ToDoModel.changeStatus(item, my.refresh());
    });
     $inProgressItem.click(function(){
       item.status = 1;
       TD.ToDoModel.changeStatus(item, my.refresh());
     });
     $completeItem.click(function(){
       item.status = 2;
       TD.ToDoModel.changeStatus(item, my.refresh());
     });
     $removeItem.click(function(){
       TD.ToDoModel.removeItem(item, my.refresh());
     });

    $optionList.append($notStartItem);
    $optionList.append($inProgressItem);
    $optionList.append($completeItem);
    $optionList.append($dividerToDo);
    $optionList.append($removeItem);

    return $dropDownDiv;
  }

  my.getStatusCode = function(code){
    switch(code){
      case 0:
      return "Not Started";
      case 1:
      return "In Progress";
      case 2:
      return "Complete";
    }
    return "unknown";
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