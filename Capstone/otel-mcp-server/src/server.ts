/**
 * Basic MCP Server - Spike Implementation
 * 
 * This is a minimal MCP (Model Context Protocol) server implementation
 * to understand how the protocol works.
 */

import * as readline from 'node:readline';
import * as process from 'node:process';

interface JSONRPCRequest {
  jsonrpc: string;
  id?: string | number;
  method: string;
  params?: Record<string, any>;
}

interface JSONRPCResponse {
  jsonrpc: string;
  id?: string | number;
  result?: any;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

class MCPServer {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
  }

  private handleRequest(request: JSONRPCRequest): JSONRPCResponse {
    const { method, params = {}, id } = request;

    switch (method) {
      case 'initialize':
        return {
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: '2024-11-05',
            capabilities: {
              experimental: {},
              sampling: {}
            },
            serverInfo: {
              name: 'otel-mcp-server',
              version: '0.1.0'
            }
          }
        };

      case 'tools/list':
        return {
          jsonrpc: '2.0',
          id,
          result: {
            tools: [
              {
                name: 'echo',
                description: 'Echo back the input message',
                inputSchema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      description: 'The message to echo back'
                    }
                  },
                  required: ['message']
                }
              },
              {
                name: 'get_time',
                description: 'Get the current timestamp',
                inputSchema: {
                  type: 'object',
                  properties: {}
                }
              }
            ]
          }
        };

      case 'tools/call':
        const toolName = params.name;
        const arguments_ = params.arguments || {};

        switch (toolName) {
          case 'echo':
            return {
              jsonrpc: '2.0',
              id,
              result: {
                content: [
                  {
                    type: 'text',
                    text: arguments_.message || 'No message provided'
                  }
                ]
              }
            };

          case 'get_time':
            return {
              jsonrpc: '2.0',
              id,
              result: {
                content: [
                  {
                    type: 'text',
                    text: `Current timestamp: ${Date.now()}`
                  }
                ]
              }
            };

          default:
            return {
              jsonrpc: '2.0',
              id,
              error: {
                code: -32601,
                message: `Unknown tool: ${toolName}`
              }
            };
        }

      case 'ping':
        return {
          jsonrpc: '2.0',
          id,
          result: {}
        };

      default:
        return {
          jsonrpc: '2.0',
          id,
          error: {
            code: -32601,
            message: `Unknown method: ${method}`
          }
        };
    }
  }

  public async run(): Promise<void> {
    for await (const line of this.rl) {
      const trimmedLine = line.trim();
      if (!trimmedLine) {
        continue;
      }

      try {
        const request: JSONRPCRequest = JSON.parse(trimmedLine);
        const response = this.handleRequest(request);
        
        console.log(JSON.stringify(response));
      } catch (error) {
        const errorResponse: JSONRPCResponse = {
          jsonrpc: '2.0',
          id: undefined,
          error: {
            code: -32700,
            message: `Parse error: ${error instanceof Error ? error.message : String(error)}`
          }
        };
        console.log(JSON.stringify(errorResponse));
      }
    }
  }
}

async function main() {
  const server = new MCPServer();
  await server.run();
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

