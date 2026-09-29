const fs = require('fs');
const path = require('path');

const i18nFile = fs.readFileSync(path.join(__dirname, 'js', 'i18n.js'), 'utf8');

// Extract translations
const taMatch = i18nFile.match(/ta:\s*\{([\s\S]*?)\n\s*\},/);
const enMatch = i18nFile.match(/en:\s*\{([\s\S]*?)\n\s*\}\n\};/);

// Basic eval to extract dictionary objects safely
const extractDict = (str) => {
  const obj = {};
  const lines = str.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || !trimmed.includes(':')) continue;
    const colonIdx = trimmed.indexOf(':');
    const key = trimmed.slice(0, colonIdx).trim();
    let val = trimmed.slice(colonIdx + 1).trim();
    if (val.endsWith(',')) val = val.slice(0, -1);
    try {
      obj[key] = eval(val);
    } catch (e) {
      obj[key] = val;
    }
  }
  return obj;
};

const ta = extractDict(taMatch[1]);
const en = extractDict(enMatch[1]);

console.log(`Loaded ${Object.keys(ta).length} Tamil keys and ${Object.keys(en).length} English keys.`);

const htmlFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

let totalMissing = 0;

for (const htmlFile of htmlFiles) {
  const content = fs.readFileSync(path.join(__dirname, htmlFile), 'utf8');
  
  // Find all data-i18n="..."
  const i18nMatches = [...content.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
  for (const key of i18nMatches) {
    if (!ta[key]) {
      console.error(`[${htmlFile}] MISSING Tamil translation for data-i18n key: "${key}"`);
      totalMissing++;
    }
    if (!en[key]) {
      console.error(`[${htmlFile}] MISSING English translation for data-i18n key: "${key}"`);
      totalMissing++;
    }
  }

  // Find all data-i18n-placeholder="..."
  const placeholderMatches = [...content.matchAll(/data-i18n-placeholder="([^"]+)"/g)].map(m => m[1]);
  for (const key of placeholderMatches) {
    if (!ta[key]) {
      console.error(`[${htmlFile}] MISSING Tamil translation for placeholder key: "${key}"`);
      totalMissing++;
    }
    if (!en[key]) {
      console.error(`[${htmlFile}] MISSING English translation for placeholder key: "${key}"`);
      totalMissing++;
    }
  }
}

if (totalMissing === 0) {
  console.log("✓ ALL HTML data-i18n and data-i18n-placeholder keys have 100% complete bilingual definitions!");
} else {
  console.error(`Found ${totalMissing} missing keys.`);
  process.exit(1);
}
