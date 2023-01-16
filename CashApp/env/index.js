import Constants from "expo-constants";

export const env = {
  ASSETS_ROOT_PATH: Constants.expoConfig.extra.ASSETS_ROOT_PATH,
  CASHMANAGER_API_ROOT_URL: Constants.expoConfig.extra.CASHMANAGER_API_ROOT_URL,
  BANK_API_ROOT_URL: Constants.expoConfig.extra.BANK_API_ROOT_URL,
  LOCAL_STORAGE_CURRENT_USER_KEY:
    Constants.expoConfig.extra.LOCAL_STORAGE_CURRENT_USER_KEY,
  BANK_MERCHANT_ID: Constants.expoConfig.extra.BANK_MERCHANT_ID,
  BANK_MERCHANT_PASSWORD: Constants.expoConfig.extra.BANK_MERCHANT_PASSWORD,
  BANK_MERCHANT_ACCOUNT: Constants.expoConfig.extra.BANK_MERCHANT_ACCOUNT
};
