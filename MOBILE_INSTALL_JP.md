# Obsidianモバイルへのインストール方法

## 前提条件
- Obsidianモバイルアプリがインストールされていること
- Community Pluginsが有効になっていること

## BRATを使用したインストール手順

### 1. BRATプラグインのインストール

1. Obsidianモバイルアプリを開く
2. 左下の設定アイコン（⚙️）をタップ
3. **Community plugins** を選択
4. **Turn on community plugins** をタップして有効化（まだの場合）
5. **Browse** ボタンをタップ
6. 検索バーに「BRAT」と入力
7. **BRAT (Beta Reviewers Auto-update Tool)** を見つけてインストール
8. インストール後、**Enable** をタップして有効化

### 2. Timestamp Notesプラグインの追加

1. 設定画面に戻る
2. **Community plugins** セクションの下部にある **BRAT** を選択
3. **Add Beta plugin** ボタンをタップ
4. 以下のURLを入力：
   ```
   https://github.com/sudodo/obsidian-timestamp-notes
   ```
5. **Add Plugin** をタップ

### 3. プラグインの有効化

1. BRATが成功メッセージを表示したら、設定画面に戻る
2. **Community plugins** を選択
3. インストール済みプラグインリストから **Timestamp Notes** を見つける
4. トグルスイッチをタップして有効化

## 使い方

### コマンドパレットから使用

1. ノートを開いた状態で、画面上部のコマンドアイコン（📋）をタップ
2. 「Timestamp」と入力して検索
3. 以下のコマンドが表示されます：
   - **Append timestamped note to daily note**: モーダルを開いて新しいメモを入力
   - **Append selection as timestamped note to daily note**: 選択したテキストをタイムスタンプ付きでデイリーノートに追加

### 設定のカスタマイズ

1. 設定 → Community plugins → Timestamp Notes
2. 以下の項目をカスタマイズ可能：
   - **Timestamp format**: タイムスタンプの形式（例：HH:mm、YYYY-MM-DD HH:mm）
   - **Entry template**: エントリーのテンプレート（{timestamp}と{content}を使用）
   - **Append to end**: オン＝末尾に追加、オフ＝先頭に追加

## トラブルシューティング

### プラグインが表示されない場合
1. Obsidianアプリを完全に終了して再起動
2. BRATの設定で「Check for updates」をタップ

### デイリーノートが作成されない場合
1. Daily Notesプラグインが有効になっているか確認
2. Daily Notesの設定（フォルダ、テンプレート等）が正しく設定されているか確認

## 注意事項

- このプラグインはDaily Notesプラグインが有効になっている必要があります
- モバイル版では一部のショートカットキーは使用できません
- 問題が発生した場合は、GitHubのIssuesページで報告してください：
  https://github.com/sudodo/obsidian-timestamp-notes/issues