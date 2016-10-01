'use strict';

function addInput(roomId = '') {
  const room = document.createElement('div');
  room.classList.add('room');
  room.innerHTML = `<input type="text" size="15" placeholder="1234567" value=${roomId}><button class="remove">-</button>`;
  document.getElementById('roomIds').appendChild(room);
}

document.getElementById('add').addEventListener('click', () => {
  addInput();
})

document.getElementById('save').addEventListener('click', () => {
  let excludeRooms = [];

  let elements = document.querySelectorAll('#roomIds .room');
  Array.prototype.forEach.call(elements, (room, _) => {
    const roomId = room.querySelector('input').value;
    if (roomId.length > 0) {
      excludeRooms.push(roomId);
    }
  });

  const options = {
    excludeRooms: excludeRooms
  };
  chrome.runtime.sendMessage({
    mode: "saveOptions",
    options: options
  }, response => {
    document.getElementById('status').textContent = 'Saved.';
  });
});

document.addEventListener('click', event => {
  if (event.target.classList.contains('remove')) {
    event.target.parentNode.remove();
  }
});

chrome.runtime.sendMessage({ mode: 'loadOptions' }, response => {
  const options = response.options;
  if (options && options.excludeRooms) {
    options.excludeRooms.forEach((roomId, _) => {
      addInput(roomId);
    });
  }
});
