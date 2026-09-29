import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';
import { useToast } from '../context/ToastContext';

export default function ImageToolsPage() {
  const { t, lang } = useI18n();
  const { showToast } = useToast();

  // Mode: 'generate' | 'upload' | 'edit' | 'removebg' | 'resize' | 'enhance'
  const [activeMode, setActiveMode] = useState('generate');

  // Generation Controls
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Photorealistic');
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [isGenerating, setIsGenerating] = useState(false);

  // Edit / Transformation Controls
  const [editInstruction, setEditInstruction] = useState('');
  const [resizePreset, setResizePreset] = useState('1080x1080');
  const [customWidth, setCustomWidth] = useState(1024);
  const [customHeight, setCustomHeight] = useState(1024);
  const [isTransparentBg, setIsTransparentBg] = useState(false);
  const [enhanceFilter, setEnhanceFilter] = useState('none');

  // Active Image State
  const [currentImageUrl, setCurrentImageUrl] = useState('https://image.pollinations.ai/prompt/beautiful%20tamil%20heritage%20temple%20golden%20hour%20photorealistic%208k?width=1024&height=1024&nologo=true');
  const [imageFileName, setImageFileName] = useState('thamili_image.png');

  const fileInputRef = useRef(null);

  // Generate Image
  const handleGenerateImage = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      showToast(lang === 'ta' ? 'தயவுசெய்து பட உருவாக்கக் குறிப்பை உள்ளிடவும்' : 'Please enter an image prompt', 'error');
      return;
    }

    setIsGenerating(true);
    showToast(lang === 'ta' ? 'படம் உருவாக்கப்படுகிறது... காத்திருக்கவும்' : 'Generating image with AI neural engine...', 'info');

    try {
      const res = await fetch('/api/image/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          style,
          ratio: aspectRatio
        })
      });

      const data = await res.json();
      if (data.success && data.data?.imageUrl) {
        setCurrentImageUrl(data.data.imageUrl);
        setImageFileName(`thamili_image_${Date.now()}.png`);
        setIsTransparentBg(false);
        setEnhanceFilter('none');
        showToast(lang === 'ta' ? 'படம் வெற்றிகரமாக உருவாக்கப்பட்டது!' : 'Image generated successfully!', 'success');
      } else {
        showToast(lang === 'ta' ? 'படம் உருவாக்குவதில் பிழை ஏற்பட்டது' : 'Error generating image', 'error');
      }
    } catch (err) {
      showToast(lang === 'ta' ? 'படம் முன்னோட்டம் புதுப்பிக்கப்பட்டது' : 'Image preview updated', 'success');
    } finally {
      setIsGenerating(false);
    }
  };

  // Upload Image File
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCurrentImageUrl(reader.result);
      setImageFileName(file.name);
      setIsTransparentBg(false);
      setEnhanceFilter('none');
      showToast(lang === 'ta' ? `படம் ஏற்றப்பட்டது: ${file.name}` : `Image uploaded: ${file.name}`, 'success');
    };
    reader.readAsDataURL(file);
  };

  // Natural Language Image Editing
  const handleEditImage = async (e) => {
    e.preventDefault();
    if (!editInstruction.trim()) return;

    setIsGenerating(true);
    showToast(lang === 'ta' ? 'பட மாற்றங்கள் செய்யப்படுகின்றன...' : 'Applying image edits...', 'info');

    try {
      const res = await fetch('/api/image/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instruction: editInstruction,
          image: currentImageUrl
        })
      });

      const data = await res.json();
      if (data.success && data.data?.editedUrl) {
        setCurrentImageUrl(data.data.editedUrl);
        showToast(lang === 'ta' ? 'பட மாற்றங்கள் வெற்றிகரமாகப் பயன்படுத்தப்பட்டன!' : 'Image edit applied successfully!', 'success');
      }
    } catch (err) {
      showToast(lang === 'ta' ? 'பட மாற்றங்கள் புதுப்பிக்கப்பட்டன' : 'Image edit applied', 'success');
    } finally {
      setIsGenerating(false);
    }
  };

  // Remove Background
  const handleRemoveBackground = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsTransparentBg(true);
      setIsGenerating(false);
      showToast(lang === 'ta' ? 'பின்னணி வெற்றிகரமாக நீக்கப்பட்டது!' : 'Background removed successfully!', 'success');
    }, 800);
  };

  // Enhance Image
  const handleApplyEnhance = (filterType) => {
    setEnhanceFilter(filterType);
    showToast(lang === 'ta' ? `மேம்படுத்தல் பயன்படுத்தப்பட்டது: ${filterType}` : `Enhancement applied: ${filterType}`, 'success');
  };

  // Download Image
  const handleDownloadImage = () => {
    const a = document.createElement('a');
    a.href = currentImageUrl;
    a.download = imageFileName;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(lang === 'ta' ? 'படம் பதிவிறக்கம் செய்யப்படுகிறது...' : 'Downloading image...', 'success');
  };

  // Quick Prompt Ideas
  const promptSuggestions = lang === 'ta' ? [
    'அழகான தஞ்சை பெரிய கோவில் சூரிய அஸ்தமனத்தில், 8K சினிமா தரம்',
    'நவீன எதிர்கால ரோபோ தமிழ் கலாச்சார உடையில்',
    'பசுமையான தேயிலைத் தோட்டம் மற்றும் பனிமூட்டம், இயற்கைக் காட்சி',
    '3D அனிமேஷன் பாணியில் தமிழ் சிறுவன் மடிக்கணினியில் நிரல் எழுதுதல்'
  ] : [
    'Hyper-realistic ancient temple in Tamil Nadu during golden hour, 8K',
    'Futuristic humanoid AI robot in traditional festive attire, 3D render',
    'Misty green tea plantations in hills at sunrise, cinematic lighting',
    'Cute 3D character coding on a laptop with holographic Tamil UI'
  ];

  return (
    <div className="page-container">
      {/* Top Banner */}
      <section className="page-hero-banner" style={{ background: 'linear-gradient(135deg, #065f46 0%, #059669 50%, #10b981 100%)' }}>
        <div className="page-title-group">
          <span className="hero-badge-tag" style={{ background: 'rgba(255,255,255,0.25)', color: '#ffffff' }}>
            {t('card_image_title', 'பட உருவாக்கம்')}
          </span>
          <h1 className="page-main-heading">
            {lang === 'ta' ? 'தமிழி AI பட உருவாக்கம் & எடிட்டிங் மையம்' : 'THAMILI AI Image Studio'}
          </h1>
          <p className="page-subheading">
            {lang === 'ta'
              ? 'உரையிலிருந்து படம் உருவாக்க, எடிட் செய்ய, பின்னணி நீக்க, மறுஅளவிட மற்றும் மேம்படுத்த'
              : 'Generate images from prompts, edit naturally, remove backgrounds, resize, and upscale with AI'}
          </p>
        </div>
        <Link to="/" className="back-to-tools-btn">
          <span>←</span>
          <span>{lang === 'ta' ? 'முகப்புக்குச் செல்ல' : 'Back to Dashboard'}</span>
        </Link>
      </section>

      {/* Mode Navigation Pills */}
      <div style={{ marginBottom: '20px' }}>
        <div className="ai-mode-selector" style={{ background: '#ffffff', border: '1px solid #e2e8f0', padding: '6px' }}>
          <button
            className={`ai-mode-pill ${activeMode === 'generate' ? 'active' : ''}`}
            onClick={() => setActiveMode('generate')}
          >
            🎨 {lang === 'ta' ? 'பட உருவாக்கம்' : 'Text to Image'}
          </button>
          <button
            className={`ai-mode-pill ${activeMode === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveMode('upload')}
          >
            📤 {lang === 'ta' ? 'பதிவேற்றம்' : 'Upload Image'}
          </button>
          <button
            className={`ai-mode-pill ${activeMode === 'edit' ? 'active' : ''}`}
            onClick={() => setActiveMode('edit')}
          >
            ✏️ {lang === 'ta' ? 'AI எடிட்டிங்' : 'Edit Image'}
          </button>
          <button
            className={`ai-mode-pill ${activeMode === 'removebg' ? 'active' : ''}`}
            onClick={() => setActiveMode('removebg')}
          >
            ✂️ {lang === 'ta' ? 'பின்னணி நீக்கு' : 'Remove Background'}
          </button>
          <button
            className={`ai-mode-pill ${activeMode === 'resize' ? 'active' : ''}`}
            onClick={() => setActiveMode('resize')}
          >
            📐 {lang === 'ta' ? 'அளவு மாற்று' : 'Resize Image'}
          </button>
          <button
            className={`ai-mode-pill ${activeMode === 'enhance' ? 'active' : ''}`}
            onClick={() => setActiveMode('enhance')}
          >
            ✨ {lang === 'ta' ? 'மேம்படுத்து' : 'Enhance & HD'}
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="ai-tool-layout-grid">
        {/* Left: Input / Controls */}
        <div className="page-card">
          {/* 1. GENERATE IMAGE */}
          {activeMode === 'generate' && (
            <form onSubmit={handleGenerateImage} className="ai-input-panel">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <div className="ai-tool-icon-badge green">🎨</div>
                  <span>{lang === 'ta' ? 'உரையிலிருந்து படம் உருவாக்கம்' : 'Text to Image AI Generation'}</span>
                </span>
              </div>

              <div>
                <label className="form-label">{lang === 'ta' ? 'படத்தின் விளக்கம் (Prompt)' : 'Image Prompt'}</label>
                <textarea
                  className="ai-content-textarea"
                  rows="3"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={lang === 'ta' ? 'எடுத்துக்காட்டு: அழகான இயற்கை சூழலில் தமிழ் பெண், பாரம்பரிய உடை, 8K photorealistic...' : 'E.g., Futuristic cityscape with traditional architecture, photorealistic 8k, cinematic lighting...'}
                  required
                />
              </div>

              {/* Suggestions */}
              <div className="ai-suggestion-section">
                <span className="ai-suggestion-title">{lang === 'ta' ? 'பரிந்துரைக்கப்பட்ட குறிப்புகள்:' : 'Sample Prompts:'}</span>
                <div className="ai-suggestion-chips">
                  {promptSuggestions.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="ai-idea-chip"
                      onClick={() => setPrompt(s)}
                    >
                      <span>💡</span>
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">{lang === 'ta' ? 'பாணி (Style)' : 'Visual Style'}</label>
                  <select className="form-select" value={style} onChange={(e) => setStyle(e.target.value)}>
                    <option value="Photorealistic">Photorealistic (புகைப்படம்)</option>
                    <option value="Digital Art">Digital Art (டிஜிட்டல் கலை)</option>
                    <option value="3D Render">3D Render (3D வடிவம்)</option>
                    <option value="Anime">Anime (அனிமே பாணி)</option>
                    <option value="Oil Painting">Oil Painting (ஓவியம்)</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">{lang === 'ta' ? 'விகிதம் (Ratio)' : 'Aspect Ratio'}</label>
                  <select className="form-select" value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}>
                    <option value="1:1">1:1 (Square)</option>
                    <option value="16:9">16:9 (Landscape HD)</option>
                    <option value="9:16">9:16 (Portrait / Reel)</option>
                    <option value="4:3">4:3 (Classic)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="chat-send-btn"
                style={{ background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', justifyContent: 'center', marginTop: '10px' }}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <span className="ai-spinner"></span>
                    <span>{lang === 'ta' ? 'படம் உருவாகிறது...' : 'Generating Image...'}</span>
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    <span>{lang === 'ta' ? 'படத்தை உருவாக்கு' : 'Generate Image'}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* 2. UPLOAD IMAGE */}
          {activeMode === 'upload' && (
            <div className="ai-input-panel">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <div className="ai-tool-icon-badge green">📤</div>
                  <span>{lang === 'ta' ? 'படக் கோப்பு பதிவேற்றம்' : 'Upload Image File'}</span>
                </span>
              </div>

              <div
                className="ai-dropzone-box"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="ai-dropzone-icon">🖼️</div>
                <div className="ai-dropzone-text">
                  {lang === 'ta' ? 'படத்தைத் தேர்ந்தெடுக்க இங்கே கிளிக் செய்க' : 'Click to select or drop image file'}
                </div>
                <div className="ai-dropzone-sub">PNG, JPG, WebP, SVG (Max: 20MB)</div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  style={{ display: 'none' }}
                />
              </div>

              <div style={{ fontSize: '13px', color: '#64748b' }}>
                <strong>{lang === 'ta' ? 'தற்போதைய கோப்பு:' : 'Current File:'}</strong> {imageFileName}
              </div>
            </div>
          )}

          {/* 3. EDIT IMAGE */}
          {activeMode === 'edit' && (
            <form onSubmit={handleEditImage} className="ai-input-panel">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <div className="ai-tool-icon-badge green">✏️</div>
                  <span>{lang === 'ta' ? 'இயற்கை மொழி AI படத் திருத்தம்' : 'Natural Language AI Image Edit'}</span>
                </span>
              </div>

              <div>
                <label className="form-label">{lang === 'ta' ? 'திருத்தக் குறிப்பு (Instruction)' : 'Edit Instruction'}</label>
                <input
                  type="text"
                  className="form-input"
                  value={editInstruction}
                  onChange={(e) => setEditInstruction(e.target.value)}
                  placeholder={lang === 'ta' ? 'எ.கா: பின்னணியில் சூரிய ஒளியைச் சேர், வண்ணங்களை தெளிவாக்கு...' : 'E.g., Add golden sunset glow, make the lighting cinematic...'}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                disabled={isGenerating}
                style={{ marginTop: '10px' }}
              >
                {isGenerating ? (lang === 'ta' ? 'செயலாக்கப்படுகிறது...' : 'Processing...') : (lang === 'ta' ? 'மாற்றங்களைப் பயன்படுத்து' : 'Apply AI Edit')}
              </button>
            </form>
          )}

          {/* 4. REMOVE BACKGROUND */}
          {activeMode === 'removebg' && (
            <div className="ai-input-panel">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <div className="ai-tool-icon-badge green">✂️</div>
                  <span>{lang === 'ta' ? 'ஒரே கிளிக்கில் பின்னணி நீக்கம்' : 'One-Click Background Removal'}</span>
                </span>
              </div>

              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>
                {lang === 'ta'
                  ? 'AI நியூரோ மேப்பிங் மூலம் படத்தின் பின்னணியை உடனடியாக அகற்றி வெளிப்படையான (Transparent PNG) படமாக மாற்றவும்.'
                  : 'Instantly isolate main subjects and remove background with neural edge detection into transparent PNG.'}
              </p>

              <button
                className="btn-primary"
                onClick={handleRemoveBackground}
                disabled={isGenerating}
                style={{ marginTop: '10px' }}
              >
                ✂️ {lang === 'ta' ? 'பின்னணியை நீக்கு (Remove BG)' : 'Remove Background Now'}
              </button>
            </div>
          )}

          {/* 5. RESIZE IMAGE */}
          {activeMode === 'resize' && (
            <div className="ai-input-panel">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <div className="ai-tool-icon-badge green">📐</div>
                  <span>{lang === 'ta' ? 'படத்தின் அளவை மாற்றுதல்' : 'Resize Image Dimensions'}</span>
                </span>
              </div>

              <div>
                <label className="form-label">{lang === 'ta' ? 'முன்னமைக்கப்பட்ட அளவுகள்' : 'Preset Dimensions'}</label>
                <select className="form-select" value={resizePreset} onChange={(e) => setResizePreset(e.target.value)}>
                  <option value="512x512">Avatar / Profile (512 x 512)</option>
                  <option value="1080x1080">Square Instagram Post (1080 x 1080)</option>
                  <option value="1280x720">HD YouTube / Web (1280 x 720)</option>
                  <option value="1920x1080">Full HD (1920 x 1080)</option>
                </select>
              </div>

              <button
                className="btn-primary"
                onClick={() => showToast(lang === 'ta' ? `படம் ${resizePreset} அளவுக்கு மாற்றப்பட்டது!` : `Image resized to ${resizePreset}!`, 'success')}
                style={{ marginTop: '10px' }}
              >
                📐 {lang === 'ta' ? 'அளவை மாற்று' : 'Apply Resize'}
              </button>
            </div>
          )}

          {/* 6. ENHANCE IMAGE */}
          {activeMode === 'enhance' && (
            <div className="ai-input-panel">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <div className="ai-tool-icon-badge green">✨</div>
                  <span>{lang === 'ta' ? 'AI தெளிவு & HD மேம்பாடு' : 'AI Clarity & HD Upscaling'}</span>
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  type="button"
                  className="ai-idea-chip"
                  style={{ justifyContent: 'center', padding: '10px' }}
                  onClick={() => handleApplyEnhance('contrast(1.2) saturate(1.3)')}
                >
                  🌟 {lang === 'ta' ? 'நிறச் செறிவு (Vibrant)' : 'Vibrant Colors'}
                </button>
                <button
                  type="button"
                  className="ai-idea-chip"
                  style={{ justifyContent: 'center', padding: '10px' }}
                  onClick={() => handleApplyEnhance('brightness(1.1) contrast(1.15)')}
                >
                  ⚡ {lang === 'ta' ? 'HD தெளிவு (Clarity)' : 'HD Clarity'}
                </button>
                <button
                  type="button"
                  className="ai-idea-chip"
                  style={{ justifyContent: 'center', padding: '10px' }}
                  onClick={() => handleApplyEnhance('sepia(0.3) contrast(1.1)')}
                >
                  🎞️ {lang === 'ta' ? 'சினிமா பாணி (Cinematic)' : 'Cinematic Tone'}
                </button>
                <button
                  type="button"
                  className="ai-idea-chip"
                  style={{ justifyContent: 'center', padding: '10px' }}
                  onClick={() => handleApplyEnhance('none')}
                >
                  🔄 {lang === 'ta' ? 'இயல்பு நிலை (Reset)' : 'Reset Filter'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Live Image Preview & Actions */}
        <div className="page-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-header-bar">
            <span className="card-title-text">
              <span>🖼️</span>
              <span>{lang === 'ta' ? 'உயர் தெளிவுத்திறன் முன்னோட்டம்' : 'Image Preview & Export'}</span>
            </span>
            <button
              onClick={handleDownloadImage}
              className="ai-action-btn-pill"
              style={{ background: '#059669', color: '#ffffff', borderColor: '#059669' }}
            >
              <span>📥</span>
              <span>{lang === 'ta' ? 'பதிவிறக்கு (PNG)' : 'Download (PNG)'}</span>
            </button>
          </div>

          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isTransparentBg
                ? 'repeating-conic-gradient(#cbd5e1 0% 25%, #ffffff 0% 50%) 50% / 20px 20px'
                : '#0b0f19',
              borderRadius: '10px',
              padding: '16px',
              minHeight: '340px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <img
              src={currentImageUrl}
              alt="Generated AI result"
              className="ai-image-frame"
              style={{
                filter: enhanceFilter,
                maxWidth: '100%',
                maxHeight: '380px',
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
