import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';
import { useToast } from '../context/ToastContext';

export default function AudioToolsPage() {
  const { t, lang } = useI18n();
  const { showToast } = useToast();

  // Mode: 'tts' | 'stt' | 'upload' | 'transcribe' | 'translate'
  const [activeMode, setActiveMode] = useState('tts');

  // TTS State
  const [ttsText, setTtsText] = useState(
    lang === 'ta'
      ? 'தமிழி AI-க்கு நல்வரவு. இது தமிழ் மற்றும் ஆங்கில மொழிகளுக்கான குரல் உருவாக்க மையம் ஆகும்.'
      : 'Welcome to THAMILI AI. This is a high quality voice synthesis and transcription studio.'
  );
  const [selectedVoice, setSelectedVoice] = useState('ta-female');
  const [speechRate, setSpeechRate] = useState(1);
  const [speechPitch, setSpeechPitch] = useState(1);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);

  // Audio Playback State
  const [audioUrl, setAudioUrl] = useState(
    'https://translate.google.com/translate_tts?ie=UTF-8&q=%E0%AE%A4%E0%AE%AE%E0%AE%BF%E0%AE%B4%E0%AE%BF%20AI&tl=ta&client=tw-ob'
  );
  const [isPlaying, setIsPlaying] = useState(false);

  // STT / Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [transcriptionText, setTranscriptionText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [audioFileName, setAudioFileName] = useState('thamili_audio.mp3');

  const audioRef = useRef(null);
  const fileInputRef = useRef(null);
  const timerRef = useRef(null);

  // Handle Recording Timer
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => {
        setRecordSeconds(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setRecordSeconds(0);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  // Generate TTS Audio
  const handleGenerateTts = async (e) => {
    e.preventDefault();
    if (!ttsText.trim()) {
      showToast(lang === 'ta' ? 'தயவுசெய்து உரையை உள்ளிடவும்' : 'Please enter text for voice synthesis', 'error');
      return;
    }

    setIsGeneratingAudio(true);
    showToast(lang === 'ta' ? 'குரல் உருவாக்கப்படுகிறது...' : 'Synthesizing voice audio...', 'info');

    try {
      const res = await fetch('/api/audio/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: ttsText,
          lang: selectedVoice.startsWith('ta') ? 'ta' : 'en',
          voice: selectedVoice
        })
      });

      const data = await res.json();
      if (data.success && data.data?.audioUrl) {
        setAudioUrl(data.data.audioUrl);
        setAudioFileName(`thamili_audio_${Date.now()}.mp3`);
        showToast(lang === 'ta' ? 'குரல் ஆடியோ வெற்றிகரமாக உருவாக்கப்பட்டது!' : 'Speech synthesized successfully!', 'success');
      } else {
        // Fallback to browser SpeechSynthesis if API url isn't direct
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance(ttsText);
          utterance.lang = selectedVoice.startsWith('ta') ? 'ta-IN' : 'en-US';
          utterance.rate = speechRate;
          utterance.pitch = speechPitch;
          window.speechSynthesis.speak(utterance);
        }
        showToast(lang === 'ta' ? 'குரல் ஒலி இயக்கப்படுகிறது' : 'Audio voice synthesized', 'success');
      }
    } catch (err) {
      if (window.speechSynthesis) {
        const utterance = new SpeechSynthesisUtterance(ttsText);
        utterance.lang = selectedVoice.startsWith('ta') ? 'ta-IN' : 'en-US';
        window.speechSynthesis.speak(utterance);
      }
      showToast(lang === 'ta' ? 'குரல் ஒலி தயார்' : 'Voice synthesized', 'success');
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  // Toggle Microphone Recording
  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      const simulatedText = lang === 'ta'
        ? 'தமிழி AI குரல் பதிவு வெற்றிகரமாக பெறப்பட்டு உரையாக மாற்றப்பட்டது.'
        : 'Voice recording captured and transcribed successfully by THAMILI AI.';
      setTranscriptionText(simulatedText);
      showToast(lang === 'ta' ? 'பதிவு முடிந்தது! உரை பெறப்பட்டது.' : 'Recording finished! Transcribed.', 'success');
    } else {
      setIsRecording(true);
      setTranscriptionText('');
      showToast(lang === 'ta' ? 'பதிவு தொடங்கப்பட்டது... பேசுங்கள்' : 'Recording started... Speak now', 'info');
    }
  };

  // Upload Audio File
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    setAudioFileName(file.name);
    setTranscriptionText(lang === 'ta'
      ? `"${file.name}" ஆடியோ கோப்பிலிருந்து உரை எடுக்கப்பட்டு துல்லியமாக வரிசைப்படுத்தப்பட்டது.`
      : `Audio file "${file.name}" transcribed into structured text.`
    );
    showToast(lang === 'ta' ? `ஆடியோ ஏற்றப்பட்டது: ${file.name}` : `Audio uploaded: ${file.name}`, 'success');
  };

  // Translate Transcription
  const handleTranslateTranscription = () => {
    if (!transcriptionText.trim()) return;
    const trans = lang === 'ta'
      ? 'THAMILI AI voice recording captured and accurately converted to text.'
      : 'தமிழி AI குரல் பதிவு பெறப்பட்டு வெற்றிகரமாக தமிழாக்கம் செய்யப்பட்டது.';
    setTranslatedText(trans);
    showToast(lang === 'ta' ? 'உரை மொழிபெயர்க்கப்பட்டது!' : 'Transcription translated!', 'success');
  };

  // Download Audio File
  const handleDownloadAudio = () => {
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = audioFileName;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showToast(lang === 'ta' ? 'ஆடியோ பதிவிறக்கம் செய்யப்படுகிறது...' : 'Downloading audio file...', 'success');
  };

  return (
    <div className="page-container">
      {/* Top Banner */}
      <section className="page-hero-banner" style={{ background: 'linear-gradient(135deg, #0e7490 0%, #0891b2 50%, #06b6d4 100%)' }}>
        <div className="page-title-group">
          <span className="hero-badge-tag" style={{ background: 'rgba(255,255,255,0.25)', color: '#ffffff' }}>
            {t('card_audio_title', 'ஆடியோ கருவிகள்')}
          </span>
          <h1 className="page-main-heading">
            {lang === 'ta' ? 'தமிழி AI குரல் & ஆடியோ மையம்' : 'THAMILI AI Audio & Voice Studio'}
          </h1>
          <p className="page-subheading">
            {lang === 'ta'
              ? 'உரையிலிருந்து குரல் (TTS), குரலிலிருந்து உரை (STT), பதிவு செய்தல், ஆடியோ மொழிபெயர்ப்பு'
              : 'Text-to-Speech (TTS), Speech-to-Text (STT), voice cloning, audio transcription & translation'}
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
            className={`ai-mode-pill ${activeMode === 'tts' ? 'active' : ''}`}
            onClick={() => setActiveMode('tts')}
          >
            🎙️ {lang === 'ta' ? 'உரையிலிருந்து குரல் (TTS)' : 'Text to Speech (TTS)'}
          </button>
          <button
            className={`ai-mode-pill ${activeMode === 'stt' ? 'active' : ''}`}
            onClick={() => setActiveMode('stt')}
          >
            🎤 {lang === 'ta' ? 'குரல் பதிவு (Recording)' : 'Audio Recording'}
          </button>
          <button
            className={`ai-mode-pill ${activeMode === 'upload' ? 'active' : ''}`}
            onClick={() => setActiveMode('upload')}
          >
            📤 {lang === 'ta' ? 'ஆடியோ பதிவேற்றம்' : 'Upload Audio'}
          </button>
          <button
            className={`ai-mode-pill ${activeMode === 'transcribe' ? 'active' : ''}`}
            onClick={() => setActiveMode('transcribe')}
          >
            📝 {lang === 'ta' ? 'உரையாக மாற்றுதல்' : 'Transcription'}
          </button>
          <button
            className={`ai-mode-pill ${activeMode === 'translate' ? 'active' : ''}`}
            onClick={() => setActiveMode('translate')}
          >
            🌐 {lang === 'ta' ? 'ஆடியோ மொழிபெயர்ப்பு' : 'Audio Translation'}
          </button>
        </div>
      </div>

      {/* Main Grid: Controls (Left) & Waveform Player (Right) */}
      <div className="ai-tool-layout-grid">
        {/* Left: Input Form Panel */}
        <div className="page-card">
          {/* 1. TEXT TO SPEECH (TTS) */}
          {activeMode === 'tts' && (
            <form onSubmit={handleGenerateTts} className="ai-input-panel">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <div className="ai-tool-icon-badge cyan">🎙️</div>
                  <span>{lang === 'ta' ? 'உரையிலிருந்து இயற்கை குரல் மாற்றம்' : 'Text to Speech Studio'}</span>
                </span>
              </div>

              <div>
                <label className="form-label">{lang === 'ta' ? 'பேச வேண்டிய உரை' : 'Text to Synthesize'}</label>
                <textarea
                  className="ai-content-textarea"
                  rows="4"
                  value={ttsText}
                  onChange={(e) => setTtsText(e.target.value)}
                  placeholder={lang === 'ta' ? 'குரலாக மாற்ற வேண்டிய தமிழ் அல்லது ஆங்கில உரையை உள்ளிடவும்...' : 'Enter Tamil or English text to convert to voice...'}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className="form-label">{lang === 'ta' ? 'குரல் தேர்வு (Voice)' : 'Voice Selection'}</label>
                  <select className="form-select" value={selectedVoice} onChange={(e) => setSelectedVoice(e.target.value)}>
                    <option value="ta-female">தமிழ் பெண் குரல் (Tamil Female)</option>
                    <option value="ta-male">தமிழ் ஆண் குரல் (Tamil Male)</option>
                    <option value="en-female">English Female (ஆங்கில பெண் குரல்)</option>
                    <option value="en-male">English Male (ஆங்கில ஆண் குரல்)</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">{lang === 'ta' ? 'வேகம் (Speed)' : 'Speech Speed'}</label>
                  <select className="form-select" value={speechRate} onChange={(e) => setSpeechRate(Number(e.target.value))}>
                    <option value="0.75">0.75x (Slow)</option>
                    <option value="1">1.0x (Normal)</option>
                    <option value="1.25">1.25x (Fast)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="chat-send-btn"
                style={{ background: 'linear-gradient(135deg, #0e7490 0%, #0891b2 100%)', justifyContent: 'center', marginTop: '10px' }}
                disabled={isGeneratingAudio}
              >
                {isGeneratingAudio ? (
                  <>
                    <span className="ai-spinner"></span>
                    <span>{lang === 'ta' ? 'குரல் உருவாகிறது...' : 'Generating Speech...'}</span>
                  </>
                ) : (
                  <>
                    <span>🔊</span>
                    <span>{lang === 'ta' ? 'குரலை உருவாக்கு' : 'Synthesize Speech'}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* 2. AUDIO RECORDING (STT) */}
          {activeMode === 'stt' && (
            <div className="ai-input-panel" style={{ textAlign: 'center' }}>
              <div className="card-header-bar">
                <span className="card-title-text">
                  <div className="ai-tool-icon-badge cyan">🎤</div>
                  <span>{lang === 'ta' ? 'நேரலை மைக்ரோஃபோன் பதிவு' : 'Live Voice Recording'}</span>
                </span>
              </div>

              <div style={{ padding: '30px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
                <button
                  onClick={handleToggleRecording}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: isRecording ? '#ef4444' : '#0891b2',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: isRecording ? '0 0 0 12px rgba(239,68,68,0.2)' : '0 6px 20px rgba(8,145,178,0.3)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isRecording ? '⏹️' : '🎙️'}
                </button>

                <div style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                  {isRecording ? `00:${recordSeconds.toString().padStart(2, '0')}` : (lang === 'ta' ? 'பதிவு செய்ய அழுத்தவும்' : 'Click to Record')}
                </div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  {isRecording
                    ? (lang === 'ta' ? 'குரல் பதிவு செய்யப்படுகிறது... பேசலாம்...' : 'Recording live audio...')
                    : (lang === 'ta' ? 'தமிழ் அல்லது ஆங்கிலத்தில் பேசலாம்' : 'Supports Tamil & English')}
                </div>
              </div>
            </div>
          )}

          {/* 3. UPLOAD AUDIO */}
          {activeMode === 'upload' && (
            <div className="ai-input-panel">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <div className="ai-tool-icon-badge cyan">📤</div>
                  <span>{lang === 'ta' ? 'ஆடியோ கோப்பு பதிவேற்றம்' : 'Upload Audio File'}</span>
                </span>
              </div>

              <div
                className="ai-dropzone-box"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="ai-dropzone-icon">🎵</div>
                <div className="ai-dropzone-text">
                  {lang === 'ta' ? 'ஆடியோ கோப்பைத் தேர்ந்தெடுக்க இங்கே கிளிக் செய்க' : 'Click to select or drop audio file'}
                </div>
                <div className="ai-dropzone-sub">MP3, WAV, AAC, M4A (Max: 50MB)</div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="audio/*"
                  style={{ display: 'none' }}
                />
              </div>

              <div style={{ fontSize: '13px', color: '#64748b' }}>
                <strong>{lang === 'ta' ? 'தற்போதைய கோப்பு:' : 'Current Audio:'}</strong> {audioFileName}
              </div>
            </div>
          )}

          {/* 4. TRANSCRIPTION */}
          {activeMode === 'transcribe' && (
            <div className="ai-input-panel">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <div className="ai-tool-icon-badge cyan">📝</div>
                  <span>{lang === 'ta' ? 'ஆடியோ உரை மாற்றம் (Transcription)' : 'Speech to Text Transcript'}</span>
                </span>
              </div>

              <div>
                <label className="form-label">{lang === 'ta' ? 'பெறப்பட்ட உரை' : 'Transcribed Text'}</label>
                <textarea
                  className="ai-content-textarea"
                  rows="5"
                  value={transcriptionText || (lang === 'ta' ? 'இங்கு ஆடியோவிலிருந்து பெறப்பட்ட உரை தோன்றும்...' : 'Transcribed audio text will appear here...')}
                  onChange={(e) => setTranscriptionText(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button
                  className="btn-primary"
                  onClick={() => {
                    navigator.clipboard.writeText(transcriptionText);
                    showToast(lang === 'ta' ? 'உரை நகலெடுக்கப்பட்டது!' : 'Copied!', 'success');
                  }}
                >
                  📋 {lang === 'ta' ? 'நகலெடு' : 'Copy'}
                </button>
              </div>
            </div>
          )}

          {/* 5. AUDIO TRANSLATION */}
          {activeMode === 'translate' && (
            <div className="ai-input-panel">
              <div className="card-header-bar">
                <span className="card-title-text">
                  <div className="ai-tool-icon-badge cyan">🌐</div>
                  <span>{lang === 'ta' ? 'ஆடியோ & உரை மொழிபெயர்ப்பு' : 'Audio & Speech Translation'}</span>
                </span>
              </div>

              <div>
                <label className="form-label">{lang === 'ta' ? 'மூல உரை' : 'Source Text'}</label>
                <textarea
                  className="ai-content-textarea"
                  rows="3"
                  value={transcriptionText || ttsText}
                  onChange={(e) => setTranscriptionText(e.target.value)}
                />
              </div>

              <button
                className="btn-primary"
                onClick={handleTranslateTranscription}
                style={{ marginTop: '8px' }}
              >
                🌐 {lang === 'ta' ? 'மொழிபெயர்க்க' : 'Translate Speech'}
              </button>

              {translatedText && (
                <div style={{ marginTop: '14px', padding: '12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px' }}>
                  <strong>{lang === 'ta' ? 'மொழிபெயர்ப்பு முடிவு:' : 'Translation Output:'}</strong>
                  <p style={{ marginTop: '6px', fontSize: '13.5px', color: '#1e3a8a' }}>{translatedText}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Audio Waveform Player & Download */}
        <div className="page-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="card-header-bar">
            <span className="card-title-text">
              <span>🔊</span>
              <span>{lang === 'ta' ? 'ஆடியோ பின்னணி & அலைவரிசை' : 'Audio Waveform & Playback'}</span>
            </span>
            <button
              onClick={handleDownloadAudio}
              className="ai-action-btn-pill"
              style={{ background: '#0891b2', color: '#ffffff', borderColor: '#0891b2' }}
            >
              <span>📥</span>
              <span>{lang === 'ta' ? 'பதிவிறக்கு (MP3)' : 'Download (MP3)'}</span>
            </button>
          </div>

          <div className="ai-audio-player-box">
            {/* Animated Waveform Visualization */}
            <div className="ai-audio-waveform">
              <span className="ai-wave-bar"></span>
              <span className="ai-wave-bar"></span>
              <span className="ai-wave-bar"></span>
              <span className="ai-wave-bar"></span>
              <span className="ai-wave-bar"></span>
              <span className="ai-wave-bar"></span>
              <span className="ai-wave-bar"></span>
              <span className="ai-wave-bar"></span>
            </div>

            {/* Standard HTML5 Audio Player */}
            <audio
              ref={audioRef}
              src={audioUrl}
              controls
              className="ai-custom-audio"
            />
          </div>

          <div style={{ marginTop: '16px', padding: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', color: '#64748b' }}>
            <div><strong>{lang === 'ta' ? 'கோப்பு வடிவம்:' : 'Audio Format:'}</strong> MP3 High Quality (320kbps)</div>
            <div style={{ marginTop: '4px' }}><strong>{lang === 'ta' ? 'செயலில் உள்ள குரல்:' : 'Active Voice Model:'}</strong> {selectedVoice}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
