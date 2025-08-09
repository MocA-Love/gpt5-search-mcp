# gpt5-search-mcp.

<div align="center">
  <p><a href="./README.md">English</a> | <a href="./README.ja.md">日本語</a> | 简体中文 | <a href="./README.ko.md">한국어</a></p>

[![Verified on MseeP](https://mseep.ai/badge.svg)](https://mseep.ai/app/810f04ea-e685-4840-ae20-6a70deb7407a)

</div>


一个MCP服务器，通过OpenAI使用GPT-5模型及其强大的Web搜索功能。
通过将其注册到任何AI编码代理，该代理可以自主地与GPT-5模型协商，以解决复杂的问题。

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

## 使用案例

### 🐛 调试卡住时

GPT-5的Web搜索可以广泛搜索GitHub issue和Stack Overflow等问题，因此解决小众问题的可能性大大增加。指示示例：

```
> 启动后出现以下错误，请修复。如果太难，请询问GPT-5
> [粘贴错误消息]
```
```
> WebSocket连接不成功。请调试。如果不知道，请询问GPT-5
```

### 📚 想要参考最新的库信息时

即使没有整理好的文档，也可以通过强大的Web搜索获得答案。指示示例：

```
> 我想将这个库升级到v2。请边咨询GPT-5边进行
```

```
> 我被告知该库的此选项不存在。也许它已被删除。请询问GPT-5应该指定什么来代替并替换它
```

### 🧩 处理复杂任务时

除了搜索之外，您还可以将其用作设计的讨论对象。指示示例：

```
> 我想创建一个可同时编辑的编辑器，请进行设计。并请GPT-5进行设计审查，必要时进行讨论。
```

此外，由于它是作为MCP服务器提供的，因此即使您不发出指示，AI代理也可能会自行判断必要性并自主地与GPT-5对话。这将极大地扩展其在自主运行中解决问题的范围！

## 安装

### npx (推荐)

Claude Code:

```sh
$ claude mcp add gpt5 \
	-s user \  # 省略此行将在项目范围内安装
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
        // 可选: low, medium, high (默认: low)
        "SEARCH_CONTEXT_SIZE": "low",
        "REASONING_EFFORT": "medium"
      }
    }
  }
}
```

### 本地设置

如果您想下载代码并在本地运行：

```bash
git clone git@github.com:MocA-Love/gpt5-search-mcp.git
cd gpt5-search-mcp
pnpm install
pnpm build
```

Claude Code:

```sh
$ claude mcp add gpt5 \
	-s user \  # 省略此行将在项目范围内安装
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
        // 可选: low, medium, high (默认: low)
        "SEARCH_CONTEXT_SIZE": "low",
        "REASONING_EFFORT": "medium"
      }
    }
  }
}
```

## 环境变量

| 环境变量名 | 选项 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `OPENAI_API_KEY` | 必需 | - | OpenAI API 密钥 |
| `OPENAI_MODEL` | 可选 | `gpt-5-mini` | 用于查询的模型 |
| `OPENAI_BASE_URL` | 可选 | `https://api.openai.com/v1` | OpenAI API基础URL |
| `SEARCH_CONTEXT_SIZE` | 可选 | `low` | 控制搜索上下文大小<br>值: `low`, `medium`, `high` |
| `REASONING_EFFORT` | 可选 | `medium` | 控制推理努力级别<br>值: `low`, `medium`, `high` |

## 注意事项

此MCP服务器使用OpenAI访问GPT-5模型。请确保您拥有有效的OpenAI API密钥和足够的信用额度。