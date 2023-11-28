import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import estraslation from './../Traducciones/es';
import entraslation from './../Traducciones/en';
import frtraslation from './../Traducciones/fr';
import pttraslation from './../Traducciones/pt';


const resources = {
  en: { translation: entraslation },
  es: { translation: estraslation },
  fr: { translation: frtraslation },
  pt: { translation: pttraslation },
};


i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: localStorage.getItem('language') || 'es', 
    fallbackLng: 'es', 
    interpolation: {
      escapeValue: false, 
    },
    react: {
      useSuspense: false, 
    },
  });


export default i18n;

