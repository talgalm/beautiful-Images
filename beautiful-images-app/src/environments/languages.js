export const availableLanguages = ['he', 'en'];

export let currentLanguage = 'en'; // Default language is English

export const setLanguage = (language) => {
    currentLanguage = language;
  };

export const translations  = {
    ImageRequired: {
        he: 'ברוכים הבאים',
        en: 'Welcome !',
      },
      welcome: {
        he: 'ברוכים הבאים',
        en: 'Welcome!',
      },
      greeting: {
        he: 'שלום',
        en: 'Hello',
      },
};