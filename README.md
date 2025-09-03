# Expo Products App

A sample product catalog application built with React Native and Expo. This app demonstrates modern mobile development practices with features like product browsing, filtering, sorting, and detailed product views.

## Features

- Browse products with pagination
- Filter products by category
- Sort products by price or rating
- View detailed product information
- Deep linking support for products and categories
- Push notifications integration
- Error handling and loading states
- Responsive design with modern UI components

## Tech Stack

- [Expo](https://expo.dev/)
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [Jest](https://jestjs.io/)
- [React Query](https://tanstack.com/query/latest/docs/framework/react/overview)
- [Lucide](https://lucide.dev/)
- [NativeWind](https://www.nativewind.dev/)
- [OneSignal](https://www.onesignal.com/)
- [Zod](https://zod.dev/)

## Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 22 or higher)
- [Yarn](https://yarnpkg.com/) package manager
- For iOS development: Xcode (macOS only)
- For Android development: Android Studio

## Getting Started

1. **Clone the repository**
   ```bash
   git clone git@github.com:DenianFossatti/expo-products-app.git
   cd expo-products-app
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file with your configuration
   ```

4. **Run the project**
   #### For iOS
   ```bash
   yarn ios
   ```
   #### For Android
   ```bash
   yarn android
   ```

## Available Commands

| Command | Description |
|---------|-------------|
| `yarn start` | Start the Expo development server with dev client |
| `yarn android` | Run the app on Android device/emulator |
| `yarn ios` | Prebuild and run the app on iOS device/simulator |
| `yarn prebuild` | Generate native code for iOS and Android |
| `yarn lint` | Run ESLint to check code quality |
| `yarn test` | Run Jest tests |
| `yarn typecheck` | Run TypeScript compiler to check types |
| `yarn env:check` | Validate environment variables configuration |

## Architecture

This project follows clean architecture principles with:

- **Atomic Design**: UI components organized in atoms, molecules, organisms, and templates
- **Domain-driven structure**: Features organized by business logic
- **Data mappers**: Decoupling UI from API responses
- **State management**: Using Zustand for global state
- **Type safety**: Full TypeScript implementation

## Deep Linking

The app supports deep links for enhanced user experience:

```bash
# Open specific product
npx uri-scheme open "products-app://product/103" --ios

# Open specific product - Not Found Scenario
npx uri-scheme open "products-app://product/99999" --ios

# Open category filter
npx uri-scheme open "products-app://?category=vehicle" --ios
```

## License

This project is private and for demonstration purposes only.
