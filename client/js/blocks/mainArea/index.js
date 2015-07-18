define(function() {
  var MainArea;
  return MainArea = (function() {
    function MainArea() {
      console.log("MainArea");
    }

    MainArea.prototype.showView = function(view) {
      return console.debug("------MainArea", view);
    };

    return MainArea;

  })();
});
