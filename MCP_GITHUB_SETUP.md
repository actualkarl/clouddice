# GitHub MCP Server Setup

## Installation Steps

### 1. Install MCP GitHub Server
```bash
# Using npm (globally)
npm install -g @modelcontextprotocol/server-github

# Or using npx (without installing)
npx @modelcontextprotocol/server-github
```

### 2. Create GitHub Personal Access Token
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Name: "MCP Server"
4. Select scopes:
   - ✅ repo (all)
   - ✅ read:org
   - ✅ read:user
5. Generate and COPY token

### 3. Configure MCP Settings

Find your Claude config file:
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`

Add this configuration:
```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_TOKEN_HERE"
      }
    }
  }
}
```

### 4. Windows Specific Setup

For Windows, you might need to use the full path:
```json
{
  "mcpServers": {
    "github": {
      "command": "C:\\Program Files\\nodejs\\npx.cmd",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_TOKEN_HERE"
      }
    }
  }
}
```

### 5. Restart Claude
- Fully quit Claude (system tray)
- Start Claude again
- You should see "github" in available MCP servers

## Available GitHub Commands

Once connected, you can use:
- Create repositories
- Push code
- Create issues
- Manage pull requests
- Create gists
- And more!

## Troubleshooting

If it doesn't work:
1. Check token permissions
2. Verify Node.js is installed: `node --version`
3. Try installing globally: `npm install -g @modelcontextprotocol/server-github`
4. Check Claude logs for errors