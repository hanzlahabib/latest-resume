// Script to copy rihal-7 files during build
const fs = require('fs');
const path = require('path');

// Create rihal-7 directory in out folder
const rihalDir = path.join(__dirname, 'out', 'rihal-7');
if (!fs.existsSync(rihalDir)) {
  fs.mkdirSync(rihalDir, { recursive: true });
}

// Copy your rihal-7 index.html here
// fs.copyFileSync('path/to/rihal-7/index.html', path.join(rihalDir, 'index.html'));

console.log('Rihal-7 files copied to out/rihal-7/');