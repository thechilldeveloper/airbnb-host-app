import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
};

// Only initialize when running in the browser or when credentials are present.
// During next build static pre-render the credentials are absent; the guard
// prevents an invalid-api-key crash at build time.
function getApp(): FirebaseApp | null {
  if (typeof window === "undefined" && !firebaseConfig.apiKey) return null;
  if (getApps().length > 0) return getApps()[0];
  try {
    return initializeApp(firebaseConfig);
  } catch {
    return null;
  }
}

const app = getApp();

// These will be null during SSR pre-render with missing keys, and real
// instances in the browser / when keys are present.
export const db = app ? getFirestore(app) : (null as unknown as Firestore);
export const storage = app ? getStorage(app) : (null as unknown as FirebaseStorage);
export const auth = app ? getAuth(app) : (null as unknown as Auth);
export default app;
