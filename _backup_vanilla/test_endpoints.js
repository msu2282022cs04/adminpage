const http = require('http');

async function testEndpoint(name, path, method = 'GET', body = null) {
  return new Promise((resolve) => {
    const postData = body ? JSON.stringify(body) : '';
    const req = http.request({
      hostname: 'localhost',
      port: 8080,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          console.log(`✓ [${res.statusCode}] ${name}:`, json.success ? 'SUCCESS' : json.status || 'OK');
          resolve(true);
        } catch (e) {
          console.error(`❌ ${name} returned invalid JSON:`, data.slice(0, 100));
          resolve(false);
        }
      });
    });

    req.on('error', (err) => {
      console.error(`❌ ${name} failed:`, err.message);
      resolve(false);
    });

    if (postData) req.write(postData);
    req.end();
  });
}

async function run() {
  console.log('Testing THAMILI AI Backend Endpoints...\n');
  await testEndpoint('GET /api/status', '/api/status');
  await testEndpoint('POST /api/chat (Tamil)', '/api/chat', 'POST', { message: 'வணக்கம்', lang: 'ta' });
  await testEndpoint('POST /api/chat (English)', '/api/chat', 'POST', { message: 'Hello AI', lang: 'en' });
  await testEndpoint('POST /api/code/generate', '/api/code/generate', 'POST', { prompt: 'E-commerce API', mode: 'backend', lang: 'en' });
  await testEndpoint('POST /api/image/generate', '/api/image/generate', 'POST', { prompt: 'Futuristic Tamil City', style: 'Cinematic', lang: 'ta' });
  await testEndpoint('POST /api/image/edit', '/api/image/edit', 'POST', { image: 'test.png', instruction: 'Remove background', lang: 'en' });
  await testEndpoint('POST /api/video/generate', '/api/video/generate', 'POST', { prompt: 'Tamil Robot Walking', style: 'Cinematic', lang: 'ta' });
  await testEndpoint('POST /api/audio/tts', '/api/audio/tts', 'POST', { text: 'தமிழி AI-க்கு நல்வரவு', lang: 'ta', voice: 'ta-female' });
  await testEndpoint('POST /api/content/generate', '/api/content/generate', 'POST', { prompt: 'Artificial Intelligence Basics', category: 'blog', tone: 'professional', lang: 'ta' });
  console.log('\nAll API endpoints tested!');
}

run();
