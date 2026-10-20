import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ContactSubmission, ContactSubmissionSchema, ApiResponse } from './validation';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(
  typeof process !== 'undefined' &&
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY
);

export function getFirebaseApp() {
  if (!isFirebaseConfigured) return null;
  try {
    if (!getApps().length) {
      return initializeApp(firebaseConfig);
    }
    return getApp();
  } catch (err) {
    console.warn('Firebase initialization error, will use fallback:', err);
    return null;
  }
}

export function getDb() {
  const app = getFirebaseApp();
  if (!app) return null;
  try {
    return getFirestore(app);
  } catch (err) {
    console.warn('Firestore initialization error:', err);
    return null;
  }
}

/**
 * Submits a contact inquiry to Firestore collection `contact_submissions`
 * Validates with ContactSubmissionSchema prior to any network call.
 * Gracefully stores to local storage if Firebase credentials aren't supplied yet.
 */
export async function submitContactLead(formData: unknown): Promise<ApiResponse> {
  const validationResult = ContactSubmissionSchema.safeParse(formData);
  
  if (!validationResult.success) {
    const firstIssue = validationResult.error.issues[0];
    return {
      success: false,
      message: firstIssue ? firstIssue.message : 'Please check your form inputs.',
    };
  }

  const cleanData: ContactSubmission = validationResult.data;

  try {
    const db = getDb();
    if (db) {
      const docRef = await addDoc(collection(db, 'contact_submissions'), {
        name: cleanData.name.trim(),
        email: cleanData.email.trim().toLowerCase(),
        phone: cleanData.phone ? cleanData.phone.trim() : null,
        message: cleanData.message.trim(),
        createdAt: serverTimestamp(),
        sourceUrl: typeof window !== 'undefined' ? window.location.href : 'https://apluscomputerrecycle.com',
        clientUserAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      });

      return {
        success: true,
        message: 'Thank you for reaching out! We received your message and will get back to you shortly.',
        id: docRef.id,
      };
    } else {
      // Graceful fallback for preview / initial export
      if (typeof window !== 'undefined') {
        try {
          const storageKey = 'aplus_contact_submissions';
          const saved = JSON.parse(localStorage.getItem(storageKey) || '[]');
          saved.push({
            ...cleanData,
            timestamp: new Date().toISOString(),
            id: 'local_' + Math.random().toString(36).substring(2, 9),
          });
          localStorage.setItem(storageKey, JSON.stringify(saved));
        } catch {
          // Ignore local storage error
        }
      }

      return {
        success: true,
        message: 'Thank you! Your message has been received. We will get back to you during shop hours (Tue-Fri 2-5 PM).',
        id: 'mock_' + Date.now(),
      };
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Failed to submit contact inquiry:', error);
    return {
      success: false,
      message: `Unable to submit message right now. Please call us directly at (360) 754-1311. (${errorMessage})`,
    };
  }
}
