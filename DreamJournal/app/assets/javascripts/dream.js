var DS = (function() {
  function Dream(id, story) {
    this.id = id;
    this.story = story;
  }



  Dream.all = [];
  Dream.callbacks = [];
  Dream.refresh = function (view) {
    $.getJSON(
      "/dreams.json",
      function (data) {
        Dream.all = [];

        _.each(data, function(datum) {

          Dream.all.push(new Dream(datum.id, datum.story));
       //   console.log(Dream.all);
        });

        _(Dream.callbacks).each(function (callback){
          callback();
        });
        view.render();
        DreamFormView.enable();
      }
    );
  };

  function Theme(id, tag) {
    this.id = id;
    this.tag = tag;
  }

  Theme.refresh = function (dream, callback) {
    var that = this;
    $.getJSON(
      "/themes/"+ dream.id,
      function (data) {
        var themes = [];
        _.each(data, function(datum) {
          themes.push(new Theme(datum.id, datum.tag));
        });
        callback(themes );
      });
  };


  Theme.search = function (searchTerm, callback) {
    var that = this;

    $.getJSON(
      "/themes.json",
      function (data) {
        var themes = [];
        _.each(data, function(datum)  {
          console.log(datum.tag);
           var re = new RegExp("^" + searchTerm+ ".+");
          var OK = re.exec(datum.tag);
          if(OK){
            themes.push(new Theme(data.id, datum.tag));
          }

        });
        callback(themes);
    });
  };

  Theme.prototype.save = function(dream_id) {
    var that = this;
    var ref = $.post(
      "/themes.json",{
        theme: {id: that.id,
               tag: that.tag}
             },
             function (response){
               that.id = response.id; //either finds exists or new
               //Theme.all

               var newDreamTheme = new DreamTheme(null,dream_id , that.id);
               newDreamTheme.save(dream_id);

               //dream.id this will be used to save dream_theme

             });
  };

  function DreamTheme(id, dream_id, theme_id){
    var that = this;
    that.id       = id;
    that.dream_id = dream_id;
    that.theme_id = theme_id;
  }

  DreamTheme.prototype.save = function(){
    var that = this;
    var ref = $.post(
      "/dream_themes.json",
      {dreamtheme: {
        id: that.id,
        dream_id: that.dream_id,
        theme_id: that.theme_id}
      },
      function(response) {

        DreamFormView.enable();
         // Dream.refresh(dream);
          DreamIndexView.reload();
      });
  };


  Dream.prototype.save = function(view) {
    var that = this;
    that.view = view;
    var ref = $.post("/dreams.json",{
      dream: {id: that.id,
           story: that.story
      }
    },function (response){

      that.id = response.id;
      Dream.all.push(that);

      _(Dream.callbacks).each(function (callback){
        callback();
      });
      DreamFormView.enable();
      DreamIndexView.reload();

    });

    return ref;

  };

  Dream.prototype.update = function(){
    var that = this;
    $.ajax({
      url: "/dreams/"+that.id,
      type: "put",
      dataType: "json",
      data: { dream: {id: that.id,
             story: that.story
           }
      }
      ,
      statusCode: {
        200: function() {
          DreamIndexView.reload();
        }
      }
    });
  }

  Dream.prototype.remove = function(view) {
    var that = this;//never accidently call this in the wrong scope
    that.view = view;
    $.ajax({
    url: "/dreams/" + that.id,
    type: "post",
    dataType: "json",
    data: {"_method":"delete"},
    statusCode: {
       200: function() {

         DreamFormView.enable();
         DreamIndexView.reload();

       }
     }
  });

  }


  function DreamView(el){
    this.$el = $(el);
  }


  DreamView.removalButtons = [];

  //this creates the contents for tag lisitng
  DreamView.prototype.showTags = function(dream,$themeList){
    //calls Themes for a list of tags using dream id
    Theme.refresh(dream,function(themes){
      _.each(themes, function (theme) {
        var $listItem = $("<li></li>");
          $listItem.addClass("inline");
          $themeList.append($listItem.append(theme.tag));
      });
    });
  }

  //updates the list with new tag
  DreamView.prototype.addTag = function(dream,$themeList) {

  };




  DreamView.prototype.render = function() {
    var that = this;
    that.$field = $('#dream-text-field');
    that.$submitDream = $('#submit-dream');


    DreamView.removalButtons = [];
    var ul = $("<ul></ul>");
    _.each(Dream.all, function (d) {
      var idTag = d.id + "-remove";
      var $addTagButton = $('<button class="tagButton" >Add Tag</button>');
      var $removeButton = $("<button>Remove</button>");
      var $themeList = $("<ul></ul>");
      var $listElement = $('<li class="row"></li>');

      $listElement.wrap('<div class="row"></div>')
      $themeList.addClass("inline");
      var $story = $('<div class="dream-name-text" ></div>')
      $story.attr('id',d.id);
      $story.text(d.story);
      $story.val(d.story);
      $story.click(function(value){
        that.dream = d;

        that.$field.val(value.currentTarget.value);
        that.$submitDream.hide();
        var $editButton = $('<button class="editButton" >Edit Dream</button>');
        that.$field.after($editButton);
        window.dream = d;
        $editButton.click(function ($field,$submitDream,$editButton){
          var dream = window.dream;
          dream.story = that.$field.val();
          DreamFormView.disable();
          dream.update(); //use to submit
          that.$field.val("");
          that.$submitDream.show();
          $('.editButton').remove();
        });



      });
      $story.mouseover(function(value){
        console.log(value);
        $('#dream-text-field').val(value.currentTarget.value);
        $('#submit-dream').text("Dream Big!");
      });


      $listElement.append($story);
      $listElement.append($themeList);
      $listElement.append($addTagButton);
      $listElement.append($removeButton)
      ul.append($listElement);
      that.showTags(d,$themeList);
      var dreamRemove = new DreamRemove(
        $removeButton,
        d,
        that,
        function (targDream){
          targDream.remove(this);

        }).bind();
        DreamView.removalButtons.push($removeButton);

      var themeAdd = new ThemeAdd(
        $addTagButton,
        d,
        that,
        function (dreamTheme){
         //Add theme

        }).bind();
        });
    that.$el.html(ul);
  };

  ThemeAdd.append = function(dream_id, tag_text){
    var newTheme = new Theme(null, tag_text);
    newTheme.save(dream_id);
  };

  function ThemeAdd(button, dream, view, callback) {
    var that = this;
    that.dream = dream;
    that.view = view;
    that.$button = $(button);
    that.callback = callback;
  }

  ThemeAdd.prototype.bind = function(){
    var that = this;
    that.buttonClickHandler = function(){
      that.submit();
    };
    that.$button.click(that.buttonClickHandler);
  };

  ThemeAdd.prototype.unbind = function(){
    var that = this;
    that.$button.off('click',buttonClickHandler);
    delete that.buttonClickHandler;
  };

  ThemeAdd.prototype.submit = function(){
    var that = this;
    that.$tagForm = $("<input type=\"text\" ></input>");
    that.$tagForm.focusin();
    that.$button.after(that.$tagForm);
    that.$button.hide();
    DreamFormView.disable();

    that.$tagForm.on('keyup',function(event){

      Theme.search(that.$tagForm.val(),function(array) {
        $(".dropDownThemes").remove();
        that.dropDown(array,that.$tagForm,function($el){
          $el.addClass("dropDownThemes");
          that.$tagForm.after($el);

        });
      });
      if(event.keyCode == 13){
        ThemeAdd.append(that.dream.id,that.$tagForm.val());

      }
    });

  }

  ThemeAdd.prototype.dropDown = function(items,inputEl ,callback){
    var that = this;

    that.$inputEl = $(inputEl);
    console.log(that.$inputEl);
    //role=\"menu\" aria-labelledby=\"dropdownMenu\"
    var $menu = $("<ul class=\"nav nav-list\"  ></ul>");

    _.each(items, function(item) {
      var $itemEl = $("<li></li>");
      var $linkEl = $("<div class=\"dropDownItem\" id=\""+ item.id+"\" ></div>");
      $itemEl.append($linkEl);
      $linkEl.text(item.tag);
      $($linkEl).mouseover(function(){
        $(that.$inputEl).val(item.tag);
      });
      $menu.append($itemEl);
     });
     $menu.click(function(){
       ThemeAdd.append(that.dream.id,that.$tagForm.val());
       $menu.remove();

     });
     callback($menu);
  };



  function DreamRemove(button, dream,view, callback){
    var that = this;
    that.dream = dream;
    that.view = view;
    that.$button = $(button);
    that.callback = callback;

  }

  DreamRemove.prototype.bind = function(){
    var that = this;

    that.buttonClickHandler = function() {
      that.submit();
    };
    that.$button.click(that.buttonClickHandler);
  }

  DreamRemove.prototype.unbind = function() {
    var that = this;

    that.$button.off('click',buttonClickHandler);
    delete that.buttonClickHandler;
  }

  DreamRemove.prototype.submit = function() {
    var that = this;
    DreamFormView.disable();
    that.callback(that.dream);
  }


  function DreamIndexView(button,view) {
    var that = this;
   // console.log(view);
    that.view = view;//used for view
    window.gview = view;
    that.$button = $(button);
  }

  DreamIndexView.prototype.bind = function (){
    var that = this;
    that.buttonClickHandler = function (){
      that.submit();
    };
    that.$button.click(that.buttonClickHandler);
  };

  DreamIndexView.prototype.unbind = function(){
    var that = this;

    that.$button.off('click', buttonClickHandler);
    delete that.buttonClickHandler;
  };

  DreamIndexView.reload = function(){

    Dream.refresh(window.gview);
  };

  DreamIndexView.prototype.submit = function() {
    var that = this;

    //reload
    DreamFormView.disable();
    Dream.refresh(that.view);
   // that.view.render();
  }


  function DreamFormView(view, textField, button, callback){
    var that = this;
    this.$view = $(view);
    this.$textField = $(textField);
    this.$button = $(button);
    DreamFormView.$button = $(button);
    this.callback = callback;
  }

  DreamFormView.prototype.bind = function(){
    var that = this;
    that.buttonClickHandler = function (){
      that.submit();
    }
    that.$button.click(that.buttonClickHandler);
  };

  DreamFormView.prototype.unbind = function(){
    var that = this;

    that.$button.off('click', buttonClickHandler);
    delete that.buttonClickHandler;
  };

  DreamFormView.prototype.submit = function() {
    var that = this;
    //submit dream & refresh
    DreamFormView.disable();
    var newDream = new Dream(null, that.$textField.val());

    that.$textField.val("");

    var ref = that.callback(newDream);


  }

  DreamFormView.disable = function(){
    _.each(DreamView.removalButtons, function($bt) {
      $bt.attr("disabled",true);
    });
    $('.tagButton').attr("disabled",true);
    this.$button.attr("disabled",true);
  }

  DreamFormView.enable = function(){
    _.each(DreamView.removalButtons, function($bt) {
      $bt.attr("disabled",false);
    });
    $('.tagButton').attr("disabled",false);
    this.$button.attr("disabled",false);
  }




  return {
    Dream: Dream,
    DreamView: DreamView,
    DreamIndexView: DreamIndexView,
    DreamFormView: DreamFormView
  };
})();