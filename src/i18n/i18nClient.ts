import i18n from 'i18next'
import enLocale from './locales/en-EN.json'

const i18nClient = i18n.init({
  load: 'all',
  whitelist: ['en', 'en-US', 'tr', 'tr-TR'],
  lng: 'en',
  resources: {
    en: {
      translation: enLocale,
    },
  },
})

export default i18nClient
