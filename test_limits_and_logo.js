/**
 * Comprehensive Verification Suite for Free Limits & Credits and Language Logo Switching
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

const BASE_DIR = __dirname;
let passed = 0;
let total = 0;

function test(name, fn) {
  total++;
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✕ ${name}: ${err.message}`);
  }
}

console.log('🧪 RUNNING COMPREHENSIVE FREE LIMITS & LOGO VERIFICATION SUITE\n');

// 1. Verify Logo Files
console.log('1. Checking Provided Logo Files:');
test('Tamil logo assets/images/thamili-logo-ta.png exists and is non-empty', () => {
  const p = path.join(BASE_DIR, 'assets', 'images', 'thamili-logo-ta.png');
  assert(fs.existsSync(p), 'thamili-logo-ta.png does not exist');
  assert(fs.statSync(p).size > 10000, 'thamili-logo-ta.png is too small');
});

test('English logo assets/images/thamili-logo-en.png exists and is non-empty', () => {
  const p = path.join(BASE_DIR, 'assets', 'images', 'thamili-logo-en.png');
  assert(fs.existsSync(p), 'thamili-logo-en.png does not exist');
  assert(fs.statSync(p).size > 10000, 'thamili-logo-en.png is too small');
});

// 2. Verify all HTML files for logo integration
console.log('\n2. Checking Logo in all HTML files:');
const htmlFiles = [
  'ai-tools.html', 'index.html', 'ai-usage.html', 'users.html',
  'content.html', 'language.html', 'reports.html', 'feedback.html', 'settings.html'
];

htmlFiles.forEach(file => {
  test(`${file} contains sidebar brand logo img tag with correct id and src`, () => {
    const content = fs.readFileSync(path.join(BASE_DIR, file), 'utf8');
    assert(content.includes('sidebar-brand-logo'), `${file} missing sidebar-brand-logo class`);
    assert(content.includes('id="sidebarBrandLogo"') || content.includes("id='sidebarBrandLogo'"), `${file} missing sidebarBrandLogo ID`);
    assert(content.includes('assets/images/thamili-logo-ta.png'), `${file} missing thamili-logo-ta.png default src`);
  });
});

// 3. Verify ai-tools.html structure
console.log('\n3. Checking ai-tools.html Free Limits & Credits:');
const aiToolsHtml = fs.readFileSync(path.join(BASE_DIR, 'ai-tools.html'), 'utf8');

test('Hero banner has Free Limits & Credits title and description', () => {
  assert(aiToolsHtml.includes('data-i18n="page_limits_title"'), 'Missing page_limits_title attribute');
  assert(aiToolsHtml.includes('data-i18n="page_limits_subtitle"'), 'Missing page_limits_subtitle attribute');
});

test('Old 6 tool cards are removed from main area', () => {
  assert(!aiToolsHtml.includes('aiToolsGridView'), 'Old aiToolsGridView still present');
  assert(!aiToolsHtml.includes('card_chat_user_desc'), 'Old card_chat_user_desc still present');
  assert(!aiToolsHtml.includes('card_video_user_desc'), 'Old card_video_user_desc still present');
  assert(!aiToolsHtml.includes('card_image_user_desc'), 'Old card_image_user_desc still present');
});

test('4 Summary Cards exist with correct values', () => {
  assert(aiToolsHtml.includes('id="sumTotalCredits"'), 'Missing sumTotalCredits');
  assert(aiToolsHtml.includes('100'), 'Missing 100 value');
  assert(aiToolsHtml.includes('id="sumCreditsUsed"'), 'Missing sumCreditsUsed');
  assert(aiToolsHtml.includes('34'), 'Missing 34 value');
  assert(aiToolsHtml.includes('id="sumCreditsRemaining"'), 'Missing sumCreditsRemaining');
  assert(aiToolsHtml.includes('66'), 'Missing 66 value');
  assert(aiToolsHtml.includes('id="sumActiveUsers"'), 'Missing sumActiveUsers');
  assert(aiToolsHtml.includes('128'), 'Missing 128 value');
});

test('6 Detailed Free Limit cards exist with progress bar, status, and manage buttons', () => {
  const tools = ['chat', 'image', 'video', 'audio', 'code', 'content'];
  tools.forEach(t => {
    assert(aiToolsHtml.includes(`id="limitCard-${t}"`), `Missing limitCard-${t}`);
    assert(aiToolsHtml.includes(`id="statusPill-${t}"`), `Missing statusPill-${t}`);
    assert(aiToolsHtml.includes(`id="progressFill-${t}"`), `Missing progressFill-${t}`);
    assert(aiToolsHtml.includes(`openManageLimitModal('${t}')`), `Missing openManageLimitModal('${t}')`);
  });
});

test('Manage Limit modal exists with all required fields', () => {
  assert(aiToolsHtml.includes('id="manageLimitModal"'), 'Missing manageLimitModal');
  assert(aiToolsHtml.includes('id="manageDailyLimitInput"'), 'Missing manageDailyLimitInput');
  assert(aiToolsHtml.includes('id="manageMonthlyLimitInput"'), 'Missing manageMonthlyLimitInput');
  assert(aiToolsHtml.includes('id="manageCreditCostInput"'), 'Missing manageCreditCostInput');
  assert(aiToolsHtml.includes('id="manageEnableLimitToggle"'), 'Missing manageEnableLimitToggle');
  assert(aiToolsHtml.includes('data-i18n="btn_save_changes"'), 'Missing btn_save_changes');
  assert(aiToolsHtml.includes('data-i18n="btn_cancel"'), 'Missing btn_cancel');
});

test('Credit Settings section exists with controls and buttons', () => {
  assert(aiToolsHtml.includes('id="creditSettingsForm"'), 'Missing creditSettingsForm');
  assert(aiToolsHtml.includes('id="settingDailyCredits"'), 'Missing settingDailyCredits');
  assert(aiToolsHtml.includes('id="settingMonthlyCredits"'), 'Missing settingMonthlyCredits');
  assert(aiToolsHtml.includes('id="settingEnableCreditsToggle"'), 'Missing settingEnableCreditsToggle');
  assert(aiToolsHtml.includes('id="settingRolloverToggle"'), 'Missing settingRolloverToggle');
  assert(aiToolsHtml.includes('id="btnResetCredits"'), 'Missing btnResetCredits');
  assert(aiToolsHtml.includes('id="btnSaveCreditSettings"'), 'Missing btnSaveCreditSettings');
});

test('Recent Credit Activity table exists with proper columns and records', () => {
  assert(aiToolsHtml.includes('id="recentCreditActivityTable"'), 'Missing recentCreditActivityTable');
  assert(aiToolsHtml.includes('data-i18n="th_user"'), 'Missing th_user');
  assert(aiToolsHtml.includes('data-i18n="th_tool"'), 'Missing th_tool');
  assert(aiToolsHtml.includes('data-i18n="th_credits_used"'), 'Missing th_credits_used');
  assert(aiToolsHtml.includes('data-i18n="th_date"'), 'Missing th_date');
  assert(aiToolsHtml.includes('data-i18n="th_status"'), 'Missing th_status');
  assert(aiToolsHtml.includes('Kavin Raj'), 'Missing demo user Kavin Raj');
  assert(aiToolsHtml.includes('Priya Sundaram'), 'Missing demo user Priya Sundaram');
  assert(aiToolsHtml.includes('Murugan S'), 'Missing demo user Murugan S');
});

// 4. Verify i18n Dictionary and Dynamic Logo Logic
console.log('\n4. Checking i18n Dictionary & Logo Switching:');
const i18nContent = fs.readFileSync(path.join(BASE_DIR, 'js', 'i18n.js'), 'utf8');

test('i18n contains Tamil and English translations for all new elements', () => {
  const requiredKeys = [
    'page_limits_title', 'page_limits_subtitle', 'summary_total_free_credits',
    'summary_credits_used_today', 'summary_credits_remaining', 'summary_users_free_credits',
    'section_free_limits_title', 'card_free_limit', 'card_credits_used', 'card_remaining_credits',
    'btn_manage_limit', 'modal_manage_limit_title', 'label_daily_limit', 'label_monthly_limit',
    'label_credit_cost', 'label_enable_free_limit', 'section_credit_settings_title',
    'label_daily_free_credits', 'label_monthly_free_credits', 'label_enable_free_credits_toggle',
    'label_rollover_toggle', 'btn_reset_credits', 'section_recent_activity_title',
    'th_user', 'th_tool', 'th_credits_used', 'th_date', 'th_status'
  ];
  requiredKeys.forEach(k => {
    assert(i18nContent.includes(`${k}:`), `Missing key: ${k}`);
  });
});

test('i18n setLanguage dynamically swaps logo based on language', () => {
  assert(i18nContent.includes('assets/images/thamili-logo-en.png'), 'Missing EN logo path in i18n');
  assert(i18nContent.includes('assets/images/thamili-logo-ta.png'), 'Missing TA logo path in i18n');
  assert(i18nContent.includes('sidebar-brand-logo'), 'Missing logo selector in i18n');
});

console.log(`\n========================================`);
console.log(`RESULTS: ${passed} / ${total} tests PASSED!`);
console.log(`========================================\n`);
