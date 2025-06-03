#!/bin/bash

# Cloud Dice Docker Health Check Script
echo "🐳 Cloud Dice Docker Health Check"
echo "=================================="

# Check if Docker is installed and running
echo "🔍 Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker Desktop."
    exit 1
fi

if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker Desktop."
    exit 1
fi

echo "✅ Docker is installed and running"

# Check if Docker Compose is available
echo "🔍 Checking Docker Compose..."
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose is not available."
    exit 1
fi

echo "✅ Docker Compose is available"

# Check if services are running
echo "🔍 Checking Cloud Dice services..."

# Check if development services are running
if docker-compose ps | grep -q "clouddice-server-dev.*Up"; then
    echo "✅ Development server is running"
    SERVER_STATUS="running"
else
    echo "⚠️  Development server is not running"
    SERVER_STATUS="stopped"
fi

if docker-compose ps | grep -q "clouddice-client-dev.*Up"; then
    echo "✅ Development client is running"
    CLIENT_STATUS="running"
else
    echo "⚠️  Development client is not running"
    CLIENT_STATUS="stopped"
fi

# Health check endpoints if services are running
if [ "$SERVER_STATUS" = "running" ]; then
    echo "🏥 Testing server health endpoint..."
    if curl -s http://localhost:3001/health > /dev/null 2>&1; then
        echo "✅ Server health endpoint is responding"
    else
        echo "⚠️  Server health endpoint is not responding"
    fi
fi

if [ "$CLIENT_STATUS" = "running" ]; then
    echo "🌐 Testing client endpoint..."
    if curl -s http://localhost:5173 > /dev/null 2>&1; then
        echo "✅ Client is accessible"
    else
        echo "⚠️  Client is not accessible"
    fi
fi

echo ""
echo "📊 Docker System Info:"
echo "----------------------"
docker system df --format "table {{.Type}}\t{{.TotalCount}}\t{{.Size}}\t{{.Reclaimable}}"

echo ""
echo "📋 Running Containers:"
echo "----------------------"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

echo ""
echo "🎯 Quick Commands:"
echo "==================="
echo "Start development:   npm run docker:dev"
echo "Stop development:    npm run docker:dev:down"
echo "View logs:           docker-compose logs -f"
echo "Clean up:            npm run docker:clean"

echo ""
if [ "$SERVER_STATUS" = "running" ] && [ "$CLIENT_STATUS" = "running" ]; then
    echo "🎉 All systems are GO! Visit http://localhost:5173 to play Cloud Dice!"
else
    echo "🚀 Ready to start! Run 'npm run docker:dev' to begin."
fi
