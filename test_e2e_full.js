const http = require('http');
const fs = require('fs');
const path = require('path');

async function testRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            body: data,
            json: data.startsWith('{') || data.startsWith('[') ? JSON.parse(data) : null
          });
        } catch (e) {
          resolve({ statusCode: res.statusCode, headers: res.headers, body: data, json: null });
        }
      });
    });
    req.on('error', reject);
    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runE2E() {
  console.log('==============================================');
  console.log('  THAMILI AI HUB - COMPREHENSIVE E2E TEST     ');
  console.log('==============================================\n');

  let passed = 0;
  let failed = 0;

  function assert(name, condition, extra = '') {
    if (condition) {
      console.log(`  ✓ [PASS] ${name} ${extra}`);
      passed++;
    } else {
      console.error(`  ✗ [FAIL] ${name} ${extra}`);
      failed++;
    }
  }

  // 1. Static Assets Test
  console.log('1. Static Asset Delivery:');
  const pages = ['/', '/ai-tools.html', '/css/pages.css', '/js/i18n.js', '/js/app.js'];
  for (const p of pages) {
    const res = await testRequest({ host: 'localhost', port: 8080, path: p, method: 'GET' });
    assert(`Static file ${p}`, res.statusCode === 200, `(${res.body.length} bytes)`);
  }

  // 2. Chat API Tests (Multi-turn & Languages)
  console.log('\n2. AI Chat Multi-Turn & Languages:');
  const chatTamil = await testRequest({
    host: 'localhost', port: 8080, path: '/api/chat', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    message: 'வணக்கம், தமிழி AI எப்படி எனக்கு உதவும்?',
    lang: 'ta',
    history: []
  });
  assert('AI Chat (Tamil script)', chatTamil.statusCode === 200 && chatTamil.json.success === true && chatTamil.json.response && chatTamil.json.response.length > 20);

  const chatTanglish = await testRequest({
    host: 'localhost', port: 8080, path: '/api/chat', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    message: 'vanakkam enakku oru puthiya startup idea sollu',
    lang: 'ta',
    history: [{ role: 'user', content: 'Hi' }, { role: 'assistant', content: 'Vanakkam! Sollunga.' }]
  });
  assert('AI Chat (Tanglish)', chatTanglish.statusCode === 200 && chatTanglish.json.success === true && chatTanglish.json.response.length > 20);

  const chatEn = await testRequest({
    host: 'localhost', port: 8080, path: '/api/chat', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    message: 'What are the main features of Thamili AI Hub?',
    lang: 'en',
    history: []
  });
  assert('AI Chat (English)', chatEn.statusCode === 200 && chatEn.json.success === true && chatEn.json.response.length > 20);

  // 3. Full-Stack Code Generator API
  console.log('\n3. AI Code Generator (Full Stack):');
  const codeGen = await testRequest({
    host: 'localhost', port: 8080, path: '/api/code/generate', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    prompt: 'Build a modern Task Management SaaS with real-time kanban board',
    lang: 'ta',
    mode: 'fullstack'
  });
  assert('Code Generator Response Status', codeGen.statusCode === 200 && codeGen.json.success === true);
  assert('Code Generator Files exist', Array.isArray(codeGen.json.data.files) && codeGen.json.data.files.length >= 3);
  if (codeGen.json.data.files && codeGen.json.data.files[0]) {
    assert(`Code File 1 (${codeGen.json.data.files[0].path})`, codeGen.json.data.files[0].content.length > 100);
  }

  // 4. Image Generation & Editing
  console.log('\n4. AI Image Generation & Editing:');
  const imgGen = await testRequest({
    host: 'localhost', port: 8080, path: '/api/image/generate', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    prompt: 'A futuristic cybernetic tiger in a neon Chennai city street',
    style: 'Cyberpunk',
    ratio: '16:9',
    lang: 'ta'
  });
  assert('Image Generation Status', imgGen.statusCode === 200 && imgGen.json.success === true);
  assert('Image Generation URL format', imgGen.json.data && !!imgGen.json.data.imageUrl);

  const imgEdit = await testRequest({
    host: 'localhost', port: 8080, path: '/api/image/edit', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    image: imgGen.json.data.imageUrl,
    instruction: 'Remove background and apply studio soft lighting',
    lang: 'ta'
  });
  assert('Image Edit Status', imgEdit.statusCode === 200 && imgEdit.json.success === true);
  assert('Image Edit Result URL', imgEdit.json.data && !!imgEdit.json.data.editedUrl);

  // 5. Video Generation & Status Polling
  console.log('\n5. AI Video Generation & Status:');
  const vidGen = await testRequest({
    host: 'localhost', port: 8080, path: '/api/video/generate', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    prompt: 'Cinematic drone shot soaring over Meenakshi Amman Temple at golden hour sunset',
    duration: '5s',
    style: 'Cinematic',
    mode: 'text-to-video',
    ratio: '16:9'
  });
  assert('Video Generation Trigger', vidGen.statusCode === 200 && vidGen.json.success === true && !!vidGen.json.data.id);

  const vidStatus = await testRequest({
    host: 'localhost', port: 8080, path: `/api/video/status?id=${vidGen.json.data.id}`, method: 'GET'
  });
  assert('Video Status Poll', vidStatus.statusCode === 200 && vidStatus.json.success === true && (vidStatus.json.data.status === 'ready' || vidStatus.json.data.status === 'processing' || vidStatus.json.data.status === 'rendering' || vidStatus.json.data.status === 'completed'));

  // 6. Audio TTS Synthesizer
  console.log('\n6. AI Audio Text-to-Speech:');
  const ttsTamil = await testRequest({
    host: 'localhost', port: 8080, path: '/api/audio/tts', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    text: 'தமிழி ஏஐ ஹப் உங்கள் வணிகத்தை அடுத்த கட்டத்திற்கு கொண்டு செல்கிறது.',
    voice: 'ta-female',
    lang: 'ta'
  });
  assert('Audio TTS Tamil', ttsTamil.statusCode === 200 && ttsTamil.json.success === true && ttsTamil.json.data && !!ttsTamil.json.data.audioUrl);

  const ttsEnglish = await testRequest({
    host: 'localhost', port: 8080, path: '/api/audio/tts', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    text: 'Welcome to Thamili AI Hub, the next generation AI platform for creators and developers.',
    voice: 'en-male',
    lang: 'en'
  });
  assert('Audio TTS English', ttsEnglish.statusCode === 200 && ttsEnglish.json.success === true && ttsEnglish.json.data && !!ttsEnglish.json.data.audioUrl);

  // 7. Content Generator & Transformer
  console.log('\n7. AI Content Generator:');
  const formats = ['blog', 'social', 'youtube', 'email', 'seo', 'product'];
  for (const fmt of formats) {
    const contentRes = await testRequest({
      host: 'localhost', port: 8080, path: '/api/content/generate', method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      prompt: 'Artificial Intelligence tools for modern digital marketing',
      category: fmt,
      tone: 'professional',
      action: 'generate',
      lang: 'ta'
    });
    assert(`Content Format (${fmt})`, contentRes.statusCode === 200 && contentRes.json.success === true && contentRes.json.data.content.length > 50);
  }

  // Content Actions (summarize, expand, translate)
  const contentAction = await testRequest({
    host: 'localhost', port: 8080, path: '/api/content/generate', method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }, {
    prompt: 'Artificial Intelligence tools for modern digital marketing',
    category: 'blog',
    tone: 'persuasive',
    action: 'summarize',
    lang: 'ta'
  });
  assert('Content Action (Summarize)', contentAction.statusCode === 200 && contentAction.json.success === true);

  console.log('\n==============================================');
  console.log(`  E2E TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('==============================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runE2E().catch(err => {
  console.error('Test run error:', err);
  process.exit(1);
});
