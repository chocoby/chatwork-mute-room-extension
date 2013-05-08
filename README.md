# chatwork-mute-room-extension

ChatWork の特定のルームをミュートする Google Chrome 用の extension です。

## インストール

1. [chatwork-mute-room-extension.crx](https://github.com/chocoby/chatwork-mute-room-extension/raw/master/chatwork-mute-room-extension.crx) を右クリックして
「リンク先を別名で保存」で適当な場所に保存します。

2. Google Chrome で「ツール」-「拡張機能」を開き、`chatwork-mute-room-extension.crx` をウィンドウ内にドラッグアンドドロップします。

3. Chrome のメニューバーにアイコンが追加されていますので、「+」を押してミュートしたいルームの ID (ex. `data-rid` の中身、例えば `1234567`)を入力し、「Save」を押してください。
   ルームの ID は、該当ルームを右クリックして「要素を検証」で確認できます。

4. ChatWork にアクセス、またはリロードすることで、設定が反映されます。

## アップデート

「インストール」と同じ手順でアップデートを行なってください。

オプションを再び設定する必要はありません。

## バージョンごとの互換性

ChatWork の仕様変更による対応で、バージョンごとの互換性が失われる場合があります。
バージョンごとの対応を以下の表に記します。お使いの ChatWork に対応したバージョンを使用してください。

|日付|バージョン|変更内容|
|----|----------|--------|
|2013/05/08|master/v0.0.2 以降のタグ|全体的に変更された|
|～2013/05/07|[v0.0.1](https://github.com/chocoby/chatwork-mute-room-extension/tree/v0.0.1)||

## 今できること

* 特定ルームの未読数の非表示

## これからやりたいこと

* 有効/無効をポップアップから切り替え
* ミュートしている部屋を除いた未読数をルームエリア、タイトルバーに反映
* タイトルバーの未読数の非表示(もしくは未読がある場合何かの記号を表示するとか)
* アイコンの作成

## 注意事項

* Google Chrome の最新バージョンにて確認を行なっています。
* ChatWork 側の変更により、動作しなくなる可能性があります。
* ご利用は自己責任でお願いします。

## 変更履歴

### [v0.0.2](https://github.com/chocoby/chatwork-mute-room-extension/tree/v0.0.2) (2013/05/08)

* ChatWork の仕様変更に対応

  ルーム ID を `cw_r` から始まる形式で設定している場合、`cw_r` を削除してください。

### [v0.0.1](https://github.com/chocoby/chatwork-mute-room-extension/tree/v0.0.1) (2013/04/23)

* 初期リリース

## 開発

CoffeeScript から JavaScript に変換:

```
% cd src
% npm install --save-dev
% grunt watch
```

パッケージ化するためのディレクトリを作成:

```
# repo root directory
% sh src/package.sh
```

## GitHub

https://github.com/chocoby/chatwork-mute-room-extension

## ライセンス

MIT: http://chocoby.mit-license.org/
