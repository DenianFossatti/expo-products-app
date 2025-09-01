import {ExpoConfig} from 'expo/config'
const config: ExpoConfig = {
  name: 'expo-products-app',
  slug: 'expo-products-app',
  version: '1.0.0',
  scheme: 'products-app',
  userInterfaceStyle: 'automatic',
  orientation: 'default',
  platforms: ['ios', 'android', 'web'],
  web: {
    output: 'static',
  },
  plugins: [
    'expo-router',
    // './modules/expo-calendar-reminder/app.plugin.js'
  ],
  android: {
    package: 'com.denianf.expoproductsapp',
  },
  ios: {
    bundleIdentifier: 'com.denianf.expoproductsapp',
    infoPlist: {
      NSCalendarsUsageDescription: 'This app needs access to your calendar to schedule product purchase reminders.',
      NSRemindersUsageDescription: 'This app needs access to your reminders to create product purchase alerts.',
    },
  },
}

export default config
