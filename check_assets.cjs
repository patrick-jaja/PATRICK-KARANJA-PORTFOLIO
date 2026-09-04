const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const regex = /src=["']([^"']+)["']/g;
let match;
while ((match = regex.exec(html)) !== null) {
  const src = match[1];
  if (!src.startsWith('http') && !src.startsWith('data:')) {
    if (!fs.existsSync(src)) {
      console.log('Missing file:', src);
    }
  }
}

const hrefRegex = /href=["']([^"']+)["']/g;
while ((match = hrefRegex.exec(html)) !== null) {
  const href = match[1];
  if (!href.startsWith('http') && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
    if (!fs.existsSync(href)) {
      console.log('Missing file (href):', href);
    }
  }
}
