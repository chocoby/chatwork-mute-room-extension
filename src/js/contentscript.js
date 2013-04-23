//@ sourceMappingURL=contentscript.map
(function() {
  var excludeRooms, handleDOM, timer;

  excludeRooms = [];

  timer = 0;

  handleDOM = function() {
    if (timer) {
      return;
    }
    timer = setTimeout(function() {
      $.each(excludeRooms, function(_, roomId) {
        var domObj, selector;

        selector = "#cw_roomlist_items_area #" + roomId + " .ui_roomlist_view .ui_incomplete";
        domObj = $(selector);
        if (domObj.length === 1) {
          return domObj.remove();
        }
      });
      return timer = 0;
    }, 5);
    return null;
  };

  $(document).ready(function() {
    return chrome.runtime.sendMessage({
      mode: "initialize"
    }, function(response) {
      if (response.status === "success") {
        excludeRooms = response.options.excludeRooms;
        return $("#cw_roomlist_items_area").on("DOMNodeInserted", function(event) {
          return handleDOM();
        });
      }
    });
  });

}).call(this);
