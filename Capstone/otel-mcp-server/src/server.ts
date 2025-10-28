import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// Create an MCP server
const server = new McpServer({
  name: 'demo-server',
  version: '1.0.0'
});

// Add an addition tool
server.tool(
  'add',
  'Add two numbers',
  {
    a: z.number().describe('First number'),
    b: z.number().describe('Second number')
  },
  async ({ a, b }) => {
    return {
      content: [{
        type: 'text',
        text: `Result: ${a + b}`
      }]
    };
  }
);

server.tool(
  "get_baby_name",
  "generate a baby name for people having a hard time deciding",

)

const transport = new StdioServerTransport();
await server.connect(transport);