import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import EN from 'common/language/locales/en.json';
import RU from 'common/language/locales/ru.json';

i18n.use(initReactI18next).init({
   lng: 'en',
   resources: {
      en: { translation: EN },
      tr: { translation: RU },
   },
});

export default i18n;