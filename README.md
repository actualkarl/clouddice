# Cloud Dice 🎲

A real-time synchronized dice rolling application where friends can roll dice together online!

## Features

- 🎯 Real-time dice rolling synchronization
- 👥 See who's in the room with you  
- 🎲 Roll multiple dice (1-10 at once)
- 📜 Rolling history for all players
- ⚡ Instant updates via WebSockets
- 🎨 Clean, modern UI

## Quick Start

### Deploy on Replit (Easiest)

1. Go to [replit.com](https://replit.com)
2. Click "Create Repl" → "Import from GitHub"
3. Paste this repository URL
4. Click Import and wait for it to start!

See [REPLIT_DEPLOYMENT.md](REPLIT_DEPLOYMENT.md) for details.

### Local Development

**Prerequisites:** Node.js 18+ and npm

```bash
# Clone and install
git clone <your-repo-url>
cd clouddice
npm run install:all

# Run development servers
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001

## How to Play

1. **Join**: Enter your nickname
2. **Roll**: Click "Roll X Dice" 
3. **Watch**: See everyone's rolls in real-time
4. **Share**: Send the URL to friends!

## Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + Socket.IO + TypeScript  
- **Real-time**: WebSocket communication

## Project Structure

```
clouddice/
├── client/         # React frontend
├── server/         # Node.js backend  
├── shared/         # Shared TypeScript types
├── .replit         # Replit configuration
└── index.js        # Replit entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this for your own projects!

---

Built with ❤️ for synchronized dice rolling fun!