import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express from "express";
import { z } from "zod";

// OTLP trace structure (simplified)
interface OTLPTrace {
  traceId: string;
  spans: Array<{
    spanId: string;
    traceId: string;
    parentSpanId?: string;
    name: string;
    kind: string; // 'SERVER' | 'CLIENT' | 'INTERNAL' | 'PRODUCER' | 'CONSUMER'
    startTimeUnixNano: string;
    endTimeUnixNano: string;
    attributes: Record<string, any>;
    status?: {
      code: string; // 'OK' | 'ERROR' | 'UNSET'
      message?: string;
    };
  }>;
}

// Mock data store - replace with actual database/API later
// TODO: Replace this with actual database/API call
const mockTraces: Record<string, OTLPTrace> = {
  "trace-123": {
    traceId: "trace-123",
    spans: [
      {
        spanId: "span-1",
        traceId: "trace-123",
        name: "HTTP GET /api/users",
        kind: "SERVER",
        startTimeUnixNano: `${(Date.now() - 30 * 60 * 1000) * 1_000_000}`, // 30 min ago
        endTimeUnixNano: `${(Date.now() - 30 * 60 * 1000 + 450) * 1_000_000}`, // +450ms
        attributes: {
          "http.method": "GET",
          "http.url": "/api/users",
          "http.status_code": 200,
        },
        status: { code: "OK" },
      },
      {
        spanId: "span-2",
        traceId: "trace-123",
        parentSpanId: "span-1",
        name: "db.query",
        kind: "CLIENT",
        startTimeUnixNano: `${(Date.now() - 30 * 60 * 1000 + 100) * 1_000_000}`, // Started 100ms into parent
        endTimeUnixNano: `${(Date.now() - 30 * 60 * 1000 + 450) * 1_000_000}`, // Ended with parent
        attributes: {
          "db.system": "postgresql",
          "db.statement": "SELECT * FROM users",
        },
        status: { code: "OK" },
      },
    ],
  },
  "trace-456": {
    traceId: "trace-456",
    spans: [
      {
        spanId: "span-3",
        traceId: "trace-456",
        name: "HTTP POST /api/orders",
        kind: "SERVER",
        startTimeUnixNano: `${(Date.now() - 5 * 60 * 1000) * 1_000_000}`, // 5 min ago
        endTimeUnixNano: `${(Date.now() - 5 * 60 * 1000 + 200) * 1_000_000}`, // +200ms
        attributes: {
          "http.method": "POST",
          "http.url": "/api/orders",
          "http.status_code": 500,
        },
        status: { code: "ERROR", message: "Database connection failed" },
      },
    ],
  },
};

// Search traces by criteria
function searchTraces(criteria: {
  status?: string;
  spanName?: string;
  timeRange?: string;
}): OTLPTrace[] {
  const now = Date.now() * 1_000_000; // Convert to nanoseconds
  let timeThresholdNano: bigint | null = null;

  if (criteria.timeRange) {
    const match = criteria.timeRange.match(/^(\d+)(h|d|m)$/);
    if (match) {
      const [, amount, unit] = match;
      const milliseconds =
        unit === "m"
          ? parseInt(amount) * 60 * 1000
          : unit === "h"
            ? parseInt(amount) * 60 * 60 * 1000
            : unit === "d"
              ? parseInt(amount) * 24 * 60 * 60 * 1000
              : 0;

      timeThresholdNano = BigInt(now - milliseconds * 1_000_000);
    }
  }

  return Object.values(mockTraces).filter((trace) => {
    // Time range filter
    if (timeThresholdNano !== null) {
      const hasRecentSpan = trace.spans.some(
        (span) => BigInt(span.startTimeUnixNano) >= timeThresholdNano!,
      );
      if (!hasRecentSpan) return false;
    }

    // Status filter
    if (criteria.status) {
      const hasMatchingStatus = trace.spans.some(
        (span) => span.status?.code === criteria.status,
      );
      if (!hasMatchingStatus) return false;
    }

    // Span name filter
    if (criteria.spanName) {
      const hasMatchingName = trace.spans.some((span) =>
        span.name.toLowerCase().includes(criteria.spanName!.toLowerCase()),
      );
      if (!hasMatchingName) return false;
    }

    return true;
  });
}

// Create the MCP server
const server = new McpServer({
  name: "trace-server",
  version: "1.0.0",
});

// ============================================================================
// RESOURCES: For reading/accessing known trace data,
// or for performing noise reduction prior to LLM context ingestion
// ============================================================================

// I think the best use case for resources is when we have telemetry data streaming, and we want
// a potential running SSE or pull-based setup, so that, for example, the most recent errors are cached and ready for retrieval.

// ============================================================================
// TOOLS: For actively searching/querying traces
// Tools are like "functions" - the model can invoke them to perform actions
// Use when: The model needs to search for traces matching certain criteria
// ============================================================================

server.registerTool(
  "search_traces",
  {
    description:
      "Search for traces matching specific criteria like status, span names, or time range",
    inputSchema: {
      status: z
        .enum(["OK", "ERROR", "UNSET"])
        .optional()
        .describe("Filter traces by status code"),
      spanName: z
        .string()
        .optional()
        .describe(
          "Filter traces containing spans with this name (case-insensitive)",
        ),
      timeRange: z
        .string()
        .optional()
        .describe(
          "Filter traces by time range. Examples: '1h', '24h', '7d'. Looks at span start times.",
        ),
    },
  },
  async ({ status, spanName }) => {
    const results = searchTraces({ status, spanName });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              query: { status, spanName },
              count: results.length,
              traces: results,
            },
            null,
            2,
          ),
        },
      ],
    };
  },
);

// ============================================================================
// TRANSPORT: Start server with stdio or HTTP based on environment
// ============================================================================

const mode = process.env.TRANSPORT_MODE || "stdio";

if (mode === "http") {
  // HTTP mode: Run as a web server
  const app = express();
  app.use(express.json());

  app.post("/mcp", async (req, res) => {
    // Create a new transport instance per request to prevent session ID collisions
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    });

    // Clean up when the client disconnects
    res.on("close", () => {
      transport.close();
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  });

  const port = parseInt(process.env.PORT || "3000");
  app.listen(port, () => {
    console.error(`Trace server running in HTTP mode on port ${port}`);
    console.error(`Connect at: http://localhost:${port}/mcp`);
  });
} else {
  // stdio mode: Run as a subprocess (default for Claude Desktop, etc.)
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Trace server running in stdio mode");
}
