# Quick Share Cloud Dice with Friends

## Method 1: Ngrok (Recommended - 2 minutes)

1. **Start Docker:**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

2. **Download Ngrok:**
- Go to https://ngrok.com/download
- Sign up for free account
- Download and extract

3. **Share Your App:**
```bash
ngrok http 80
```

4. **Share the URL with friends:**
- Look for: `Forwarding https://xxxxx.ngrok.io`
- That's your shareable link!

## Method 2: Cloudflare Tunnel (No signup)

```bash
# One command:
docker run cloudflare/cloudflared:latest tunnel --url http://host.docker.internal:80
```

## Method 3: Port Forwarding (Permanent)

1. Find your public IP: https://whatismyipaddress.com
2. Configure router port forwarding:
   - External Port: 80 → Internal Port: 80
   - Internal IP: Your PC's IP
3. Friends access: http://YOUR-PUBLIC-IP

## Method 4: Free VPS Trial

- **Oracle Cloud**: Always free tier
- **Google Cloud**: $300 credit
- **AWS**: 12 months free tier

## Quick Test

After any method:
1. You open: http://localhost
2. Friends open: The shared URL
3. Everyone can roll dice together!

## Troubleshooting

**"Connection refused"**
- Check Windows Firewall
- Ensure Docker is running
- Try port 3000 instead of 80

**"Site can't be reached"**
- Ngrok might have timed out (free = 2hr limit)
- Restart ngrok command

**Performance issues**
- Your upload speed matters
- Consider upgrading internet or using cloud