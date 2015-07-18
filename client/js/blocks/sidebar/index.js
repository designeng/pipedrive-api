define(function() {
  var Sidebar;
  return Sidebar = (function() {
    function Sidebar() {
      console.log("Sidebar");
    }

    Sidebar.prototype.showView = function(view) {
      return console.debug("------SIDEBAR", view);
    };

    return Sidebar;

  })();
});
