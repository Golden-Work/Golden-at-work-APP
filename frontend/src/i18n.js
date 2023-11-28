


import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import estraslation from './../Traducciones/es';
import entraslation from './../Traducciones/es';
import frtraslation from './../Traducciones/es';
import pttraslation from './../Traducciones/es';


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
    lng: 'en', 
    fallbackLng: 'en', 
    interpolation: {
      escapeValue: false, 
    },
    react: {
      useSuspense: false, 
    },
  });


export default i18n;

