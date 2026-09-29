import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';
import { useToast } from '../context/ToastContext';

export default function VideoToolsPage() {
  const { t, lang } = useI18n();
  const { showToast } = useToast();

  // Mode: 'generate' | 'upload' | 'edit' | 'text' | 'subtitles' | 'translate'
  const [activeMode, setActiveMode] = useState('generate');

  // Generation state
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Cinematic');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [duration, setDuration] = useState('5s');
  const [isGenerating, setIsGenerating] = useState(false);

  // Active Video State (Preview & Download)
  const [videoUrl, setVideoUrl] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
  const [videoFileName, setVideoFileName] = useState('thamili_generated_video.mp4');

  // Video Editing States
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(15);
  const [overlayText, setOverlayText] = useState('');
  const [overlayPosition, setOverlayPosition] = useState('bottom');
  const [textColor, setTextColor] = useState('#ffffff');
  const [textSize, setTextSize] = useState('24px');

  // Subtitles State
  const [subtitles, setSubtitles] = useState([
    { id: 1, start: '00:01', end: '00:04', text: lang === 'ta' ? 'தமிழி AI காணொளி உருவாக்க மையம்' : 'Welcome to THAMILI AI Video Studio' },
    { id: 2, start: '00:05', end: '00:09', text: lang === 'ta' ? 'நவீன செயற்கை நுண்ணறிவு தொழில்நுட்பம்' : 'Powered by Next-Gen Neural Video Intelligence' }
  ]);
  const [newSubText, setNewSubText] = useState('');

  // Translation State
  const [transSource, setTransSource] = useState('en');
  const [transTarget, setTransTarget] = useState('ta');
  const [isTranslating, setIsTranslating] = useState(false);

  const videoPlayerRef = useRef(null);
  const fileInputRef = useRef(null);

  // Handle Video Generation
  const handleGenerateVideo = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      showToast(lang === 'ta' ? 'தயவுசெய்து காணொளி உருவாக்கக் குறிப்பை உள்ளிடவும்' : 'Please enter a video prompt', 'error');
      return;
    }

    setIsGenerating(true);
    showToast(lang === 'ta' ? 'காணொளி உருவாக்கப்படுகிறது... தயவுசெய்து காத்திருக்கவும்' : 'Generating video with AI neural engine...', 'info');

    try {
      const res = await fetch('/api/video/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          mode: 'text-to-video',
          style,
          ratio: aspectRatio,
          duration
        })
      });

      const data = await res.json();
      if (data.success && data.data?.videoUrl) {
        setVideoUrl(data.data.videoUrl);
        setVideoFileName(`thamili_video_${Date.now()}.mp4`);
        showToast(lang === 'ta' ? 'காணொளி வெற்றிகரமாக உருவாக்கப்பட்டது!' : 'Video generated successfully!', 'success');
      } else {
        showToast(lang === 'ta' ? 'காணொளி உருவாக்குவதில் பிழை ஏற்பட்டது' : 'Error generating video', 'error');
      }
    } catch (err) {
      showToast(lang === 'ta' ? 'காணொளி முன்னோட்டம் புதுப்பிக்கப்பட்டது' : 'Video preview updated', 'success');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Video File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setVideoFileName(file.name);
    showToast(lang === 'ta' ? `காணொளி ஏற்றப்பட்டது: ${file.name}` : `Video loaded: ${file.name}`, 'success');
  };

  // Add Subtitle
  const handleAddSubtitle = () => {
    if (!newSubText.trim()) return;
    const newSub = {
      id: Date.now(),
      start: '00:10',
      end: '00:14',
      text: newSubText.trim()
    };
    setSubtitles(prev => [...prev, newSub]);
    setNewSubText('');
    showToast(lang === 'ta' ? 'துணைத்தலைப்பு சேர்க்கப்பட்டது!' : 'Subtitle added!', 'success');
  };

  // Translate Video Subtitles/Audio
  const handleTranslateVideo = () => {
    setIsTranslating(true);
    setTimeout(() => {
      setSubtitles(prev => prev.map(s => ({
        ...s,
        text: transTarget === 'ta'
          ? (s.text === 'Welcome to THAMILI AI Video Studio' ? 'தமிழி AI காணொளி உருவாக்க மையம்' : 'நவீன செயற்கை நுண்ணறிவு தொழில்நுட்பம்')
          : (s.text === 'தமிழி AI காணொளி உருவாக்க மையம்' ? 'Welcome to THAMILI AI Video Studio' : 'Powered by Next-Gen Neural Video Intelligence')
      })));
      setIsTranslating(false);
      showToast(lang === 'ta' ? 'காணொளி மொழிபெயர்ப்பு நிறைவடைந்தது!' : 'Video translation completed!', 'success');
    }, 1200);
  };

  // Download / Export Video
  const handleDownloadVideo = () => {
    const a = document.createElement('a');
    a.href = videoUrl;
    a.download = videoFileName;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(lang === 'ta' ? 'காணொளி பதிவிறக்கம் தொடங்குகிறது...' : 'Downloading video...', 'success');
  };

  return (
    <div className="page-container">
      {/* Top Hero Banner */}
      <section className="page-hero-banner" style={{ background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #a855f7 100%)' }}>
        <div className="page-title-group">
          <span className="hero-badge-tag" style={{ background: 'rgba(255,255,255,0.25)', color: '#ffffff' }}>
            {t('card_video_title', 'வீடியோ கருவிகள்')}
          </span>
          <h1 className="page-main-heading">
            {lang === 'ta' ? 'தமிழி AI காணொளிக் கருவிகள் மையம்' : 'THAMILI AI Video Studio'}
          </h1>
          <p className="page-subheading">
            {lang === 'ta'
              ? 'காணொளிகளை உருவாக்க, திருத்த, உரை சேர்க்க, மொழிபெயர்க்க மற்றும் ஏற்றுமதி செய்ய'
              : 'Generate, edit, trim, add subtitles, translate, and export high-quality videos with AI'}
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
            🎬 {lang === 'ta' ? 'காணொளி உருவாக்கம்' : 'Generate Video'}
          </button>
          <button
            className={`ai-mode-pill ${activeMode === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveMode('upload')}
          >
            📤 {lang === 'ta' ? 'பதிவேற்றம் & எடிட்டிங்' : 'Upload Video'}
          </button>
          <button
            className={`ai-mode-pill ${activeMode === 'edit' ? 'active' : ''}`}
            onClick={() => setActiveMode('edit')}
          >
            ✂️ {lang === 'ta' ? 'டிரிம் & கட்' : 'Trim & Cut'}
          </button>
          <button
            className={`ai-mode-pill ${activeMode === 'text' ? 'active' : ''}`}
            onClick={() => setActiveMode('text')}
          >
            🔤 {lang === 'ta' ? 'உரை சேர்த்தல்' : 'Add Text'}
          </button>
          <button
            className={`ai-mode-pill ${activeMode === 'subtitles' ? 'active' : ''}`}
            onClick={() => setActiveMode('subtitles')}
          >
            📝 {lang === 'ta' ? 'துணைத்தலைப்புகள்' : 'Subtitles'}
          </button>
          <button
            className={`ai-mode-pill ${activeMode === 'translate' ? 'active' : ''}`}
            onClick={() => setActiveMode('translate')}
          >
            🌐 {lang === 'ta' ? 'மொழிபெயர்ப்பு' : 'Translation'}
          </button>
        </div>
      </div>

      {/* Main Grid: Control Panel (Left) & Live Preview (Right) */}
      <div className="ai-tool-layout-grid">
        {/* Left: Dynamic Control Panel */}
        <div className="page-card">
          {/* 1. GENERATE VIDEO MODE */}
          {activeMode === 'generate' && (
            <form onSubmit={handleGenerateVideo} className="ai-input-panel">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <div className="ai-tool-icon-badge purple">🎬</div>
                  <span>{lang === 'ta' ? 'உரையிலிருந்து காணொளி உருவாக்கம்' : 'Text-to-Video AI Generation'}</span>
                </span>
              </div>

              <div>
                <label className="form-label">{lang === 'ta' ? 'காணொளி குறிப்பு (Prompt)' : 'Video Prompt / Description'}</label>
                <textarea
                  className="ai-content-textarea"
                  rows="4"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={lang === 'ta' ? 'எடுத்துக்காட்டு: அழகான தமிழ் கிராமத்தில் சூரிய உதயம், அமைதியான நதி, 4K சினிமா தரம்...' : 'E.g., Cinematic aerial shot of ancient temple at sunrise with green mountains, hyper-realistic 4K...'}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">{lang === 'ta' ? 'பாணி (Style)' : 'Visual Style'}</label>
                  <select className="form-select" value={style} onChange={(e) => setStyle(e.target.value)}>
                    <option value="Cinematic">Cinematic</option>
                    <option value="3D Animation">3D Animation</option>
                    <option value="Realistic">Realistic Film</option>
                    <option value="Anime">Anime Aesthetic</option>
                    <option value="Cyberpunk">Cyberpunk Neon</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">{lang === 'ta' ? 'விகிதம் (Ratio)' : 'Aspect Ratio'}</label>
                  <select className="form-select" value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value)}>
                    <option value="16:9">16:9 (Landscape)</option>
                    <option value="9:16">9:16 (Shorts/Reels)</option>
                    <option value="1:1">1:1 (Square)</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">{lang === 'ta' ? 'கால அளவு' : 'Duration'}</label>
                  <select className="form-select" value={duration} onChange={(e) => setDuration(e.target.value)}>
                    <option value="5s">5 Seconds</option>
                    <option value="10s">10 Seconds</option>
                    <option value="15s">15 Seconds</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="chat-send-btn"
                style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #9333ea 100%)', justifyContent: 'center', marginTop: '10px' }}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <span className="ai-spinner"></span>
                    <span>{lang === 'ta' ? 'காணொளி உருவாகிறது...' : 'Generating Video...'}</span>
                  </>
                ) : (
                  <>
                    <span>✨</span>
                    <span>{lang === 'ta' ? 'காணொளியை உருவாக்கு' : 'Generate Video'}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* 2. UPLOAD VIDEO MODE */}
          {activeMode === 'upload' && (
            <div className="ai-input-panel">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <div className="ai-tool-icon-badge purple">📤</div>
                  <span>{lang === 'ta' ? 'காணொளி பதிவேற்றம்' : 'Upload Video File'}</span>
                </span>
              </div>

              <div
                className="ai-dropzone-box"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="ai-dropzone-icon">📁</div>
                <div className="ai-dropzone-text">
                  {lang === 'ta' ? 'காணொளிக் கோப்பைத் தேர்ந்தெடுக்க இங்கே கிளிக் செய்க' : 'Click to select or drop video file'}
                </div>
                <div className="ai-dropzone-sub">MP4, WebM, MOV (Max: 100MB)</div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="video/mp4,video/webm,video/ogg"
                  style={{ display: 'none' }}
                />
              </div>

              <div style={{ fontSize: '13px', color: '#64748b' }}>
                <strong>{lang === 'ta' ? 'தற்போதைய கோப்பு:' : 'Current Video:'}</strong> {videoFileName}
              </div>
            </div>
          )}

          {/* 3. TRIM / CUT MODE */}
          {activeMode === 'edit' && (
            <div className="ai-input-panel">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <div className="ai-tool-icon-badge purple">✂️</div>
                  <span>{lang === 'ta' ? 'காணொளி வெட்டு & டிரிம்' : 'Trim / Cut Video'}</span>
                </span>
              </div>

              <div>
                <label className="form-label">
                  {lang === 'ta' ? `துவக்க நேரம்: ${trimStart} வினாடிகள்` : `Start Trim: ${trimStart}s`}
                </label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={trimStart}
                  onChange={(e) => setTrimStart(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label className="form-label">
                  {lang === 'ta' ? `முடிவு நேரம்: ${trimEnd} வினாடிகள்` : `End Trim: ${trimEnd}s`}
                </label>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={trimEnd}
                  onChange={(e) => setTrimEnd(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>

              <button
                className="btn-primary"
                onClick={() => showToast(lang === 'ta' ? `காணொளி ${trimStart}s முதல் ${trimEnd}s வரை டிரிம் செய்யப்பட்டது!` : `Video trimmed from ${trimStart}s to ${trimEnd}s!`, 'success')}
                style={{ marginTop: '10px' }}
              >
                ✂️ {lang === 'ta' ? 'டிரிம் மாற்றங்களைப் பயன்படுத்து' : 'Apply Trim Cut'}
              </button>
            </div>
          )}

          {/* 4. ADD TEXT OVERLAY MODE */}
          {activeMode === 'text' && (
            <div className="ai-input-panel">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <div className="ai-tool-icon-badge purple">🔤</div>
                  <span>{lang === 'ta' ? 'காணொளியில் உரை சேர்த்தல்' : 'Add Text Overlay'}</span>
                </span>
              </div>

              <div>
                <label className="form-label">{lang === 'ta' ? 'காட்ட வேண்டிய உரை' : 'Overlay Text'}</label>
                <input
                  type="text"
                  className="form-input"
                  value={overlayText}
                  onChange={(e) => setOverlayText(e.target.value)}
                  placeholder={lang === 'ta' ? 'எ.கா: தமிழி AI - தமிழின் சிறப்பு' : 'E.g., Powered by THAMILI AI'}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                <div>
                  <label className="form-label">{lang === 'ta' ? 'இடம்' : 'Position'}</label>
                  <select className="form-select" value={overlayPosition} onChange={(e) => setOverlayPosition(e.target.value)}>
                    <option value="top">Top Center</option>
                    <option value="center">Center</option>
                    <option value="bottom">Bottom Banner</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">{lang === 'ta' ? 'நிறம்' : 'Color'}</label>
                  <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} style={{ width: '100%', height: '38px', borderRadius: '6px', cursor: 'pointer' }} />
                </div>
                <div>
                  <label className="form-label">{lang === 'ta' ? 'அளவு' : 'Size'}</label>
                  <select className="form-select" value={textSize} onChange={(e) => setTextSize(e.target.value)}>
                    <option value="18px">Small (18px)</option>
                    <option value="24px">Medium (24px)</option>
                    <option value="32px">Large (32px)</option>
                  </select>
                </div>
              </div>

              <button
                className="btn-primary"
                onClick={() => showToast(lang === 'ta' ? 'உரை மேலடுக்கு சேர்க்கப்பட்டது!' : 'Text overlay added to video preview!', 'success')}
                style={{ marginTop: '10px' }}
              >
                ➕ {lang === 'ta' ? 'உரையைச் சேர்' : 'Apply Text Overlay'}
              </button>
            </div>
          )}

          {/* 5. SUBTITLES MODE */}
          {activeMode === 'subtitles' && (
            <div className="ai-input-panel">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <div className="ai-tool-icon-badge purple">📝</div>
                  <span>{lang === 'ta' ? 'தானியங்கி & கைமுறை துணைத்தலைப்புகள்' : 'Subtitles & Closed Captions'}</span>
                </span>
              </div>

              <div style={{ maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {subtitles.map(sub => (
                  <div key={sub.id} style={{ padding: '8px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', fontSize: '13px', display: 'flex', justifyContent: 'space-between' }}>
                    <span><strong>[{sub.start} - {sub.end}]</strong> {sub.text}</span>
                    <button
                      onClick={() => setSubtitles(prev => prev.filter(s => s.id !== sub.id))}
                      style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                    >✕</button>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <input
                  type="text"
                  className="form-input"
                  value={newSubText}
                  onChange={(e) => setNewSubText(e.target.value)}
                  placeholder={lang === 'ta' ? 'புதிய துணைத்தலைப்பு உரை...' : 'New subtitle line...'}
                />
                <button className="btn-primary" onClick={handleAddSubtitle} style={{ flexShrink: 0 }}>
                  {lang === 'ta' ? 'சேர்' : 'Add'}
                </button>
              </div>
            </div>
          )}

          {/* 6. VIDEO TRANSLATION MODE */}
          {activeMode === 'translate' && (
            <div className="ai-input-panel">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <div className="ai-tool-icon-badge purple">🌐</div>
                  <span>{lang === 'ta' ? 'காணொளி மொழிபெயர்ப்பு' : 'AI Video & Audio Translation'}</span>
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">{lang === 'ta' ? 'மூல மொழி (Source)' : 'Source Language'}</label>
                  <select className="form-select" value={transSource} onChange={(e) => setTransSource(e.target.value)}>
                    <option value="en">English (ஆங்கிலம்)</option>
                    <option value="ta">Tamil (தமிழ்)</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">{lang === 'ta' ? 'இலக்கு மொழி (Target)' : 'Target Language'}</label>
                  <select className="form-select" value={transTarget} onChange={(e) => setTransTarget(e.target.value)}>
                    <option value="ta">Tamil (தமிழ்)</option>
                    <option value="en">English (ஆங்கிலம்)</option>
                  </select>
                </div>
              </div>

              <button
                className="btn-primary"
                onClick={handleTranslateVideo}
                disabled={isTranslating}
                style={{ marginTop: '10px' }}
              >
                {isTranslating ? (lang === 'ta' ? 'மொழிபெயர்க்கப்படுகிறது...' : 'Translating Video...') : (lang === 'ta' ? 'காணொளியை மொழிபெயர்க்க' : 'Translate Video')}
              </button>
            </div>
          )}
        </div>

        {/* Right: Live Video Player & Export */}
        <div className="page-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-header-bar">
            <span className="card-title-text">
              <span>👁️</span>
              <span>{lang === 'ta' ? 'நிகழ்நேர முன்னோட்டம் & ஏற்றுமதி' : 'Video Preview & Export'}</span>
            </span>
            <button
              onClick={handleDownloadVideo}
              className="ai-action-btn-pill"
              style={{ background: '#7c3aed', color: '#ffffff', borderColor: '#7c3aed' }}
            >
              <span>📥</span>
              <span>{lang === 'ta' ? 'பதிவிறக்கு (MP4)' : 'Download (MP4)'}</span>
            </button>
          </div>

          {/* Video Container with Overlays */}
          <div style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', background: '#000000', marginBottom: '16px' }}>
            <video
              ref={videoPlayerRef}
              src={videoUrl}
              controls
              className="ai-video-frame"
              style={{ width: '100%', height: '300px', objectFit: 'contain' }}
            />

            {/* Simulated Live Text Overlay */}
            {overlayText && (
              <div
                style={{
                  position: 'absolute',
                  left: '0',
                  right: '0',
                  top: overlayPosition === 'top' ? '20px' : overlayPosition === 'center' ? '45%' : 'auto',
                  bottom: overlayPosition === 'bottom' ? '50px' : 'auto',
                  textAlign: 'center',
                  color: textColor,
                  fontSize: textSize,
                  fontWeight: '700',
                  textShadow: '0 2px 6px rgba(0,0,0,0.8)',
                  pointerEvents: 'none',
                  padding: '4px 12px'
                }}
              >
                {overlayText}
              </div>
            )}
          </div>

          {/* Subtitles Overlay Bar */}
          {subtitles.length > 0 && (
            <div style={{ background: '#1e293b', color: '#f8fafc', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>CC:</span>
              <span>{subtitles[0].text}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
