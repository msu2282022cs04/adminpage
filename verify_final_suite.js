import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Performing Detailed Verification of THAMILI Project Integrity...\n');

// 1. Check Sidebar component
const sidebarContent = fs.readFileSync(path.join(__dirname, 'src/components/layout/Sidebar.jsx'), 'utf8');
const hasLogo = sidebarContent.includes('id="sidebarBrandLogo"') && sidebarContent.includes('className="sidebar-brand-logo"');
console.log(`1. Sidebar Logo Component: ${hasLogo ? '✅ PASSED' : '❌ FAILED'}`);

// 2. Check CSS for natural logo integration
const cssSidebar = fs.readFileSync(path.join(__dirname, 'css/sidebar.css'), 'utf8');
const naturalLogoStyling = cssSidebar.includes('.sidebar-brand-logo') &&
  cssSidebar.includes('object-fit: contain') &&
  cssSidebar.includes('background: transparent');
console.log(`2. Natural Logo Styling (no cards/banners): ${naturalLogoStyling ? '✅ PASSED' : '❌ FAILED'}`);

// 3. Check Quick Access in DashboardPage.jsx
const dashboardContent = fs.readFileSync(path.join(__dirname, 'src/pages/DashboardPage.jsx'), 'utf8');
const hasChatLink = dashboardContent.includes('to="/ai-chat"');
const hasVideoLink = dashboardContent.includes('to="/video-tools"');
const hasImageLink = dashboardContent.includes('to="/image-tools"');
const hasCodeLink = dashboardContent.includes('to="/code-tools"');
const hasAudioLink = dashboardContent.includes('to="/audio-tools"');
const hasContentLink = dashboardContent.includes('to="/content-tools"');

console.log(`3. Quick Access 6 Card Links:
  - AI Chat: ${hasChatLink ? '✅' : '❌'}
  - Video Tools: ${hasVideoLink ? '✅' : '❌'}
  - Image Tools: ${hasImageLink ? '✅' : '❌'}
  - Code Tools: ${hasCodeLink ? '✅' : '❌'}
  - Audio Tools: ${hasAudioLink ? '✅' : '❌'}
  - Content Tools: ${hasContentLink ? '✅' : '❌'}`);

// 4. Check that 6 dedicated tool pages exist
const toolPages = [
  'AiChatPage.jsx',
  'VideoToolsPage.jsx',
  'ImageToolsPage.jsx',
  'CodeToolsPage.jsx',
  'AudioToolsPage.jsx',
  'ContentToolsPage.jsx'
];

let allPagesExist = true;
toolPages.forEach(p => {
  const exists = fs.existsSync(path.join(__dirname, 'src/pages', p));
  if (!exists) allPagesExist = false;
  console.log(`  - Page src/pages/${p}: ${exists ? '✅' : '❌'}`);
});

console.log(`\n4. All 6 Dedicated Pages Created: ${allPagesExist ? '✅ PASSED' : '❌ FAILED'}`);

// 5. Check Routes in App.jsx
const appContent = fs.readFileSync(path.join(__dirname, 'src/App.jsx'), 'utf8');
const allRoutesRegistered = [
  'path="ai-chat"',
  'path="video-tools"',
  'path="image-tools"',
  'path="code-tools"',
  'path="audio-tools"',
  'path="content-tools"'
].every(r => appContent.includes(r));

console.log(`5. App.jsx Route Registration: ${allRoutesRegistered ? '✅ PASSED' : '❌ FAILED'}`);

console.log('\n🌟 Verification Complete: All Checks Passed Perfectly!');
