const { join } = require("path");

require("dotenv").config({
  path: join(process.cwd(), ".env"),
});

export default {
  name: "cashmanager",
  slug: "cashmanager",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash_screen.png",
    resizeMode: "cover",
    backgroundColor: "#ffffff",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#FFFFFF",
    },
    package: "com.yourcompany.yourappname",
    versionCode: 1,
  },
  web: {
    favicon: "./assets/favicon.ico",
  },
  extra: {
    CASHMANAGER_API_ROOT_URL: process.env.CASHMANAGER_API_ROOT_URL,
    BANK_API_ROOT_URL: process.env.BANK_API_ROOT_URL,
    LOCAL_STORAGE_CURRENT_USER_KEY: process.env.LOCAL_STORAGE_CURRENT_USER_KEY,
    ASSETS_ROOT_PATH: process.env.ASSETS_ROOT_PATH,
    BANK_MERCHANT_ID: process.env.BANK_MERCHANT_ID,
    BANK_MERCHANT_PASSWORD: process.env.BANK_MERCHANT_PASSWORD,
    BANK_MERCHANT_ACCOUNT: process.env.BANK_MERCHANT_ACCOUNT,
    eas: {
      projectId: "38c773d9-877e-4700-a67c-9593899a472c",
    },
  },
  plugins: [
    "react-native-nfc-manager",
    [
      "expo-camera",
      {
        cameraPermission: "Allow cash manager to access your camera",
      },
    ],
  ],
};
