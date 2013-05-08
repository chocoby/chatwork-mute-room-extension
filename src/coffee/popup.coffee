$("#add").click ->
  $("#roomIds")
    .append('<div class="room"><input type="text" size="15" placeholder="1234567"><button class="remove">-</button>')

$("#save").click ->
  excludeRooms = []
  $("#roomIds .room").each (_, room) ->
    roomId = $(room).children("input").val()
    if roomId.length > 0
      excludeRooms.push roomId

  options = {
    excludeRooms: excludeRooms
  }

  chrome.runtime.sendMessage { mode: "saveOptions", options: options }, (response) ->
    $("#status").text "Saved."

$(document).on 'click', '.remove', (event) ->
  $(event.currentTarget).parent().remove()

$(document).ready ->
  chrome.runtime.sendMessage { mode: "loadOptions" }, (response) ->
    options = response.options
    if options && options.excludeRooms
      $.each options.excludeRooms, (_, room) ->
        $("#roomIds")
          .append('<div class="room"><input type="text" size="15" placeholder="1234567" value="' + room + '"><button class="remove">-</button>')
