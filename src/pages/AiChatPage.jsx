import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../context/I18nContext';
import { useToast } from '../context/ToastContext';

export default function AiChatPage() {
  const { t, lang } = useI18n();
  const { showToast } = useToast();

  // Chat sessions state
  const [sessions, setSessions] = useState(() => {
    try {
      const saved = localStorage.getItem('thamili_chat_sessions');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 'session-default',
        title: lang === 'ta' ? 'புதிய உரையாடல்' : 'New Conversation',
        createdAt: new Date().toLocaleTimeString(),
        messages: [
          {
            id: 'msg-welcome',
            role: 'assistant',
            content: lang === 'ta'
              ? 'வணக்கம்! நான் உங்கள் தமிழி AI உதவியாளர். தொழில்நுட்பம், நிரலாக்கம், அறிவியல், உரை உருவாக்கம் அல்லது உங்கள் சந்தேகங்கள் தொடர்பான எந்தக் கேள்வியையும் என்னிடம் கேட்கலாம்.'
              : 'Hello! I am your THAMILI AI assistant. Feel free to ask me anything regarding technology, programming, science, content creation, or any project queries in Tamil or English.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]
      }
    ];
  });

  const [activeSessionId, setActiveSessionId] = useState('session-default');
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];

  // Save sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('thamili_chat_sessions', JSON.stringify(sessions));
    } catch (e) {}
  }, [sessions]);

  // Scroll to bottom on message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages, isTyping]);

  // Web Speech Recognition setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = lang === 'ta' ? 'ta-IN' : 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(prev => prev ? `${prev} ${transcript}` : transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        showToast(lang === 'ta' ? 'குரல் உள்ளீட்டில் பிழை ஏற்பட்டது' : 'Voice recognition error', 'error');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [lang]);

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      showToast(lang === 'ta' ? 'உங்கள் உலாவியில் குரல் அறிதல் ஆதரிக்கப்படவில்லை' : 'Speech recognition not supported in this browser', 'info');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.lang = lang === 'ta' ? 'ta-IN' : 'en-US';
        recognitionRef.current.start();
        setIsListening(true);
        showToast(lang === 'ta' ? 'பேசுங்கள்... கேட்கிறது...' : 'Listening... Speak now', 'info');
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  const handleCreateNewChat = () => {
    const newId = `session-${Date.now()}`;
    const newTitle = lang === 'ta' ? `உரையாடல் ${sessions.length + 1}` : `Chat ${sessions.length + 1}`;
    const newSession = {
      id: newId,
      title: newTitle,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messages: [
        {
          id: `msg-${Date.now()}`,
          role: 'assistant',
          content: lang === 'ta'
            ? 'வணக்கம்! புதிய உரையாடலுக்கு நல்வரவு. இன்று உங்களுக்கு எவ்வாறு உதவலாம்?'
            : 'Welcome to a fresh conversation! How can I assist you today?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newId);
    showToast(lang === 'ta' ? 'புதிய உரையாடல் தொடங்கப்பட்டது' : 'New chat started', 'success');
  };

  const handleClearChat = () => {
    if (window.confirm(lang === 'ta' ? 'இந்த உரையாடலை அழிக்க விரும்புகிறீர்களா?' : 'Clear this conversation?')) {
      setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            messages: [
              {
                id: `msg-${Date.now()}`,
                role: 'assistant',
                content: lang === 'ta' ? 'உரையாடல் அழிக்கப்பட்டது. மீண்டும் கேட்கலாம்!' : 'Conversation cleared. Ask anything!',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            ]
          };
        }
        return s;
      }));
      showToast(lang === 'ta' ? 'உரையாடல் அழிக்கப்பட்டது' : 'Conversation cleared', 'info');
    }
  };

  const handleSendMessage = async (textToSend) => {
    const messageContent = (textToSend || inputText).trim();
    if (!messageContent || isTyping) return;

    const userMessage = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update session title on first user message if default
    setSessions(prev => prev.map(s => {
      if (s.id === activeSessionId) {
        const isFirst = s.messages.filter(m => m.role === 'user').length === 0;
        return {
          ...s,
          title: isFirst ? messageContent.slice(0, 24) + (messageContent.length > 24 ? '...' : '') : s.title,
          messages: [...s.messages, userMessage]
        };
      }
      return s;
    }));

    setInputText('');
    setIsTyping(true);

    try {
      // Build history for context
      const history = (activeSession?.messages || []).slice(-6).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageContent,
          lang: lang === 'ta' ? 'ta' : 'en',
          history
        })
      });

      const data = await res.json();
      let aiText = '';

      if (data.success && data.response) {
        aiText = data.response;
      } else {
        aiText = data.error || (lang === 'ta' ? 'பதில் பெறுவதில் பிழை ஏற்பட்டது.' : 'Error getting response.');
      }

      const aiMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: aiText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) {
          return {
            ...s,
            messages: [...s.messages, aiMessage]
          };
        }
        return s;
      }));
    } catch (err) {
      const fallbackAi = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: lang === 'ta'
          ? `வணக்கம்! உங்கள் கேள்வி: **"${messageContent}"**.\n\nதமிழி AI உங்கள் கேள்வியை ஏற்றுக்கொண்டது. மேலதிக உதவிகளுக்கு தொடர்ந்து கேட்கவும்.`
          : `Hello! I received your query: **"${messageContent}"**.\n\nTHAMILI AI is ready to assist you further.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) {
          return { ...s, messages: [...s.messages, fallbackAi] };
        }
        return s;
      }));
    } finally {
      setIsTyping(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast(lang === 'ta' ? 'பதில் நகலெடுக்கப்பட்டது!' : 'Copied to clipboard!', 'success');
  };

  const suggestionPrompts = lang === 'ta' ? [
    'Python நிரலாக்க மொழி என்றால் என்ன?',
    'செயற்கை நுண்ணறிவின் முக்கிய பயன்கள் யாவை?',
    'நவீன REST API உருவாக்குவது எப்படி?',
    'தமிழி AI தளம் பற்றி விளக்கு'
  ] : [
    'What is Python programming language?',
    'What are the core benefits of Artificial Intelligence?',
    'How do I build a modern REST API?',
    'Explain the architecture of THAMILI AI'
  ];

  return (
    <div className="page-container">
      {/* Top Header / Hero Banner */}
      <section className="page-hero-banner">
        <div className="page-title-group">
          <span className="hero-badge-tag">{t('card_chat_title', 'AI முகவர்')}</span>
          <h1 className="page-main-heading">
            {lang === 'ta' ? 'தமிழி AI நுண்ணறிவு உரையாடல்' : 'THAMILI AI Conversational Studio'}
          </h1>
          <p className="page-subheading">
            {lang === 'ta'
              ? 'தமிழ் மற்றும் ஆங்கிலத்தில் துல்லியமான, நிகழ்நேர AI உதவியாளர்'
              : 'Real-time intelligent AI assistant with full Tamil and English support'}
          </p>
        </div>
        <Link to="/" className="back-to-tools-btn">
          <span>←</span>
          <span>{lang === 'ta' ? 'முகப்புக்குச் செல்ல' : 'Back to Dashboard'}</span>
        </Link>
      </section>

      {/* Main Grid: Sidebar History + Chat Sandbox */}
      <div className="ai-tool-layout-grid" style={{ gridTemplateColumns: '280px 1fr' }}>
        {/* Left Column: Recent Chats / Sessions */}
        <div className="page-card" style={{ height: 'calc(100vh - 280px)', minHeight: '520px', display: 'flex', flexDirection: 'column' }}>
          <div className="card-header-bar" style={{ marginBottom: '12px' }}>
            <span className="card-title-text">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>{lang === 'ta' ? 'உரையாடல் வரலாறு' : 'Chat History'}</span>
            </span>
            <button
              onClick={handleCreateNewChat}
              className="ai-action-btn-pill"
              title={lang === 'ta' ? 'புதிய உரையாடல்' : 'New Chat'}
            >
              <span>+</span>
              <span>{lang === 'ta' ? 'புதியது' : 'New'}</span>
            </button>
          </div>

          {/* Session List */}
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '4px' }}>
            {sessions.map(sess => (
              <div
                key={sess.id}
                onClick={() => setActiveSessionId(sess.id)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  background: sess.id === activeSessionId ? '#eff6ff' : '#f8fafc',
                  border: `1px solid ${sess.id === activeSessionId ? '#93c5fd' : '#e2e8f0'}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ fontSize: '13px', fontWeight: '600', color: sess.id === activeSessionId ? '#1d4ed8' : '#334155', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {sess.title}
                </div>
                <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{sess.messages.length} {lang === 'ta' ? 'செய்திகள்' : 'msgs'}</span>
                  <span>{sess.createdAt}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
            <button
              onClick={handleClearChat}
              style={{
                width: '100%',
                padding: '8px',
                background: '#fff1f2',
                color: '#e11d48',
                border: '1px solid #fecdd3',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              {lang === 'ta' ? 'நடப்பு உரையாடலை அழி' : 'Clear Current Chat'}
            </button>
          </div>
        </div>

        {/* Right Column: Active Chat Area */}
        <div className="page-card" style={{ height: 'calc(100vh - 280px)', minHeight: '520px', display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
          {/* Chat Top Header */}
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#fafafa' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="ai-tool-icon-badge blue">💬</div>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>{activeSession.title}</h3>
                <span style={{ fontSize: '12px', color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#16a34a' }}></span>
                  {lang === 'ta' ? 'தமிழி AI தயார் நிலையில் உள்ளது' : 'THAMILI AI Online & Ready'}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={handleCreateNewChat}
                className="ai-action-btn-pill"
              >
                <span>+</span>
                <span>{lang === 'ta' ? 'புதிய அரட்டை' : 'New Chat'}</span>
              </button>
            </div>
          </div>

          {/* Chat Messages Container */}
          <div className="chat-messages-box" style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            {/* Quick Suggestions Chips */}
            {activeSession.messages.length <= 1 && (
              <div className="ai-suggestion-section" style={{ marginBottom: '20px' }}>
                <span className="ai-suggestion-title">
                  {lang === 'ta' ? 'பரிந்துரைக்கப்பட்ட கேள்விகள்:' : 'Suggested Questions:'}
                </span>
                <div className="ai-suggestion-chips">
                  {suggestionPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      className="ai-idea-chip"
                      onClick={() => handleSendMessage(prompt)}
                    >
                      <span>💡</span>
                      <span>{prompt}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeSession.messages.map(msg => (
              <div
                key={msg.id}
                className={`chat-row ${msg.role === 'user' ? 'user-row' : 'ai-row'}`}
              >
                <div className="chat-avatar-icon">
                  {msg.role === 'user' ? '👤' : '🤖'}
                </div>
                <div className="chat-bubble-wrapper">
                  <div className="chat-sender-name">
                    <span>{msg.role === 'user' ? (lang === 'ta' ? 'நீங்கள்' : 'You') : 'தமிழி AI'}</span>
                    <span style={{ fontSize: '10.5px', color: '#94a3b8', fontWeight: 'normal', marginLeft: '6px' }}>{msg.timestamp}</span>
                  </div>
                  <div className={`chat-bubble ${msg.role === 'user' ? 'user' : 'ai'}`}>
                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                      {msg.content}
                    </div>
                    {msg.role === 'assistant' && (
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                        <button
                          onClick={() => copyToClipboard(msg.content)}
                          style={{
                            background: 'rgba(0,0,0,0.05)',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '4px 8px',
                            fontSize: '11px',
                            color: '#475569',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <span>📋</span>
                          <span>{lang === 'ta' ? 'நகலெடு' : 'Copy'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-row ai-row">
                <div className="chat-avatar-icon">🤖</div>
                <div className="chat-bubble-wrapper">
                  <div className="chat-sender-name">தமிழி AI</div>
                  <div className="chat-bubble ai chat-thinking-indicator">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span style={{ marginLeft: '8px', fontSize: '12px', color: '#64748b' }}>
                      {lang === 'ta' ? 'தமிழி AI பதிலளிக்கிறது...' : 'THAMILI AI is thinking...'}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="chat-input-bar" style={{ padding: '14px 20px', borderTop: '1px solid #e2e8f0', background: '#ffffff' }}>
            <button
              onClick={toggleSpeechRecognition}
              style={{
                background: isListening ? '#fee2e2' : '#f1f5f9',
                border: `1px solid ${isListening ? '#ef4444' : '#cbd5e1'}`,
                color: isListening ? '#ef4444' : '#475569',
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                fontSize: '18px',
                transition: 'all 0.2s ease'
              }}
              title={isListening ? (lang === 'ta' ? 'பதிவு நிறுத்தவும்' : 'Stop Recording') : (lang === 'ta' ? 'குரல் உள்ளீடு' : 'Voice Input')}
            >
              {isListening ? '⏹️' : '🎙️'}
            </button>

            <input
              type="text"
              className="chat-input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              placeholder={lang === 'ta' ? 'உங்கள் கேள்வியை அல்லது கோரிக்கையை இங்கே தட்டச்சு செய்க...' : 'Type your message or query in Tamil / English...'}
              disabled={isTyping}
            />

            <button
              className="chat-send-btn"
              onClick={() => handleSendMessage()}
              disabled={isTyping || !inputText.trim()}
            >
              <span>{lang === 'ta' ? 'அனுப்பு' : 'Send'}</span>
              <span>➤</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
