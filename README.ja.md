# gpt5-search-mcp.

<div align="center">
  <p><a href="./README.md">English</a> | 日本語 | <a href="./README.zh.md">简体中文</a> | <a href="./README.ko.md">한국어</a></p>

[![Verified on MseeP](https://mseep.ai/badge.svg)](https://mseep.ai/app/810f04ea-e685-4840-ae20-6a70deb7407a)

</div>


OpenAI経由でGPT-5モデルとその強力なWeb検索機能を使えるようにするMCPサーバー。  
任意のAIコーディングエージェントに登録することで、コーディングエージェントが自律的にGPT-5モデルと相談し、複雑な問題を解決できるようになります。

<table>
	<tr>
		<td width="50%">
			<a href="https://mseep.ai/app/MocA-Love-gpt5-search-mcp.">
<img src="https://mseep.net/pr/MocA-Love-gpt5-search-mcp.-badge.png" alt="MseeP.ai Security Assessment Badge" />
</a>
		</td>
		<td width="50%">
			<a href="https://glama.ai/mcp/servers/@MocA-Love/gpt5-search-mcp.">
  <img src="https://glama.ai/mcp/servers/@MocA-Love/gpt5-search-mcp./badge" alt="gpt5-search MCP server" />
</a>
		</td>
	</tr>
</table>

## 使用例

### 🐛 デバッグで詰まった場合

GPT-5のWeb検索ではGitHubのissueやStack Overflowなど広範囲に問題を検索できるので、ニッチな問題も解決できる可能性が大幅に高まります。指示の例：

```
> 起動したら以下のエラーが出ているので修正して。難しければGPT-5に聞いてみて
> [エラーメッセージを貼り付け]
```
```
> WebSocketの接続がうまくいかない。デバッグして。わからなければGPT-5に聞いてみて
```

### 📚 最新のライブラリ情報を参照したい場合

整ったドキュメントが存在しない場合でも強力なWeb検索から答えを得られます。指示の例：

```
> このライブラリをv2にバージョンアップしたい。GPT-5に聞きながら進めて
```

```
> このライブラリのこのオプションが存在しないと言われた。なくなったのかも。代わりに何を指定すべきかGPT-5に聞いて置き換えて
```

### 🧩 複雑なタスクに取り組む場合

検索だけでなく、設計の壁打ち相手になってもらうことも可能です。指示の例：

```
> 同時編集可能なエディタを作成したいので設計して。GPT-5にも設計レビューを依頼して、必要ならディスカッションして。
```

また、MCPサーバーとして提供されているため、こちらから指示しなくてもAIエージェントが自分で必要性を判断して自律的にGPT-5に話しかけることもあります。自走する中での問題解決の幅が一気に広がるでしょう！

## インストール

### npx（推奨）

Claude Code:

```sh
$ claude mcp add gpt5 \
	-s user \  # この行を抜くと project scope でインストールされます
	-e OPENAI_API_KEY=your-api-key \
	-e SEARCH_CONTEXT_SIZE=low \
	-e REASONING_EFFORT=medium \
	-- npx gpt5-search-mcp
```

json:

```jsonc
{
  "mcpServers": {
    "gpt5-search": {
      "command": "npx",
      "args": ["gpt5-search-mcp"],
      "env": {
        "OPENAI_API_KEY": "your-api-key",
        // オプション: low, medium, high (デフォルト: low)
        "SEARCH_CONTEXT_SIZE": "low",
        "REASONING_EFFORT": "medium"
      }
    }
  }
}
```

### ローカルセットアップ

コードをダウンロードしてローカルで実行したい場合：

```bash
git clone git@github.com:MocA-Love/gpt5-search-mcp.git
cd gpt5-search-mcp
pnpm install
pnpm build
```

Claude Code:

```sh
$ claude mcp add gpt5 \
	-s user \  # この行を抜くと project scope でインストールされます
	-e OPENAI_API_KEY=your-api-key \
	-e SEARCH_CONTEXT_SIZE=low \
	-e REASONING_EFFORT=medium \
	-- node /path/to/gpt5-search-mcp/build/index.js
```

json:

```jsonc
{
  "mcpServers": {
    "gpt5-search": {
      "command": "node",
      "args": ["/path/to/gpt5-search-mcp/build/index.js"],
      "env": {
        "OPENAI_API_KEY": "your-api-key",
        // オプション: low, medium, high (デフォルト: low)
        "SEARCH_CONTEXT_SIZE": "low",
        "REASONING_EFFORT": "medium"
      }
    }
  }
}
```

## 環境変数

| 環境変数名 | オプション | デフォルト | 説明 |
| --- | --- | --- | --- |
| `OPENAI_API_KEY` | 必須 | - | OpenAI API Key |
| `OPENAI_MODEL` | 任意 | `gpt-5-mini` | クエリに使用するモデル |
| `OPENAI_BASE_URL` | 任意 | `https://api.openai.com/v1` | OpenAI APIベースURL |
| `SEARCH_CONTEXT_SIZE` | 任意 | `low` | 検索コンテキストサイズを制御<br>値: `low`, `medium`, `high` |
| `REASONING_EFFORT` | 任意 | `medium` | 推論努力レベルを制御<br>値: `low`, `medium`, `high` |

## 注意点

このMCPサーバーはOpenAIを使用してGPT-5モデルにアクセスします。有効なOpenAI APIキーと十分なクレジットがあることを確認してください。
