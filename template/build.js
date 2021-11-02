const { build } = require('piro');
const path = require('path');

build({
  src: path.join(__dirname, 'src'),
  out: path.join(__dirname, 'out'),
  static: path.join(__dirname, 'static'),
  pages: 'pages',
});
