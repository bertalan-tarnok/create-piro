const { watch } = require('chokidar');
const { execSync } = require('child_process');

const watcher = watch('.', {
  ignored: /^out|node_modules/,
  ignoreInitial: true,
});

execSync('npm run build');

watcher.on('all', () => {
  execSync('npm run build');
});
