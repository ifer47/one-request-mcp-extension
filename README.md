# OneRequest — Cursor Extension

In-editor sidebar panel for [one-request-mcp](https://www.npmjs.com/package/one-request-mcp). Interact with AI directly inside Cursor — no browser window needed.

## Features

- **Sidebar panel** — AI summaries and your responses live right in the editor
- **Image support** — paste screenshots (`Ctrl+V`) or drag & drop image files
- **Real-time sync** — WebSocket connection to the MCP server, instant updates
- **Configurable port** — match whatever port your MCP server uses

## Setup

### 1. Install the MCP server

Add to your Cursor MCP settings (`.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "onerequest": {
      "command": "npx",
      "args": ["-y", "one-request-mcp@latest", "--port", "23198", "--no-browser"],
      "autoApprove": ["onerequest"]
    }
  }
}
```

> `--no-browser` disables the browser window since you'll use this extension instead.
> `--port 23198` must match the extension's port setting (default: 23198).

### 2. Add Cursor Rules

Add to Cursor Settings → General → Rules for AI:

```
After completing your full response, you MUST call onerequest as your very last action. Do NOT call it in the middle of your answer.
After receiving the MCP result, if there is input, process it first. Then regardless of whether the input was empty, had content, or the call failed, you MUST call onerequest again. NEVER stop. Loop forever.
You are ABSOLUTELY FORBIDDEN from ending a request on your own. The user will manually stop you. Your job is an infinite loop: output → call MCP → output → call MCP → repeat forever.
```

### 3. Use

1. Click the OneRequest icon in the activity bar to open the panel
2. Send a message to AI — it will call `onerequest` automatically
3. The panel shows the AI's summary and an input area
4. Type your response, optionally paste/drop images, and submit
5. Repeat until done, then stop generation in Cursor

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `onerequest.port` | `23198` | Port of the one-request-mcp server |

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Enter` | Submit |
| `Ctrl + V` | Paste image from clipboard |

## Requirements

- [one-request-mcp](https://www.npmjs.com/package/one-request-mcp) running with `--port` and `--no-browser`
- Cursor IDE

## License

MIT
