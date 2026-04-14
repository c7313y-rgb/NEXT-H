# 教育実装OS 副担任mirAI N-E.X.T. GitHub Pages版

この版では次を反映しています。

- HTML 1枚構成から **CSS / JS / 画像アセット分離型** に再編
- `React + JSX` を **esbuild でビルド** する構成へ変更
- 主要初期データを `data/app-data.json` に **外出し**
- GitHub Pages 向けに **相対パス** へ統一
- 配布用成果物を `dist/` に集約

## ディレクトリ構成

```text
edutex_github_pages_app/
├─ assets/              # 元アセット
├─ data/
│  └─ app-data.json     # 生成されたJSONソース
├─ dist/                # GitHub Pagesへ配置する公開物
│  ├─ index.html
│  ├─ assets/
│  └─ data/
├─ scripts/
│  └─ build.mjs         # ビルドスクリプト
├─ src/
│  └─ main.jsx          # ビルド用JSXエントリ
├─ package.json
└─ README.md
```

## ローカルでのビルド

```bash
npm install
npm run build
```

## GitHub Pages での公開方法

### もっとも簡単な方法

1. リポジトリを作成
2. `dist` 配下の中身をリポジトリ直下へアップロード
3. GitHub の `Settings > Pages` を開く
4. `Deploy from a branch` を選択
5. `main` ブランチの `/ (root)` を指定
6. 保存後、数分待つ

### docs方式で公開する場合

1. リポジトリ直下に `docs/` を作成
2. `dist` の中身を `docs/` にコピー
3. `Settings > Pages` で `main` ブランチの `/docs` を指定

## 注意点

- Pagesでは **`dist` の中身そのもの** を公開してください
- `index.html` は `./assets/...` `./data/...` の相対参照です
- `app-data.json` は起動時に読み込まれるため、ファイル構成を崩すと起動しません
