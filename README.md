# gpt5-search-mcp

<div align="center">
  <p>English | <a href="./README.ja.md">日本語</a> | <a href="./README.zh.md">简体中文</a> | <a href="./README.ko.md">한국어</a></p>

[![Verified on MseeP](https://mseep.ai/badge.svg)](https://mseep.ai/app/810f04ea-e685-4840-ae20-6a70deb7407a)

</div>


MCP server that enables the use of the GPT-5 model and its powerful web search capabilities through OpenAI.
By registering it with any AI coding agent, the agent can autonomously consult with the GPT-5 model to solve complex problems.

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


## Use Cases

### 🐛 When you're stuck debugging

GPT-5's web search can scan a wide range of sources, including GitHub issues and Stack Overflow, significantly increasing the chances of resolving niche problems. Example prompts:

```
> I'm getting the following error on startup, please fix it. If it's too difficult, ask GPT-5.
> [Paste error message here]
```
```
> The WebSocket connection isn't working. Please debug it. If you don't know how, ask GPT-5.
```

### 📚 When you want to reference the latest library information

You can get answers from the powerful web search even when there's no well-organized documentation. Example prompts:

```
> I want to upgrade this library to v2. Proceed while consulting with GPT-5.
```

```
> I was told this option for this library doesn't exist. It might have been removed. Ask GPT-5 what to specify instead and replace it.
```

### 🧩 When tackling complex tasks

In addition to search, you can also use it as a sounding board for design. Example prompts:

```
> I want to create a collaborative editor, so please design it. Also, ask GPT-5 for a design review and discuss if necessary.
```

Also, since it's provided as an MCP server, the AI agent may decide on its own to talk to GPT-5 when it deems it necessary, without any instructions from you. This will dramatically expand the range of problems it can solve on its own!

## Installation

### npx (Recommended)

Claude Code:

```sh
$ claude mcp add gpt5 \
	-s user \  # If you omit this line, it will be installed in the project scope
	-e OPENAI_API_KEY=your-api-key \
	-e SEARCH_CONTEXT_SIZE=medium \
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
        // Optional: low, medium, high (default: medium)
        "SEARCH_CONTEXT_SIZE": "medium",
        "REASONING_EFFORT": "medium"
      }
    }
  }
}
```

### Local Setup

If you want to download the code and run it locally:

```bash
git clone git@github.com:MocA-Love/gpt5-search-mcp.git
cd gpt5-search-mcp
pnpm install
pnpm build
```

Claude Code:

```sh
$ claude mcp add gpt5 \
	-s user \  # If you omit this line, it will be installed in the project scope
	-e OPENAI_API_KEY=your-api-key \
	-e SEARCH_CONTEXT_SIZE=medium \
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
        // Optional: low, medium, high (default: medium)
        "SEARCH_CONTEXT_SIZE": "medium",
        "REASONING_EFFORT": "medium"
      }
    }
  }
}
```

## Environment Variables

| Environment Variable | Options | Default | Description |
| --- | --- | --- | --- |
| `OPENAI_API_KEY` | Required | - | OpenAI API Key |
| `SEARCH_CONTEXT_SIZE` | Optional | `low` | Controls the search context size<br>Values: `low`, `medium`, `high` |
| `REASONING_EFFORT` | Optional | `medium` | Controls the reasoning effort level<br>Values: `low`, `medium`, `high` |

## Notes

This MCP server uses OpenAI to access the GPT-5 model. Ensure you have a valid OpenAI API key with sufficient credits.
