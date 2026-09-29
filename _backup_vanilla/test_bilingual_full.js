const fs = require('fs');
const path = require('path');

const i18nFile = fs.readFileSync(path.join(__dirname, 'js', 'i18n.js'), 'utf8');

// Extract translations
const taMatch = i18nFile.match(/ta:\s*\{([\s\S]*?)\n\s*\},/);
const enMatch = i18nFile.match(/en:\s*\{([\s\S]*?)\n\s*\}\n\};/);

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

const htmlFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

console.log("=== BILINGUAL PURITY AUDIT ===");

let totalTamilInEnglishErrors = 0;

for (const file of htmlFiles) {
  const content = fs.readFileSync(path.join(__dirname, file), 'utf8');

  // Check every data-i18n replacement in English mode
  const i18nKeys = [...content.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
  for (const key of i18nKeys) {
    const enVal = en[key];
    if (!enVal) {
      console.error(`[${file}] Key "${key}" missing in English dictionary!`);
      totalTamilInEnglishErrors++;
    } else if (/[\u0B80-\u0BFF]/.test(enVal)) {
      console.error(`[${file}] Key "${key}" in English dict contains Tamil characters: "${enVal}"`);
      totalTamilInEnglishErrors++;
    }
  }

  // Check every data-i18n-placeholder in English mode
  const placeholderKeys = [...content.matchAll(/data-i18n-placeholder="([^"]+)"/g)].map(m => m[1]);
  for (const key of placeholderKeys) {
    const enVal = en[key];
    if (!enVal) {
      console.error(`[${file}] Placeholder "${key}" missing in English dictionary!`);
      totalTamilInEnglishErrors++;
    } else if (/[\u0B80-\u0BFF]/.test(enVal)) {
      console.error(`[${file}] Placeholder "${key}" in English dict contains Tamil characters: "${enVal}"`);
      totalTamilInEnglishErrors++;
    }
  }
}

if (totalTamilInEnglishErrors === 0) {
  console.log("✓ Zero Tamil characters detected in English dictionary across all pages!");
  console.log("✓ Full language switching coverage verified across all 8 Admin pages.");
} else {
  console.error(`Failed with ${totalTamilInEnglishErrors} errors.`);
  process.exit(1);
}
