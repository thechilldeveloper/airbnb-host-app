"use client";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export function signIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export async function signUp(
  email: string,
  password: string,
  role: "guest" | "host",
  displayName: string
) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName });
  if (db) {
    await setDoc(doc(db, "userRoles", user.uid), {
      role,
      email,
      displayName,
      createdAt: new Date(),
    });
  }
  return user;
}

export async function getUserRole(uid: string): Promise<"guest" | "host" | null> {
  if (!db) return null;
  const snap = await getDoc(doc(db, "userRoles", uid));
  return snap.exists() ? (snap.data().role as "guest" | "host") : null;
}

export function signOut() {
  return firebaseSignOut(auth);
}

export function onAuthChange(cb: (user: User | null) => void) {
  return onAuthStateChanged(auth, cb);
}
