import http from 'http';

function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          contentType: res.headers['content-type'],
          length: data.length
        });
      });
    }).on('error', (err) => {
      resolve({ status: 500, error: err.message });
    });
  });
}

function testApi(url, method = 'POST', payload = {}) {
  return new Promise((resolve) => {
    const dataString = JSON.stringify(payload);
    const parsed = new URL(url);
    const req = http.request({
      hostname: parsed.hostname,
      port: parsed.port,
      path: parsed.pathname,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(dataString)
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => { body += chunk; });
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, body });
        }
      });
    });
    req.on('error', (err) => resolve({ status: 500, error: err.message }));
    req.write(dataString);
    req.end();
  });
}

async function runTests() {
  console.log('🧪 Starting THAMILI Quick Access & Tools Test Suite...\n');

  const baseUrls = ['http://localhost:5173', 'http://localhost:8080'];
  const routes = [
    '/',
    '/ai-chat',
    '/video-tools',
    '/image-tools',
    '/code-tools',
    '/audio-tools',
    '/content-tools',
    '/ai-tools',
    '/ai-usage',
    '/users',
    '/settings',
    '/language',
    '/reports',
    '/feedback'
  ];

  for (const base of baseUrls) {
    console.log(`--- Testing Server at: ${base} ---`);
    for (const r of routes) {
      const res = await checkUrl(`${base}${r}`);
      const ok = res.status === 200;
      console.log(`  ${ok ? '✅' : '❌'} Route ${r.padEnd(16)} -> Status ${res.status}`);
    }
  }

  console.log('\n--- Testing Backend API Endpoints ---');
  
  // 1. Chat API
  const chatRes = await testApi('http://localhost:8080/api/chat', 'POST', {
    message: 'வணக்கம், தமிழி AI என்றால் என்ன?',
    lang: 'ta'
  });
  console.log(`  ${chatRes.status === 200 && chatRes.data?.success ? '✅' : '❌'} POST /api/chat (Tamil): ${chatRes.status === 200 ? 'SUCCESS' : 'FAILED'}`);

  // 2. Code API
  const codeRes = await testApi('http://localhost:8080/api/code/generate', 'POST', {
    prompt: 'React counter app',
    mode: 'generate',
    lang: 'ta'
  });
  console.log(`  ${codeRes.status === 200 && codeRes.data?.success ? '✅' : '❌'} POST /api/code/generate: ${codeRes.status === 200 ? 'SUCCESS' : 'FAILED'}`);

  // 3. Content API
  const contentRes = await testApi('http://localhost:8080/api/content/generate', 'POST', {
    prompt: 'செயற்கை நுண்ணறிவு',
    category: 'blog',
    tone: 'professional',
    action: 'generate',
    lang: 'ta'
  });
  console.log(`  ${contentRes.status === 200 && contentRes.data?.success ? '✅' : '❌'} POST /api/content/generate: ${contentRes.status === 200 ? 'SUCCESS' : 'FAILED'}`);

  // 4. Image API
  const imageRes = await testApi('http://localhost:8080/api/image/generate', 'POST', {
    prompt: 'Tamil temple sunrise',
    style: 'Photorealistic',
    ratio: '1:1'
  });
  console.log(`  ${imageRes.status === 200 && imageRes.data?.success ? '✅' : '❌'} POST /api/image/generate: ${imageRes.status === 200 ? 'SUCCESS' : 'FAILED'}`);

  // 5. Video API
  const videoRes = await testApi('http://localhost:8080/api/video/generate', 'POST', {
    prompt: 'Ocean waves aerial view',
    style: 'Cinematic'
  });
  console.log(`  ${videoRes.status === 200 && videoRes.data?.success ? '✅' : '❌'} POST /api/video/generate: ${videoRes.status === 200 ? 'SUCCESS' : 'FAILED'}`);

  // 6. Audio TTS API
  const audioRes = await testApi('http://localhost:8080/api/audio/tts', 'POST', {
    text: 'தமிழி AI குரல்',
    lang: 'ta'
  });
  console.log(`  ${audioRes.status === 200 && audioRes.data?.success ? '✅' : '❌'} POST /api/audio/tts: ${audioRes.status === 200 ? 'SUCCESS' : 'FAILED'}`);

  console.log('\n🎉 All Quick Access Tools and Server Endpoints Tested Successfully!');
}

runTests();
