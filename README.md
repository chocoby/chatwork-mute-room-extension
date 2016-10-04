# [ChatWork Mute Room Extension](https://github.com/chocoby/chatwork-mute-room-extension)

Chrome extension to mute rooms on ChatWork. / ChatWork の特定のルームをミュートする Chrome extension です。

## Install

1. Install from [Chrome Web Store](https://chrome.google.com/webstore/detail/chatwork-mute-room/hnilammhfaleikbmmobhedpohmkbonab)
1. Open ChatWork
1. Select the room you want to mute
1. Copy ID displayed in the address bar (ex. `https://www.chatwork.com/#!rid1234567` -> `1234567`)
1. Select the icon in the menu bar, Enter the copied ID, Press the Add button, Press the Save button
1. Reload ChatWork

## CHANGELOG

See [Releases](https://github.com/chocoby/chatwork-mute-room-extension/releases)

## Development

Install [Node.js](https://nodejs.org/en/download/)

```
$ cd src
$ npm install
$ npm run watch
```

Edit files and build by Webpack.

To package files:

```
$ npm run build:package
```

Create `chatwork-mute-room.zip` in root directory.
