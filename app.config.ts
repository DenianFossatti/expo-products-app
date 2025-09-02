import {ExpoConfig} from 'expo/config'

const bundleIdentifier = 'com.denianf.expoproductsapp'
const production = false // handle on .env

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
  android: {
    googleServicesFile: './google-services/production.json',
    package: 'com.denianf.expoproductsapp',
  },
  ios: {
    bundleIdentifier,
    infoPlist: {
      NSCalendarsUsageDescription: 'This app needs access to your calendar to schedule product purchase reminders.',
      NSRemindersUsageDescription: 'This app needs access to your reminders to create product purchase alerts.',
    },
    entitlements: {
      'aps-environment': production ? 'production' : 'development',
      'com.apple.security.application-groups': [`group.${bundleIdentifier}.onesignal`],
    },
  },
  plugins: [
    [
      'onesignal-expo-plugin',
      {
        mode: production ? 'production' : 'development',
      },
    ],
    'expo-router',
    // './modules/expo-calendar-reminder/app.plugin.js'
  ],
}

export default config
