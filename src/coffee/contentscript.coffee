excludeRooms = []

timer = 0
handleDOM = ->
  return if timer

  timer = setTimeout ->
    $.each excludeRooms, (_, roomId) ->
      selector = "#_roomListItems li[data-rid=#{roomId}]"

      domObj = $(selector)
      if domObj.length == 1
        domObj = domObj[0]
        $(domObj).removeClass("roomUnread")
        badgeDomObj = $(domObj).find('.chatListMeta ul.incomplete')[0]
        badgeDomObj.remove()

    timer = 0
  , 5

  null

$(document).ready ->
  chrome.runtime.sendMessage { mode: "initialize" }, (response) ->
    if response.status == "success"
      excludeRooms = response.options.excludeRooms

      $("#_roomListArea").on "DOMNodeInserted", (event) ->
        handleDOM()
