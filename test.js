const render = require('./render.js');
const fs = require('fs');
fs.writeFileSync('./test.jpg', render(require('./example.json'), '중식'))