excludeRooms = []

timer = 0
handleDOM = ->
  return if timer

  timer = setTimeout ->
    $.each excludeRooms, (_, roomId) ->
      selector = "#cw_roomlist_items_area ##{roomId} .ui_roomlist_view .ui_incomplete"
      domObj = $(selector)
      if domObj.length == 1
        domObj.remove()

    timer = 0
  , 5

  null

$(document).ready ->
  chrome.runtime.sendMessage { mode: "initialize" }, (response) ->
    if response.status == "success"
      excludeRooms = response.options.excludeRooms

      $("#cw_roomlist_items_area").on "DOMNodeInserted", (event) ->
        handleDOM()
