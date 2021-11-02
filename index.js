#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const colors = {
  piro: '\x1b[38;2;255;121;79m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m',
};

if (fs.readdirSync(process.cwd()).length != 0) {
  console.error(`${colors.red}Please use the command in a non-empty directory${colors.reset}`);
  process.exit(1);
}

console.log(`Creating a new ${colors.piro}piro${colors.reset} app...`);

const copyRecursiveSync = (src, dest) => {
  const exists = fs.existsSync(src);
  if (!exists) return;

  const stats = fs.statSync(src);
  const isDirectory = stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest);

    for (const f of fs.readdirSync(src)) {
      copyRecursiveSync(path.join(src, f), path.join(dest, f));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
};

copyRecursiveSync(path.join(__dirname, 'template'), process.cwd());
fs.renameSync(path.join(process.cwd(), 'gitignore'), path.join(process.cwd(), '.gitignore'));

const packageJson = {
  scripts: {
    dev: 'node dev.js',
    build: 'node build.js',
  },
};

fs.writeFileSync(path.join(process.cwd(), 'package.json'), JSON.stringify(packageJson, null, 2));

execSync('npm i piro && npm i -D chokidar');

console.log(`\n${colors.green}Ready!${colors.reset}`);
console.log(`\nTo get started -> ${colors.yellow}npm${colors.reset} run dev`);
