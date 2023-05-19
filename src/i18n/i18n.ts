import i18n from 'i18next';
import en from './en';
import id from './id';
import {initReactI18next} from 'react-i18next';
import {NativeModules, Platform} from 'react-native';

const resources = {
  en: en,
  id: id,
};

const locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale ||
      NativeModules.SettingsManager.settings.AppleLanguages[0]
    : NativeModules.I18nManager.localeIdentifier;

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: locale,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
