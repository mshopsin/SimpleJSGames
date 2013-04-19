$(function () {
  var canvas = $("<canvas width='" + 500 +
                 "' height='" + 500 + "'></canvas>");
  $('body').append(canvas);

  new Asteroids.Game(500, 500, 10).start(canvas.get(0));
});
