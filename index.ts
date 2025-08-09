#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import OpenAI from "openai";
import { z } from "zod";

// Create server instance
const server = new McpServer({
  name: "gpt5-search-mcp",
  version: "0.0.1",
});

// Configuration from environment variables
const config = {
  apiKey: process.env.OPENAI_API_KEY,
  model: process.env.OPENAI_MODEL || "gpt-5-mini",
  baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
  searchContextSize: (process.env.SEARCH_CONTEXT_SIZE || "low") as
    | "low"
    | "medium"
    | "high",
  reasoningEffort: (process.env.REASONING_EFFORT || "medium") as
    | "low"
    | "medium"
    | "high",
};

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: config.apiKey,
  baseURL: config.baseURL,
});

// Define the gpt5 tool
server.tool(
  "gpt5",
  `An AI agent with advanced web search capabilities using GPT-5. Useful for finding the latest information, troubleshooting errors, and discussing ideas or design challenges. Supports natural language queries.`,
  {
    input: z
      .string()
      .describe(
        "Ask questions, search for information, or consult about complex problems.",
      ),
  },
  async ({ input }) => {
    try {
      const response = await openai.responses.create({
        model: config.model,
        input: [
          {
            role: "user",
            content: [
              {
                type: "input_text",
                text: input
              }
            ]
          }
        ],
        text: {
          format: {
            type: "text"
          }
        },
        reasoning: {
          effort: config.reasoningEffort,
          summary: "auto"
        },
        tools: [
          {
            type: "web_search_preview",
            user_location: {
              type: "approximate"
            },
            search_context_size: config.searchContextSize
          } as any
        ],
        store: true
      } as any);

      return {
        content: [
          {
            type: "text" as const,
            text: (response as any).output_text || (response as any).text || "No response text available.",
          },
        ],
      };
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      return {
        content: [
          {
            type: "text",
            text: `Error: ${error instanceof Error ? error.message : "Unknown error occurred"}`,
          },
        ],
      };
    }
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
