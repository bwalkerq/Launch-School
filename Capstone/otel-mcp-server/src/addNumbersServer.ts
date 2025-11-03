import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const addNumbersServer = new McpServer({
  name: "demo-server",
  version: "1.0.0",
});

// Add an addition tool
addNumbersServer.tool(
  "add",
  "Add two numbers",
  {
    a: z.number().describe("First number"),
    b: z.number().describe("Second number"),
  },
  async ({ a, b }) => {
    return {
      content: [
        {
          type: "text",
          text: `Result: ${a + b}`,
        },
      ],
    };
  },
);

const transport = new StdioServerTransport();
await addNumbersServer.connect(transport);
