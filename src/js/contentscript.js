'use strict';

let excludeRooms = [];
let unreadRoomsName = [];
let timer = 0;

function getMentionCounts() {
  return $('#_roomListArea .mention').length;
}

function getUnreadRoomsName() {
  let unreadRoomsName;

  unreadRoomsName = $.map($('#_roomListItems .roomUnread .chatListTitleArea'), $.text);
  if (unreadRoomsName.length === 0) {
    unreadRoomsName = ['No message!'];
  }

  return unreadRoomsName;
}

function setCustomTitle() {
  document.title = `[${unreadRoomsName.length}](${getMentionCounts()}) - ${unreadRoomsName.join('|')}`;
}

function handleDOM() {
  if (timer) {
    return;
  }

  timer = setTimeout(() => {
    unreadRoomsName = getUnreadRoomsName();
    $.each(excludeRooms, (_, roomId) => {
      let selector = `#_roomListItems li[data-rid=${roomId}]`;
      let domObj = $(selector);
      if (domObj.length === 1) {
        domObj = domObj[0];
        unreadRoomsName.splice(unreadRoomsName.indexOf($(`${selector} .chatListTitleArea`).text()), 1);
        $(domObj).removeClass('roomUnread');
        let badgeDomObj = $(domObj).find('.chatListMeta ul.incomplete .unread');
        if (badgeDomObj.length === 1) {
          badgeDomObj[0].remove();
        }
      }
    });
    setCustomTitle();
    timer = 0;
  }, 5);
}

$(document).ready(() => {
  chrome.runtime.sendMessage({ mode: 'initialize' }, response => {
    if (response.status === 'success') {
      excludeRooms = response.options.excludeRooms;
      unreadRoomsName = getUnreadRoomsName();
      setCustomTitle();
      handleDOM();
      $('#_roomListArea').on('DOMNodeInserted', (event) => {
        handleDOM();
      });
    }
  });
})
