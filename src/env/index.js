export const PAGE_TITLE = import.meta.env.VITE_PAGE_TITLE;
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const FIREBASE_CONFIG = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
export const FIREBASE_VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY;

/**
 * Default Vite env Variable,
 * @see: https://vitejs.dev/guide/env-and-mode.html#env-variables
 */
export const {
    MODE, // {string} the mode the app is running in.
    BASE_URL, // {string} the base url the app is being served from. This is determined by the base config option.
    PROD, // {boolean} whether the app is running in production.
    DEV, // {boolean} whether the app is running in development (always the opposite of import.meta.env.PROD)
} = import.meta.env;