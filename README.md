# [ChatWork Mute Room Extension](https://github.com/chocoby/chatwork-mute-room-extension)

Chrome extension to mute rooms on ChatWork. / ChatWork の特定のルームをミュートする Chrome extension です。

**DEPRECATED**: Please use [official mute feature](https://help.chatwork.com/hc/ja/articles/115000107662-%E3%82%B0%E3%83%AB%E3%83%BC%E3%83%97%E3%83%81%E3%83%A3%E3%83%83%E3%83%88%E3%82%92%E3%83%9F%E3%83%A5%E3%83%BC%E3%83%88%E3%81%AB%E3%81%99%E3%82%8B). / [公式のミュート機能](https://help.chatwork.com/hc/ja/articles/115000107662-%E3%82%B0%E3%83%AB%E3%83%BC%E3%83%97%E3%83%81%E3%83%A3%E3%83%83%E3%83%88%E3%82%92%E3%83%9F%E3%83%A5%E3%83%BC%E3%83%88%E3%81%AB%E3%81%99%E3%82%8B)を使用してください。

## Install

1. Install from ~~Chrome Web Store~~
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
$ npm install # or yarn install
$ npm run watch
```

Edit files and build by Webpack.

To package files:

```
$ npm run build:package
```

Create `chatwork-mute-room.zip` in root directory.
