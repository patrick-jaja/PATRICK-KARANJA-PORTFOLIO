const fs = require('fs');
const path = require('path');
const html = fs.readFileSync('index.html', 'utf8');

function resolveLocalReference(reference) {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(reference)) return null;

  const pathname = reference.split(/[?#]/, 1)[0];
  try {
    return path.resolve(__dirname, decodeURIComponent(pathname).replace(/^[/\\]+/, ''));
  } catch {
    return null;
  }
}

const regex = /src=["']([^"']+)["']/g;
let match;
while ((match = regex.exec(html)) !== null) {
  const src = match[1];
  const filePath = resolveLocalReference(src);
  if (filePath && !fs.existsSync(filePath)) {
    console.log('Missing file:', src);
  }
}

const hrefRegex = /href=["']([^"']+)["']/g;
while ((match = hrefRegex.exec(html)) !== null) {
  const href = match[1];
  const filePath = resolveLocalReference(href);
  if (filePath && !fs.existsSync(filePath)) {
    console.log('Missing file (href):', href);
  }
}
