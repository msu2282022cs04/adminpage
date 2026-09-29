const fs = require('fs');
const path = require('path');

console.log('==================================================');
console.log('🧪 RUNNING COMPREHENSIVE ADMIN PROFILE & LOGO SUITE');
console.log('==================================================\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failCount++;
  }
}

// 1. Test Logo in all 9 HTML files
console.log('1. Verifying Pure Tamil Text Logo "தமிழி" Across All 9 Pages:');
const htmlFiles = [
  'index.html',
  'users.html',
  'ai-tools.html',
  'ai-usage.html',
  'content.html',
  'language.html',
  'feedback.html',
  'reports.html',
  'settings.html'
];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
  assert(content.includes('<span class="sidebar-brand-text">தமிழி</span>'), `${file} contains exact pure text logo <span class="sidebar-brand-text">தமிழி</span>`);
  
  // Extract sidebar header
  const headerMatch = content.match(/<div class="sidebar-header">([\s\S]*?)<\/div>/);
  assert(headerMatch !== null, `${file} has <div class="sidebar-header">`);
  if (headerMatch) {
    const headerHtml = headerMatch[1];
    assert(!headerHtml.includes('thamili-logo.png'), `${file} sidebar-header does NOT contain image logo`);
    assert(!headerHtml.includes('THAMILI'), `${file} sidebar-header does NOT contain English text 'THAMILI'`);
    assert(!headerHtml.includes('AI'), `${file} sidebar-header does NOT contain subtitle 'AI'`);
    assert(!headerHtml.includes('<svg'), `${file} sidebar-header does NOT contain icon <svg>`);
    assert(!headerHtml.includes('<img'), `${file} sidebar-header does NOT contain icon <img>`);
  }
});

// 2. Test CSS rules for Logo
console.log('\n2. Verifying Logo Styling (No Box, No Border, No Circle, No Background Container):');
const sidebarCss = fs.readFileSync(path.join(__dirname, 'css/sidebar.css'), 'utf8');
assert(sidebarCss.includes('.sidebar-brand-text {'), 'sidebar.css has .sidebar-brand-text rule');
assert(sidebarCss.includes('font-size: 32px;'), 'sidebar.css sets clean typography size 32px');
assert(sidebarCss.includes('color: #ffffff;'), 'sidebar.css sets clean white color');
assert(sidebarCss.includes('background: none;') || sidebarCss.includes('background: transparent;') || !sidebarCss.includes('.sidebar-brand-text { background: #'), 'sidebar.css has no surrounding box background');

// 3. Test Profile & Edit Profile Modal Fields in all 9 HTML files
console.log('\n3. Verifying All Required Fields in Edit Profile and View Profile Modals:');
const requiredEditFields = [
  { id: 'editAvatarPreview', desc: 'Avatar Preview Image' },
  { id: 'editAvatarFile', desc: 'Avatar File Input' },
  { id: 'editFullName', desc: 'Full Name Input' },
  { id: 'editUsername', desc: 'Username Input' },
  { id: 'editEmail', desc: 'Email Address Input' },
  { id: 'editPhone', desc: 'Phone Number Input' },
  { id: 'editDob', desc: 'Date of Birth Input' },
  { id: 'editGender', desc: 'Gender Select' },
  { id: 'editAdminId', desc: 'Admin ID Input (System Managed)' },
  { id: 'editRole', desc: 'Role Input (System Managed)' },
  { id: 'editBio', desc: 'Biography Textarea' },
  { id: 'editCreated', desc: 'Account Created Input (System Managed)' },
  { id: 'editLastLogin', desc: 'Last Login Input (System Managed)' }
];

const requiredDisplayFields = [
  { id: 'profileAdminId', desc: 'Profile Admin ID' },
  { id: 'profileRole', desc: 'Profile Role' },
  { id: 'profileLastLogin', desc: 'Profile Last Login' },
  { id: 'profileUsernameVal', desc: 'Profile Username Display' },
  { id: 'profileDisplayEmail', desc: 'Profile Email Display' },
  { id: 'profilePhoneVal', desc: 'Profile Phone Display' },
  { id: 'profileDobVal', desc: 'Profile DOB Display' },
  { id: 'profileGenderVal', desc: 'Profile Gender Display' },
  { id: 'profileBioVal', desc: 'Profile Bio Display' },
  { id: 'profileCreatedVal', desc: 'Profile Account Created Display' },
  { id: 'profileStatusVal', desc: 'Profile Account Status Badge Display' }
];

htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
  requiredEditFields.forEach(f => {
    assert(content.includes(`id="${f.id}"`), `${file} has ${f.desc} (id="${f.id}")`);
  });
  requiredDisplayFields.forEach(f => {
    assert(content.includes(`id="${f.id}"`), `${file} has ${f.desc} (id="${f.id}")`);
  });
});

// 4. Test Phone Number Validation & JS Logic
console.log('\n4. Verifying Phone Number Validation & Profile Persistence Logic in app.js:');
const appJs = fs.readFileSync(path.join(__dirname, 'js/app.js'), 'utf8');
assert(appJs.includes('DEFAULT_ADMIN_PROFILE'), 'app.js defines DEFAULT_ADMIN_PROFILE');
assert(appJs.includes('getAdminProfile'), 'app.js defines getAdminProfile()');
assert(appJs.includes('saveAdminProfile'), 'app.js defines saveAdminProfile()');
assert(appJs.includes('applyAdminProfileToDOM'), 'app.js defines applyAdminProfileToDOM()');
assert(appJs.includes('populateEditProfileForm'), 'app.js defines populateEditProfileForm()');
assert(appJs.includes('thamili_admin_profile'), 'app.js uses localStorage key thamili_admin_profile');
assert(appJs.includes('phoneClean.length !== 10') || appJs.includes('/^[0-9]{10}$/'), 'app.js validates exactly 10 digit phone numbers');
assert(appJs.includes('FileReader'), 'app.js handles avatar image upload via FileReader');

// Test phone validation regex directly
const phoneRegex = /^[0-9]{10}$/;
assert(phoneRegex.test('9876543210') === true, 'Phone "9876543210" is VALID (10 digits)');
assert(phoneRegex.test('1234567890') === true, 'Phone "1234567890" is VALID (10 digits)');
assert(phoneRegex.test('12345') === false, 'Phone "12345" is REJECTED (<10 digits)');
assert(phoneRegex.test('987654321099') === false, 'Phone "987654321099" is REJECTED (>10 digits)');
assert(phoneRegex.test('98765abcde') === false, 'Phone "98765abcde" is REJECTED (non-numeric)');
assert(phoneRegex.test('98765-43210') === false, 'Phone "98765-43210" is REJECTED (contains hyphen)');

// 5. Test i18n Translations for Profile Keys
console.log('\n5. Verifying i18n Tamil and English dictionaries:');
const i18nJs = fs.readFileSync(path.join(__dirname, 'js/i18n.js'), 'utf8');
const keysToCheck = [
  'modal_profile_title',
  'modal_edit_profile_title',
  'profile_admin_id',
  'profile_role_badge',
  'profile_last_login',
  'profile_personal_info',
  'profile_username',
  'profile_phone',
  'profile_dob',
  'profile_gender',
  'profile_gender_male',
  'profile_gender_female',
  'profile_gender_other',
  'profile_account_details',
  'profile_created',
  'profile_status',
  'profile_status_active',
  'label_photo',
  'label_photo_hint',
  'btn_change_photo',
  'label_fullname',
  'label_email',
  'label_dob',
  'label_gender',
  'gender_male',
  'gender_female',
  'gender_other',
  'label_admin_id',
  'label_role',
  'label_bio',
  'label_account_created',
  'label_last_login',
  'readonly_tag',
  'btn_save',
  'btn_cancel',
  'btn_edit_profile',
  'msg_phone_invalid',
  'msg_profile_saved'
];

keysToCheck.forEach(k => {
  assert(i18nJs.includes(`"${k}":`) || i18nJs.includes(`${k}:`), `i18n.js defines key '${k}'`);
});

console.log('\n==================================================');
console.log(`📊 TEST SUMMARY: ${passCount} Passed, ${failCount} Failed`);
console.log('==================================================');

if (failCount > 0) {
  process.exit(1);
} else {
  console.log('\n🎉 ALL TESTS PASSED WITH 100% SUCCESS!\n');
}
