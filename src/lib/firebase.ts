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
 * Fires an instant email notification to apluscomputersolympia@gmail.com via FormSubmit AJAX
 */
async function sendEmailNotification(cleanData: ContactSubmission): Promise<boolean> {
  try {
    const response = await fetch('https://formsubmit.co/ajax/apluscomputersolympia@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: `New Website Inquiry from ${cleanData.name} - A+ Computers Olympia`,
        _replyto: cleanData.email.trim(),
        _template: 'table',
        Name: cleanData.name.trim(),
        Email: cleanData.email.trim().toLowerCase(),
        Phone: cleanData.phone ? cleanData.phone.trim() : 'Not provided',
        Message: cleanData.message.trim(),
        Source: typeof window !== 'undefined' ? window.location.href : 'https://apluscomputerrecycle.com',
      }),
    });
    return response.ok;
  } catch (err) {
    console.warn('Email notification warning:', err);
    return false;
  }
}

/**
 * Submits a contact inquiry to Firestore collection `contact_submissions`
 * AND dispatches an instant email notification to apluscomputersolympia@gmail.com.
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
    let docId = 'lead_' + Date.now();

    // Run Firestore save and Email alert in parallel
    const firestorePromise = db
      ? addDoc(collection(db, 'contact_submissions'), {
          name: cleanData.name.trim(),
          email: cleanData.email.trim().toLowerCase(),
          phone: cleanData.phone ? cleanData.phone.trim() : null,
          message: cleanData.message.trim(),
          createdAt: serverTimestamp(),
          sourceUrl: typeof window !== 'undefined' ? window.location.href : 'https://apluscomputerrecycle.com',
          clientUserAgent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
        })
      : Promise.resolve(null);

    const [docRef, emailSent] = await Promise.all([
      firestorePromise.catch((e) => {
        console.warn('Firestore write warning:', e);
        return null;
      }),
      sendEmailNotification(cleanData),
    ]);

    if (docRef && docRef.id) {
      docId = docRef.id;
    }

    if (!docRef && !emailSent) {
      throw new Error('Both Firestore and Email dispatch failed');
    }

    return {
      success: true,
      message: 'Thank you for reaching out! We received your message and will get back to you shortly.',
      id: docId,
    };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error('Failed to submit contact inquiry:', error);
    return {
      success: false,
      message: `Unable to submit message right now. Please call us directly at (360) 754-1311. (${errorMessage})`,
    };
  }
}
