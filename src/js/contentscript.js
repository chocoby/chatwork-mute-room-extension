'use strict';

let muteRoomIds = [];
let enabled = true;
let displaySeparatedNames = false;
let unreadRoomNames = [];
let timer = 0;

function getMentionCounts() {
  return document.querySelectorAll('#_roomListArea .mention').length;
}

function getUnreadRoomNames() {
  let unreadRoomNames = document.querySelectorAll('#_roomListItems .roomUnread .chatListTitleArea');

  return Array.apply(null, unreadRoomNames).map((room) => { return room.textContent; });
}

function setCustomTitle() {
  let title = `[${unreadRoomNames.length}]`;
  if (getMentionCounts() > 0) {
    title += `(${getMentionCounts()})`;
  }

  if (displaySeparatedNames) {
    if (unreadRoomNames.length > 0) {
      title += ` - ${unreadRoomNames.join('|')}`;
    } else {
      title += ` - No message`;
    }
  } else {
    title += ` - ChatWork`;
  }

  document.title = title;
}

function handleDOM() {
  if (timer) {
    return;
  }

  timer = setTimeout(() => {
    unreadRoomNames = getUnreadRoomNames();
    muteRoomIds.forEach((roomId, _) => {
      let selector = `#_roomListItems li[data-rid="${roomId}"].roomUnread`;
      let domObj = document.querySelector(selector);
      if (domObj !== null) {
        unreadRoomNames.splice(unreadRoomNames.indexOf(domObj.querySelector('.chatListTitleArea').textContent), 1);
        domObj.classList.remove('roomUnread');
        let badgeDomObj = domObj.querySelector('.chatListMeta ul.incomplete .unread');
        if (badgeDomObj !== null) {
          badgeDomObj.remove();
        }
      }
    });
    setCustomTitle();
    timer = 0;
  }, 100);
}

chrome.runtime.sendMessage({ mode: 'initialize' }, response => {
  if (response.status === 'success') {
    if (response.options.muteRoomIds === undefined) {
      return;
    }

    if (response.options.enabled !== true) {
      return;
    }

    muteRoomIds = response.options.muteRoomIds;
    displaySeparatedNames = response.options.displaySeparatedNames;
    unreadRoomNames = getUnreadRoomNames();

    setTimeout(() => {
      handleDOM();
    }, 1000);

    document.querySelector('#_roomListArea').addEventListener('DOMNodeInserted', () => {
      handleDOM();
    });
    document.querySelector('title').addEventListener('DOMSubtreeModified', () => {
      handleDOM();
    });
  }
});
