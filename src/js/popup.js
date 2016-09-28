//@ sourceMappingURL=popup.map
(function() {
  $("#add").click(function() {
    return $("#roomIds").append('<div class="room"><input type="text" size="15" placeholder="1234567"><button class="remove">-</button>');
  });

  $("#save").click(function() {
    var excludeRooms, options;
    excludeRooms = [];
    $("#roomIds .room").each(function(_, room) {
      var roomId;
      roomId = $(room).children("input").val();
      if (roomId.length > 0) {
        return excludeRooms.push(roomId);
      }
    });
    options = {
      excludeRooms: excludeRooms
    };
    return chrome.runtime.sendMessage({
      mode: "saveOptions",
      options: options
    }, function(response) {
      return $("#status").text("Saved.");
    });
  });

  $(document).on('click', '.remove', function(event) {
    return $(event.currentTarget).parent().remove();
  });

  $(document).ready(function() {
    return chrome.runtime.sendMessage({
      mode: "loadOptions"
    }, function(response) {
      var options;
      options = response.options;
      if (options && options.excludeRooms) {
        return $.each(options.excludeRooms, function(_, room) {
          return $("#roomIds").append('<div class="room"><input type="text" size="15" placeholder="1234567" value="' + room + '"><button class="remove">-</button>');
        });
      }
    });
  });

}).call(this);
