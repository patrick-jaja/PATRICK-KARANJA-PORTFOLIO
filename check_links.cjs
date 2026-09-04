const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const idRegex = /id=["']([^"']+)["']/g;
const ids = new Set();
let match;
while ((match = idRegex.exec(html)) !== null) {
  ids.add(match[1]);
}

const hrefRegex = /href=["']#([^"']+)["']/g;
while ((match = hrefRegex.exec(html)) !== null) {
  const targetId = match[1];
  if (!ids.has(targetId) && targetId !== '') {
    console.log('Broken internal link:', '#' + targetId);
  }
}
