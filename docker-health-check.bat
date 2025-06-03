@echo off
REM Cloud Dice Docker Health Check Script (Windows)
echo 🐳 Cloud Dice Docker Health Check
echo ==================================

REM Check if Docker is installed and running
echo 🔍 Checking Docker installation...
docker --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Docker is not installed. Please install Docker Desktop.
    pause
    exit /b 1
)

docker info >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Docker is not running. Please start Docker Desktop.
    pause
    exit /b 1
)

echo ✅ Docker is installed and running

REM Check if Docker Compose is available
echo 🔍 Checking Docker Compose...
docker-compose --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    docker compose version >nul 2>&1
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Docker Compose is not available.
        pause
        exit /b 1
    )
)

echo ✅ Docker Compose is available

REM Check if services are running
echo 🔍 Checking Cloud Dice services...

docker-compose ps | findstr "clouddice-server-dev.*Up" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✅ Development server is running
    set SERVER_STATUS=running
) else (
    echo ⚠️  Development server is not running
    set SERVER_STATUS=stopped
)

docker-compose ps | findstr "clouddice-client-dev.*Up" >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✅ Development client is running
    set CLIENT_STATUS=running
) else (
    echo ⚠️  Development client is not running
    set CLIENT_STATUS=stopped
)

REM Health check endpoints if services are running
if "%SERVER_STATUS%"=="running" (
    echo 🏥 Testing server health endpoint...
    curl -s http://localhost:3001/health >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo ✅ Server health endpoint is responding
    ) else (
        echo ⚠️  Server health endpoint is not responding
    )
)

if "%CLIENT_STATUS%"=="running" (
    echo 🌐 Testing client endpoint...
    curl -s http://localhost:5173 >nul 2>&1
    if %ERRORLEVEL% EQU 0 (
        echo ✅ Client is accessible
    ) else (
        echo ⚠️  Client is not accessible
    )
)

echo.
echo 📊 Docker System Info:
echo ----------------------
docker system df

echo.
echo 📋 Running Containers:
echo ----------------------
docker ps

echo.
echo 🎯 Quick Commands:
echo ===================
echo Start development:   npm run docker:dev
echo Stop development:    npm run docker:dev:down
echo View logs:           docker-compose logs -f
echo Clean up:            npm run docker:clean

echo.
if "%SERVER_STATUS%"=="running" if "%CLIENT_STATUS%"=="running" (
    echo 🎉 All systems are GO! Visit http://localhost:5173 to play Cloud Dice!
) else (
    echo 🚀 Ready to start! Run 'npm run docker:dev' to begin.
)

pause
