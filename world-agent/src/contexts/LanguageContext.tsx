import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 
  | 'English' 
  | 'Chinese' 
  | 'French' 
  | 'Spanish' 
  | 'Russian' 
  | 'Italian' 
  | 'Arabic' 
  | 'Japanese' 
  | 'German' 
  | 'Portuguese' 
  | 'Korean' 
  | 'Hindi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

import { translations } from '../translations';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('command_language');
    return (saved as Language) || 'English';
  });

  useEffect(() => {
    localStorage.setItem('command_language', language);
    // Update document direction for Arabic
    document.dir = language === 'Arabic' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    const langTranslations = translations[language] || translations['English'];
    return langTranslations[key] || translations['English'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
