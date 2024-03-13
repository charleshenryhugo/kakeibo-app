const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// Read the SVG file
const svgContent = fs.readFileSync('./client/public/icons.svg', 'utf-8');

// Parse the SVG content
const dom = new JSDOM(svgContent);
const document = dom.window.document;

// Select all symbols and extract the IDs
const symbols = document.querySelectorAll('symbol');
const ids = Array.from(symbols).map(symbol => symbol.id);

console.log(ids);
console.log(`${ids.length} svg ids found`);

// [
//   'icon-wallet',
//   'icon-banknote',
//   'icon-book',
//   'icon-library',
//   'icon-coin-yen',
//   'icon-spoon-knife',
//   'icon-rocket',
//   'icon-hammer2',
//   'icon-fire',
//   'icon-shield',
//   'icon-earth',
//   'icon-flag',
//   'icon-npm'
// ]