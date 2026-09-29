const fs = require('fs');
const path = require('path');

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

let allPassed = true;

htmlFiles.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
  console.log(`Checking ${file}...`);

  // 1. Check sidebar brand text
  if (!content.includes('<span class="sidebar-brand-text">தமிழி</span>')) {
    console.error(`  ❌ Missing '<span class="sidebar-brand-text">தமிழி</span>' in ${file}`);
    allPassed = false;
  }
  if (content.includes('thamili-logo.png')) {
    console.error(`  ❌ Old logo 'thamili-logo.png' found in ${file}`);
    allPassed = false;
  }

  // 2. Check edit form fields
  const requiredEditFields = [
    'editAvatarPreview',
    'editAvatarFile',
    'editFullName',
    'editUsername',
    'editEmail',
    'editPhone',
    'editDob',
    'editGender',
    'editAdminId',
    'editRole',
    'editBio',
    'editCreated',
    'editLastLogin'
  ];

  requiredEditFields.forEach(field => {
    if (!content.includes(`id="${field}"`)) {
      console.error(`  ❌ Missing edit field id="${field}" in ${file}`);
      allPassed = false;
    }
  });

  // 3. Check profile display fields
  const requiredProfileFields = [
    'profileAdminId',
    'profileRole',
    'profileLastLogin',
    'profileUsernameVal',
    'profileDisplayEmail',
    'profilePhoneVal',
    'profileDobVal',
    'profileGenderVal',
    'profileBioVal',
    'profileCreatedVal',
    'profileStatusVal'
  ];

  requiredProfileFields.forEach(field => {
    if (!content.includes(`id="${field}"`)) {
      console.error(`  ❌ Missing profile field id="${field}" in ${file}`);
      allPassed = false;
    }
  });
});

if (allPassed) {
  console.log('\n🎉 ALL 9 HTML files have 100% verified Logo and Profile/Edit Profile markup and IDs!');
} else {
  console.error('\n❌ Verification errors found.');
  process.exit(1);
}
