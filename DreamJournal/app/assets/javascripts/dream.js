var DS = (function() {
  function Dream(id, story) {
    this.id = id;
    this.story = story;
  }

  /*
  Dream.prototype.save = function(){
    var that = this;
    $.post("/dreams.json",
           {
      dream: {
        id: that.id,
        text: that.text
              }
            }
    , function (response) {
      that.id = response.id;
      Dream.all.push(that);
      _(Dream.callbacks).each(function (callback){
        callback();
      });
      }
    });
  };
  */

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
  Dream.refresh = function () {
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
      }
    );
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
    Dream.refresh();
    that.view.render();
  }




  return {
    Dream: Dream,
    DreamIndexView: DreamIndexView
  };
})();