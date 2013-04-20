var DS = (function() {
  function Dream(id, story) {
    this.id = id;
    this.story = story;
  }


  function DreamView(el){
    this.$el = $(el);
  }

  DreamView.prototype.render = function() {
    var that = this;

    var ul = $("<ul></ul>");
    _.each(Dream.all, function (d) {
      ul.append($("<li></li>").text(d.story));
    });
    that.$el.html(ul);
  };


  Dream.all = [];
  Dream.callbacks = [];
  Dream.refresh = function (view) {
    $.getJSON(
      "/dreams.json",
      function (data) {
        Dream.all = [];

        _.each(data, function(datum) {

          Dream.all.push(new Dream(datum.id, datum.story));
          console.log(Dream.all);
        });

        _(Dream.callbacks).each(function (callback){
          callback();
        });
        view.render();
      }
    );
  };

  Dream.prototype.save = function(view) {
    var that = this;
    that.view = view;
    $.post("/dreams.json",{
      dream: {id: that.id,
           story: that.story
      }
    },function (response){

      that.id = response.id;
      Dream.all.push(that);

      _(Dream.callbacks).each(function (callback){
        callback();
      });
      Dream.refresh(that.view);
    });

  };




  function DreamIndexView(button,view) {
    var that = this;
    console.log(view);
    this.view = view;//used for view
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

  DreamIndexView.prototype.submit = function() {
    var that = this;

    //reload
    Dream.refresh(that.view);
   // that.view.render();
  }


  function DreamFormView(view, textField, button, callback){
    var that = this;
    this.$view = $(view);
    this.$textField = $(textField);
    this.$button = $(button);
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

    var newDream = new Dream(null, that.$textField.val());

    that.$textField.val("");

    that.callback(newDream);

  }





  return {
    Dream: Dream,
    DreamView: DreamView,
    DreamIndexView: DreamIndexView,
    DreamFormView: DreamFormView
  };
})();