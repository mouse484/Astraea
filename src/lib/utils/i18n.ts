import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '../locales/en.json';
import ja from '../locales/ja.json';

i18next.use(LanguageDetector).init({
	supportedLngs: ['en', 'ja'],
	fallbackLng: 'en',
	resources: {
		en: { translation: en },
		ja: { translation: ja }
	}
});
