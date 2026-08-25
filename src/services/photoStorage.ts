import { openDB } from 'idb';
import type { IDBPDatabase } from 'idb';
import type { PhotoMemory } from '../types/memory';
import { DEFAULT_PHOTOS } from '../data/defaultContent';

const DB_NAME = 'AkkoiMemoryDB';
const STORE_NAME = 'photos';
const DB_VERSION = 1;

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      },
    }).catch(err => {
      console.warn('IndexedDB unavailable, falling back to localStorage:', err);
      return null as unknown as IDBPDatabase;
    });
  }
  return dbPromise;
}

/**
 * Compresses an image file on a hidden canvas to save IndexedDB space and maintain fast loads.
 */
export async function compressImage(file: File, maxDimension = 1400, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        // Convert to webp or jpeg
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => reject(new Error('Failed to load image for compression'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}

/**
 * Loads all photos from IndexedDB. If empty, initializes with default memories.
 */
export async function loadAllPhotos(): Promise<PhotoMemory[]> {
  try {
    const db = await getDB();
    if (db) {
      const storedPhotos = await db.getAll(STORE_NAME);
      if (storedPhotos && storedPhotos.length > 0) {
        const photoMap = new Map<string, PhotoMemory>();
        DEFAULT_PHOTOS.forEach(p => photoMap.set(p.id, p));
        storedPhotos.forEach((p: PhotoMemory) => photoMap.set(p.id, p));
        return Array.from(photoMap.values()).sort((a, b) => a.slotNumber - b.slotNumber);
      }
    }
  } catch (e) {
    console.error('Error loading from IndexedDB:', e);
  }

  // Fallback check in localStorage
  try {
    const local = localStorage.getItem('akkoi_photos_backup');
    if (local) {
      const parsed = JSON.parse(local);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('LocalStorage fallback failed:', e);
  }

  return DEFAULT_PHOTOS;
}

/**
 * Saves or updates a photo in persistent storage (IndexedDB + localStorage backup).
 */
export async function savePhoto(photo: PhotoMemory): Promise<void> {
  const updatedPhoto: PhotoMemory = {
    ...photo,
    updatedAt: Date.now(),
  };

  try {
    const db = await getDB();
    if (db) {
      await db.put(STORE_NAME, updatedPhoto);
    }
  } catch (e) {
    console.error('Failed to save in IndexedDB:', e);
  }

  // Also update localStorage backup
  try {
    const current = await loadAllPhotos();
    const index = current.findIndex(p => p.id === photo.id);
    if (index >= 0) {
      current[index] = updatedPhoto;
    } else {
      current.push(updatedPhoto);
    }
    localStorage.setItem('akkoi_photos_backup', JSON.stringify(current));
  } catch (e) {
    console.warn('Could not update localStorage backup:', e);
  }
}

/**
 * Resets a single photo slot back to its default placeholder.
 */
export async function resetPhoto(id: string): Promise<PhotoMemory> {
  const defaultPhoto = DEFAULT_PHOTOS.find(p => p.id === id);
  if (!defaultPhoto) throw new Error('Unknown photo id');

  try {
    const db = await getDB();
    if (db) {
      await db.put(STORE_NAME, defaultPhoto);
    }
  } catch (e) {
    console.error('Error resetting photo in IndexedDB:', e);
  }

  return defaultPhoto;
}
