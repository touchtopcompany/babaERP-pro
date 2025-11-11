import { useCallback } from "react";
import { logger } from "@/utils/functions";

// Use a 256-bit key derived from a passphrase
const SECRET_KEY = (import.meta as any).env?.REACT_APP_STORAGE_KEY || "super-secret-key";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

/**
 * Convert a string key to CryptoKey
 */
async function deriveKey(): Promise<CryptoKey> {
  const enc = textEncoder.encode(SECRET_KEY);
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc,
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Convert ArrayBuffer to Base64
 */
function arrayBufferToBase64(buffer: ArrayBuffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((b) => (binary += String.fromCharCode(b)));
  return btoa(binary);
}

/**
 * Convert Base64 to ArrayBuffer
 */
function base64ToArrayBuffer(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

const useSerialize = () => {
  const encrypt = useCallback(async (data: unknown): Promise<string> => {
    const key = await deriveKey();
    const iv = crypto.getRandomValues(new Uint8Array(12)); // AES-GCM IV
    const encoded = textEncoder.encode(JSON.stringify(data));
    const ciphertext = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      encoded
    );

    // Store iv + ciphertext as Base64
    return arrayBufferToBase64(iv.buffer) + ":" + arrayBufferToBase64(ciphertext);
  }, []);

  const decrypt = useCallback(async (encrypted: string) => {
    try {
      const [ivB64, ctB64] = encrypted.split(":");
      const iv = new Uint8Array(base64ToArrayBuffer(ivB64));
      const ciphertext = base64ToArrayBuffer(ctB64);

      const key = await deriveKey();
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        ciphertext
      );

      return JSON.parse(textDecoder.decode(decrypted));
    } catch {
      return null; // invalid or tampered data
    }
  }, []);

  const saveToStorage = useCallback(
    async (key: string, data: unknown) => {
      try {
        logger.log(`useSerialize: Saving to storage key="${key}"`, data);
        const encrypted = await encrypt(data);
        localStorage.setItem(key, encrypted);
        logger.log(`useSerialize: Successfully saved to localStorage`);
      } catch (error) {
        logger.error(`useSerialize: Error saving to storage key="${key}"`, error);
        throw error;
      }
    },
    [encrypt]
  );

  const loadFromStorage = useCallback(
    async (key: string) => {
      try {
        const encrypted = localStorage.getItem(key);
        if (!encrypted) {
          logger.log(`useSerialize: No data found for key="${key}"`);
          return null;
        }
        logger.log(`useSerialize: Loading from storage key="${key}"`);
        const result = await decrypt(encrypted);
        logger.log(`useSerialize: Successfully loaded from storage:`, result);
        return result;
      } catch (error) {
        logger.error(`useSerialize: Error loading from storage key="${key}"`, error);
        return null;
      }
    },
    [decrypt]
  );

  const removeFromStorage = useCallback((key: string) => {
    localStorage.removeItem(key);
  }, []);

  return { encrypt, decrypt, saveToStorage, loadFromStorage, removeFromStorage };
};

export default useSerialize;
      // Await encryption + storage
