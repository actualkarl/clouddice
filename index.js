// Replit entry point for Cloud Dice
const { exec } = require('child_process');
const path = require('path');

console.log('🎲 Starting Cloud Dice...');

// Start backend server
const backend = exec('npm start', { 
  cwd: path.join(__dirname, 'server'),
  env: { ...process.env, PORT: 3001 }
});

backend.stdout.on('data', (data) => {
  console.log(`[Backend] ${data}`);
});

backend.stderr.on('data', (data) => {
  console.error(`[Backend Error] ${data}`);
});

// Start frontend dev server
const frontend = exec('npm run dev -- --host', { 
  cwd: path.join(__dirname, 'client'),
  env: { ...process.env, VITE_SERVER_URL: 'https://' + process.env.REPL_SLUG + '.' + process.env.REPL_OWNER + '.repl.co:3001' }
});

frontend.stdout.on('data', (data) => {
  console.log(`[Frontend] ${data}`);
});

frontend.stderr.on('data', (data) => {
  console.error(`[Frontend Error] ${data}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down Cloud Dice...');
  backend.kill();
  frontend.kill();
  process.exit();
});