import React, { createContext, useContext, useState, useEffect } from 'react';
import { THAMILI_TRANSLATIONS } from '../data/translations';

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem('thamili_lang');
      if (saved === 'ta' || saved === 'en') return saved;
    } catch (e) {}
    return 'ta';
  });

  const [timeState, setTimeState] = useState({ dateStr: '', timeStr: '' });

  const setLanguage = (newLang) => {
    if (newLang === 'ta' || newLang === 'en') {
      setLang(newLang);
      try {
        localStorage.setItem('thamili_lang', newLang);
        document.documentElement.lang = newLang;
        document.documentElement.setAttribute('data-lang', newLang);
      } catch (e) {}
    }
  };

  const t = (key, fallback = '') => {
    if (!key) return fallback;
    const currentDict = THAMILI_TRANSLATIONS[lang];
    if (currentDict && currentDict[key] !== undefined) {
      return currentDict[key];
    }
    if (lang === 'en') {
      if (THAMILI_TRANSLATIONS.en && THAMILI_TRANSLATIONS.en[key] !== undefined) {
        return THAMILI_TRANSLATIONS.en[key];
      }
      // If fallback contains Tamil characters, convert or format key nicely
      if (/[\u0B80-\u0BFF]/.test(fallback)) {
        return key
          .replace(/^(nav_|sub_|card_|hero_|th_|btn_|stat_|act_|promo_|tool_|label_|desc_|metric_|filter_)/, '')
          .replace(/_/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase());
      }
      return fallback || key;
    } else {
      if (THAMILI_TRANSLATIONS.ta && THAMILI_TRANSLATIONS.ta[key] !== undefined) {
        return THAMILI_TRANSLATIONS.ta[key];
      }
      return fallback || key;
    }
  };

  const logoSrc = lang === 'ta' 
    ? 'assets/images/thamili-logo-ta.png' 
    : 'assets/images/thamili-logo-en.png';
  const logoAlt = lang === 'ta' ? 'தமிழி' : 'THAMILI';

  // Live clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const day = now.getDate();
      const year = now.getFullYear();

      if (lang === 'ta') {
        const ampmTa = hours >= 12 ? 'மாலை' : 'காலை';
        hours = hours % 12 || 12;
        const timeStr = `${ampmTa} ${hours.toString().padStart(2, '0')}:${minutes}`;
        const tamilMonths = [
          "ஜனவரி", "பிப்ரவரி", "மார்ச்", "ஏப்ரல்", "மே", "ஜூன்",
          "ஜூலை", "ஆகஸ்ட்", "செப்டம்பர்", "அக்டோபர்", "நவம்பர்", "டிசம்பர்"
        ];
        const dateStr = `${day} ${tamilMonths[now.getMonth()]} ${year}`;
        setTimeState({ dateStr, timeStr });
      } else {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        const timeStr = `${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
        const enMonths = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        const dateStr = `${day} ${enMonths[now.getMonth()]} ${year}`;
        setTimeState({ dateStr, timeStr });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, setLanguage, t, logoSrc, logoAlt, timeState }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
