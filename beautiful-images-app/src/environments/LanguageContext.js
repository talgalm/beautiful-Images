// src/contexts/LanguageContext.js
import React, { createContext, useContext, useState } from 'react';
import { translations } from './languages';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState('en'); // Default language is English

  const changeLanguage = (newLanguage) => {
    setCurrentLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
