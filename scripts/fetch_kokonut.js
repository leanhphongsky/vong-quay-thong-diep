const fs = require('fs');
const path = require('path');

const urls = [
  'https://kokonutui.com/r/card-stack.json',
  'https://kokonutui.com/r/liquid-glass-card.json',
  'https://kokonutui.com/r/card-flip.json',
  'https://kokonutui.com/r/morphic-navbar.json',
  'https://kokonutui.com/r/avatar-picker.json',
  'https://kokonutui.com/r/loader.json',
  'https://kokonutui.com/r/plucked-text.json',
  'https://kokonutui.com/r/marker-text.json',
  'https://kokonutui.com/r/switch-button.json'
];

fs.mkdirSync('kokonut_raw', { recursive: true });
fs.mkdirSync('components/kokonutui', { recursive: true });

async function run() {
  for (const url of urls) {
    const name = path.basename(url, '.json');
    console.log('Fetching', url);
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`Failed to fetch ${url}: status ${res.status}`);
      continue;
    }
    const json = await res.json();
    fs.writeFileSync(path.join('kokonut_raw', `${name}.json`), JSON.stringify(json, null, 2), 'utf-8');
    
    console.log(`Component: ${json.name}, files: ${json.files?.length}`);
    if (json.files) {
      for (const file of json.files) {
        const dest = file.target || file.path || `components/kokonutui/${name}.tsx`;
        const fullDest = path.resolve(dest);
        fs.mkdirSync(path.dirname(fullDest), { recursive: true });
        fs.writeFileSync(fullDest, file.content, 'utf-8');
        console.log(`  -> Written to: ${dest}`);
      }
    }
  }
  console.log('ALL DONE!');
}

run().catch(console.error);
