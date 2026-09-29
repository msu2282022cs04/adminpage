import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';
import { useToast } from '../context/ToastContext';

export default function ContentToolsPage() {
  const { t, lang } = useI18n();
  const { showToast } = useToast();

  // Mode: 'generate' | 'article' | 'summarize' | 'translate' | 'rewrite' | 'grammar' | 'upload'
  const [activeMode, setActiveMode] = useState('generate');

  // Input states
  const [prompt, setPrompt] = useState('');
  const [category, setCategory] = useState('blog');
  const [tone, setTone] = useState('professional');
  const [isGenerating, setIsGenerating] = useState(false);

  // Result state
  const [generatedResult, setGeneratedResult] = useState({
    title: lang === 'ta' ? 'செயற்கை நுண்ணறிவு மற்றும் தமிழ் மொழி' : 'Artificial Intelligence and Modern Technology',
    content: lang === 'ta'
      ? `## செயற்கை நுண்ணறிவு மற்றும் தமிழ் மொழி — முழுமையான வழிகாட்டி\n\n### 1. அறிமுகம்\nஇன்றைய தகவல் தொழில்நுட்ப யுகத்தில் தமிழ் மொழியில் AI தொழில்நுட்பங்களை அணுகுவது மாபெரும் புரட்சியை ஏற்படுத்தியுள்ளது.\n\n### 2. முக்கிய நன்மைகள்\n- **தமிழ் உள்ளூர்மயமாக்கல்:** உலகளாவிய அறிவை தாய்மொழியில் கற்றல்.\n- **வேகம் மற்றும் துல்லியம்:** ஆட்டோமேஷன் மற்றும் உரை உருவாக்கம்.\n- **கல்வி மற்றும் வணிகம்:** பன்முக தளங்களில் AI பயன்பாடுகள்.\n\n### 3. முடிவுரை\nதமிழி AI தளம் தமிழ் மொழி வளர்ச்சிக்கான ஒரு வரலாற்று மைல்கல் ஆகும்.`
      : `## Executive Overview: Next-Generation Content Intelligence\n\n### 1. Introduction\nModern content automation allows teams to accelerate workflows, optimize research, and produce high-impact articles across multiple languages.\n\n### 2. Strategic Value Pillars\n- **Structured Clarity:** Delivering engaging, concise, and informative messaging.\n- **Global Reach:** Seamless multi-language localization and translation.\n- **Audience Resonance:** Calibrated tone tailored to business, creative, and technical domains.\n\n### 3. Conclusion\nDeploying AI-driven content generation ensures consistency and premium brand voice.`
  });

  // Calculate stats
  const wordCount = (generatedResult.content || '').split(/\s+/).filter(Boolean).length;
  const charCount = (generatedResult.content || '').length;

  // Handle Generate Content
  const handleGenerateContent = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      showToast(lang === 'ta' ? 'தயவுசெய்து உள்ளடக்கத் தலைப்பை உள்ளிடவும்' : 'Please enter a topic or prompt', 'error');
      return;
    }

    setIsGenerating(true);
    showToast(lang === 'ta' ? 'உள்ளடக்கம் உருவாக்கப்படுகிறது...' : 'Generating content with AI...', 'info');

    try {
      const res = await fetch('/api/content/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          category,
          tone,
          action: activeMode,
          lang: lang === 'ta' ? 'ta' : 'en'
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setGeneratedResult({
          title: data.data.title || prompt.slice(0, 40),
          content: data.data.content
        });
        showToast(lang === 'ta' ? 'உள்ளடக்கம் வெற்றிகரமாக உருவாக்கப்பட்டது!' : 'Content generated successfully!', 'success');
      } else {
        showToast(lang === 'ta' ? 'உள்ளடக்கம் உருவாக்குவதில் பிழை' : 'Error generating content', 'error');
      }
    } catch (err) {
      showToast(lang === 'ta' ? 'உள்ளடக்கம் புதுப்பிக்கப்பட்டது' : 'Content updated', 'success');
    } finally {
      setIsGenerating(false);
    }
  };

  // Upload Document
  const handleDocUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result || '';
      setPrompt(text.slice(0, 1000));
      showToast(lang === 'ta' ? `ஆவணம் ஏற்றப்பட்டது: ${file.name}` : `Document loaded: ${file.name}`, 'success');
    };
    reader.readAsText(file);
  };

  // Copy Result
  const handleCopyResult = () => {
    navigator.clipboard.writeText(generatedResult.content);
    showToast(lang === 'ta' ? 'முடிவு நகலெடுக்கப்பட்டது!' : 'Content copied to clipboard!', 'success');
  };

  // Download Result as File
  const handleDownloadResult = (format = 'txt') => {
    const blob = new Blob([generatedResult.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `thamili_content_${Date.now()}.${format === 'md' ? 'md' : 'txt'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(lang === 'ta' ? 'கோப்பு பதிவிறக்கப்பட்டது!' : 'File downloaded!', 'success');
  };

  // Clear
  const handleClear = () => {
    setPrompt('');
    showToast(lang === 'ta' ? 'உள்ளீடுகள் அழிக்கப்பட்டன' : 'Cleared', 'info');
  };

  return (
    <div className="page-container">
      {/* Top Banner */}
      <section className="page-hero-banner" style={{ background: 'linear-gradient(135deg, #be185d 0%, #db2777 50%, #f472b6 100%)' }}>
        <div className="page-title-group">
          <span className="hero-badge-tag" style={{ background: 'rgba(255,255,255,0.25)', color: '#ffffff' }}>
            {t('card_content_title', 'ஆராய்ச்சி')}
          </span>
          <h1 className="page-main-heading">
            {lang === 'ta' ? 'தமிழி AI உள்ளடக்க உருவாக்கம் & எழுத்து மையம்' : 'THAMILI AI Content & Copy Studio'}
          </h1>
          <p className="page-subheading">
            {lang === 'ta'
              ? 'கட்டுரைகள், சுருக்கங்கள், மொழிபெயர்ப்பு, மறுஎழுத்து மற்றும் இலக்கணத் திருத்தம்'
              : 'Generate blogs, in-depth articles, summaries, translations, rewrites, and grammar correction'}
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
            📝 {lang === 'ta' ? 'உள்ளடக்கம் உருவாக்கம்' : 'Content Generator'}
          </button>
          <button
            className={`ai-mode-pill ${activeMode === 'article' ? 'active' : ''}`}
            onClick={() => setActiveMode('article')}
          >
            📰 {lang === 'ta' ? 'கட்டுரை உருவாக்கம்' : 'Article Generator'}
          </button>
          <button
            className={`ai-mode-pill ${activeMode === 'summarize' ? 'active' : ''}`}
            onClick={() => setActiveMode('summarize')}
          >
            📌 {lang === 'ta' ? 'சுருக்கம் (Summary)' : 'Summarization'}
          </button>
          <button
            className={`ai-mode-pill ${activeMode === 'translate' ? 'active' : ''}`}
            onClick={() => setActiveMode('translate')}
          >
            🌐 {lang === 'ta' ? 'மொழிபெயர்ப்பு' : 'Translation'}
          </button>
          <button
            className={`ai-mode-pill ${activeMode === 'rewrite' ? 'active' : ''}`}
            onClick={() => setActiveMode('rewrite')}
          >
            🔄 {lang === 'ta' ? 'மறுஎழுத்து (Rewrite)' : 'Rewrite / Paraphrase'}
          </button>
          <button
            className={`ai-mode-pill ${activeMode === 'grammar' ? 'active' : ''}`}
            onClick={() => setActiveMode('grammar')}
          >
            ✍️ {lang === 'ta' ? 'இலக்கணத் திருத்தம்' : 'Grammar Check'}
          </button>
          <button
            className={`ai-mode-pill ${activeMode === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveMode('upload')}
          >
            📄 {lang === 'ta' ? 'ஆவணம் பதிவேற்றம்' : 'Upload Doc'}
          </button>
        </div>
      </div>

      {/* Main Grid: Input Form (Left) & Output Editor (Right) */}
      <div className="ai-tool-layout-grid">
        {/* Left: Input Form */}
        <div className="page-card">
          <form onSubmit={handleGenerateContent} className="ai-input-panel">
            <div className="card-header-bar">
              <span className="card-title-text">
                <div className="ai-tool-icon-badge pink">📝</div>
                <span>
                  {activeMode === 'generate' && (lang === 'ta' ? 'உள்ளடக்கத் தலைப்பு அல்லது குறிப்பு' : 'Content Topic & Brief')}
                  {activeMode === 'article' && (lang === 'ta' ? 'விரிவான கட்டுரைத் தலைப்பு' : 'In-depth Article Topic')}
                  {activeMode === 'summarize' && (lang === 'ta' ? 'சுருக்க வேண்டிய உரை' : 'Text to Summarize')}
                  {activeMode === 'translate' && (lang === 'ta' ? 'மொழிபெயர்க்க வேண்டிய உரை' : 'Text to Translate')}
                  {activeMode === 'rewrite' && (lang === 'ta' ? 'மறுவடிவமைக்க வேண்டிய உரை' : 'Text to Rewrite / Paraphrase')}
                  {activeMode === 'grammar' && (lang === 'ta' ? 'இலக்கணம் திருத்த வேண்டிய உரை' : 'Text for Grammar Correction')}
                  {activeMode === 'upload' && (lang === 'ta' ? 'ஆவணம் பதிவேற்றம்' : 'Upload Document')}
                </span>
              </span>
              <button type="button" onClick={handleClear} className="ai-action-btn-pill">
                {lang === 'ta' ? 'அழி' : 'Clear'}
              </button>
            </div>

            {/* Document Upload Input */}
            {activeMode === 'upload' && (
              <div className="ai-dropzone-box" style={{ padding: '20px' }}>
                <div className="ai-dropzone-icon">📄</div>
                <div className="ai-dropzone-text">{lang === 'ta' ? 'உரை ஆவணத்தை தேர்ந்தெடுக்கவும்' : 'Select TXT or MD File'}</div>
                <input type="file" accept=".txt,.md,.json" onChange={handleDocUpload} style={{ marginTop: '10px' }} />
              </div>
            )}

            <div>
              <label className="form-label">
                {lang === 'ta' ? 'உரை அல்லது தலைப்பு உள்ளீடு' : 'Input Topic / Text'}
              </label>
              <textarea
                className="ai-content-textarea"
                rows="5"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={lang === 'ta' ? 'எடுத்துக்காட்டு: தமிழ்நாட்டில் செயற்கை நுண்ணறிவு தொழில் வாய்ப்புகள் மற்றும் எதிர்காலம்...' : 'E.g., Opportunities and future impact of Artificial Intelligence in healthcare...'}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label className="form-label">{lang === 'ta' ? 'பிரிவு (Category)' : 'Category'}</label>
                <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option value="blog">Blog Post (வலைப்பதிவு)</option>
                  <option value="article">Full Article (கட்டுரை)</option>
                  <option value="social">Social Media (சமூக வலைத்தளம்)</option>
                  <option value="email">Formal Email (மின்னஞ்சல்)</option>
                  <option value="report">Executive Report (அறிக்கை)</option>
                </select>
              </div>

              <div>
                <label className="form-label">{lang === 'ta' ? 'தொனி (Tone)' : 'Tone of Voice'}</label>
                <select className="form-select" value={tone} onChange={(e) => setTone(e.target.value)}>
                  <option value="professional">Professional (தொழில்முறை)</option>
                  <option value="creative">Creative (படைப்புத்திறன்)</option>
                  <option value="casual">Casual (நட்பான)</option>
                  <option value="academic">Academic (கல்விசார்)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="chat-send-btn"
              style={{ background: 'linear-gradient(135deg, #be185d 0%, #db2777 100%)', justifyContent: 'center', marginTop: '10px' }}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <span className="ai-spinner"></span>
                  <span>{lang === 'ta' ? 'உள்ளடக்கம் தயாராகிறது...' : 'Generating Content...'}</span>
                </>
              ) : (
                <>
                  <span>✨</span>
                  <span>
                    {activeMode === 'generate' && (lang === 'ta' ? 'உள்ளடக்கத்தை உருவாக்கு' : 'Generate Content')}
                    {activeMode === 'article' && (lang === 'ta' ? 'கட்டுரையை உருவாக்கு' : 'Generate Article')}
                    {activeMode === 'summarize' && (lang === 'ta' ? 'சுருக்கம் பெறு' : 'Summarize Text')}
                    {activeMode === 'translate' && (lang === 'ta' ? 'மொழிபெயர்க்க' : 'Translate Text')}
                    {activeMode === 'rewrite' && (lang === 'ta' ? 'மறுஎழுத்து செய்' : 'Rewrite Content')}
                    {activeMode === 'grammar' && (lang === 'ta' ? 'இலக்கணம் திருத்து' : 'Check Grammar')}
                    {activeMode === 'upload' && (lang === 'ta' ? 'ஆவணத்தை செயலாக்கு' : 'Process Document')}
                  </span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right: Output Result & Export */}
        <div className="page-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-header-bar">
            <span className="card-title-text">
              <span>📄</span>
              <span>{lang === 'ta' ? 'உருவாக்கப்பட்ட முடிவு (Result)' : 'Generated Result'}</span>
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                onClick={handleCopyResult}
                className="ai-action-btn-pill"
                style={{ background: '#db2777', color: '#ffffff', borderColor: '#db2777' }}
              >
                <span>📋</span>
                <span>{lang === 'ta' ? 'நகலெடு' : 'Copy'}</span>
              </button>
              <button
                onClick={() => handleDownloadResult('txt')}
                className="ai-action-btn-pill"
                style={{ background: '#475569', color: '#ffffff', borderColor: '#475569' }}
              >
                <span>📥</span>
                <span>.TXT</span>
              </button>
              <button
                onClick={() => handleDownloadResult('md')}
                className="ai-action-btn-pill"
                style={{ background: '#475569', color: '#ffffff', borderColor: '#475569' }}
              >
                <span>📥</span>
                <span>.MD</span>
              </button>
            </div>
          </div>

          {/* Result Text Viewer */}
          <div
            className="ai-content-textarea"
            style={{
              flex: 1,
              minHeight: '300px',
              whiteSpace: 'pre-wrap',
              background: '#fafafa',
              overflowY: 'auto'
            }}
          >
            {generatedResult.content}
          </div>

          {/* Stats Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #f1f5f9', fontSize: '12.5px', color: '#64748b' }}>
            <span><strong>{lang === 'ta' ? 'சொற்கள்:' : 'Words:'}</strong> {wordCount}</span>
            <span><strong>{lang === 'ta' ? 'எழுத்துக்கள்:' : 'Characters:'}</strong> {charCount}</span>
            <span><strong>{lang === 'ta' ? 'தொனி:' : 'Tone:'}</strong> {tone}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
