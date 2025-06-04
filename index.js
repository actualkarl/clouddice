// Replit entry point for Cloud Dice
console.log('🎲 Cloud Dice - Replit Production Server');

// Import built server
try {
  require('./server/dist/index.js');
} catch (error) {
  console.error('❌ Server build not found. Building now...');
  
  const { execSync } = require('child_process');
  
  try {
    console.log('📦 Installing dependencies...');
    execSync('npm run install:all', { stdio: 'inherit' });
    
    console.log('🔨 Building project...');
    execSync('npm run build', { stdio: 'inherit' });
    
    console.log('🚀 Starting server...');
    require('./server/dist/index.js');
  } catch (buildError) {
    console.error('❌ Build failed:', buildError.message);
    process.exit(1);
  }
}