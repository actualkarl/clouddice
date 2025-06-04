# Share Cloud Dice from Windows

## Option 1: Ngrok (Easiest - Works in 2 minutes)

### From Windows PowerShell/CMD:
```bash
# 1. Start your app (choose one):

# Option A: Using npm (easier)
cd C:\Users\GGPC\Downloads\Coding_Projects\clouddice
npm run dev:all

# Option B: Using Docker Desktop
docker-compose -f docker-compose.prod.yml up

# 2. Download ngrok:
# https://ngrok.com/download (Windows version)

# 3. Run ngrok (in new terminal):
ngrok http 3001  # for npm dev
# OR
ngrok http 80    # for Docker

# 4. Share the HTTPS URL with friends!
```

## Option 2: Direct Network Access (Same WiFi)

```powershell
# 1. Get your IP address
ipconfig
# Look for "IPv4 Address" (like 192.168.1.123)

# 2. Windows Firewall - Allow NodeJS
# Windows Security > Firewall > Allow an app

# 3. Friends on same WiFi access:
# http://192.168.1.123:3001
```

## Option 3: Port Forwarding (Permanent)

1. **Get Public IP:** 
   - Visit: whatismyipaddress.com

2. **Router Settings:**
   - Access: http://192.168.1.1 (or similar)
   - Port Forwarding:
     - Service: CloudDice
     - External: 80
     - Internal: 3001
     - Device: Your PC

3. **Friends Access:**
   - http://YOUR-PUBLIC-IP

## Quick Cloud Alternative

Since Render failed, try **Replit**:

1. Go to https://replit.com
2. Import from GitHub
3. It auto-detects Node.js
4. Click "Run"
5. Share the replit URL!

## Testing

### Local Test:
- You: http://localhost:5173 (frontend)
- You: http://localhost:3001 (backend)

### Friend Test:
- Send them the ngrok/public URL
- Both join same room
- Roll dice together!

## Common Issues

**"Cannot GET /"**
- Make sure to share port 5173 (frontend) not 3001

**"Connection refused"**
- Windows Firewall blocking
- Add Node.js exception

**"Ngrok tunnel expired"**
- Free tier = 2 hour limit
- Just restart ngrok

## Performance Tips
- Close other apps (saves bandwidth)
- Wired > WiFi for hosting
- Limit to 5-10 friends max on home internet