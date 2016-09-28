excludeRooms = []
unreadRoomsName = []
timer = 0

getMentionCounts = ->
  $('#_roomListArea .mention').length

getUnreadRoomsName = ->
  l_unreadRoomsName = $.map($('#_roomListItems .roomUnread .chatListTitleArea'), $.text)
  if l_unreadRoomsName.length == 0
    l_unreadRoomsName = [ 'No message!' ]
  l_unreadRoomsName

setCustomTitle = ->
  document.title = '[' + unreadRoomsName.length + '](' + getMentionCounts() + ') - ' + unreadRoomsName.join('|')
  return

handleDOM = ->
  if timer
    return
  timer = setTimeout((->
    unreadRoomsName = getUnreadRoomsName()
    $.each excludeRooms, (_, roomId) ->
      badgeDomObj = undefined
      domObj = undefined
      selector = undefined
      selector = '#_roomListItems li[data-rid=' + roomId + ']'
      domObj = $(selector)
      if domObj.length == 1
        domObj = domObj[0]
        unreadRoomsName.splice unreadRoomsName.indexOf($(selector + ' .chatListTitleArea').text()), 1
        $(domObj).removeClass 'roomUnread'
        badgeDomObj = $(domObj).find('.chatListMeta ul.incomplete .unread')
        if badgeDomObj.length == 1
          return badgeDomObj[0].remove()
      return
    setCustomTitle()
    timer = 0
  ), 5)
  null

$(document).ready ->
  chrome.runtime.sendMessage { mode: 'initialize' }, (response) ->
    if response.status == 'success'
      excludeRooms = response.options.excludeRooms
      unreadRoomsName = getUnreadRoomsName()
      setCustomTitle()
      return $('#_roomListArea').on('DOMNodeInserted', (event) ->
        handleDOM()
      )
