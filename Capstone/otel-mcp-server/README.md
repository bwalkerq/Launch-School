# OTel MCP Server - Basic Spike

This is a minimal MCP (Model Context Protocol) server implementation to understand how the protocol works.

## What is MCP?

MCP (Model Context Protocol) is a protocol for connecting AI assistants to external data sources and tools. It uses JSON-RPC 2.0 for communication.

## Setup

Install dependencies:
```bash
npm install
```

## Running the Server

Build and run the server:
```bash
npm run dev
```

Or build first, then run:
```bash
npm run build
npm start
```

The server reads JSON-RPC requests from stdin and writes JSON-RPC responses to stdout.

## Testing the Server

You can test the server manually by sending JSON-RPC requests:

```bash
# Initialize
echo '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{}}' | npm run dev

# List tools
echo '{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}' | npm run dev

# Call echo tool
echo '{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"echo","arguments":{"message":"Hello!"}}}' | npm run dev

# Call get_time tool
echo '{"jsonrpc":"2.0","id":4,"method":"tools/call","params":{"name":"get_time","arguments":{}}}' | npm run dev
```

## Current Features

The server currently implements:
- `initialize` - Initialize the MCP session
- `tools/list` - List available tools
- `tools/call` - Call a tool
  - `echo` - Echo back a message
  - `get_time` - Get current timestamp
- `ping` - Health check

## Next Steps

Eventually this will be extended to query telemetry data from the OpenTelemetry demo.

