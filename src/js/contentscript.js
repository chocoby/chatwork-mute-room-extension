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
        var badgeDomObj, domObj, selector;

        selector = "#_roomListItems li[data-rid=" + roomId + "]";
        domObj = $(selector);
        if (domObj.length === 1) {
          domObj = domObj[0];
          $(domObj).removeClass("roomUnread");
          badgeDomObj = $(domObj).find('.chatListMeta ul.incomplete');
          if (badgeDomObj.length === 1) {
            return badgeDomObj[0].remove();
          }
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
        return $("#_roomListArea").on("DOMNodeInserted", function(event) {
          return handleDOM();
        });
      }
    });
  });

}).call(this);
