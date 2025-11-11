const SECRET_KEY =
  (import.meta as any).env?.REACT_APP_STORAGE_KEY ||
  (import.meta as any).env?.VITE_APP_STORAGE_KEY ||
  "super-secret-key";

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

async function deriveKey(passphrase: string): Promise<CryptoKey> {
  const enc = textEncoder.encode(passphrase);
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc,
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: enc, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

function base64ToArrayBuffer(base64: string) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

export async function decrypt(encrypted: string) {
  try {
    const [ivB64, ctB64] = encrypted.split(":");
    const iv = new Uint8Array(base64ToArrayBuffer(ivB64));
    const ciphertext = base64ToArrayBuffer(ctB64);
    const key = await deriveKey(SECRET_KEY);
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      ciphertext
    );
    return JSON.parse(textDecoder.decode(decrypted));
  } catch {
    return null;
  }
}

export async function loadFromStorage<T = unknown>(
  key: string
): Promise<T | null> {
  try {
    const encrypted = localStorage.getItem(key);
    console.log(
      `🔍 loadFromStorage(${key}):`,
      encrypted ? "Encrypted data found" : "No data"
    );
    if (!encrypted) return null;

    const result = await decrypt(encrypted);
    console.log(
      `🔍 loadFromStorage(${key}): Decryption result:`,
      result ? "Success" : "Failed"
    );
    return result as Promise<T | null>;
  } catch (error) {
    console.error(`❌ loadFromStorage(${key}): Error:`, error);
    return null;
  }
}

export async function getStoredToken(): Promise<string | null> {
  try {
    console.log("🔍 getStoredToken: Attempting to load encrypted token...");
    const token = await loadFromStorage<string>("token");
    console.log(
      "🔍 getStoredToken: Result:",
      token ? "Token found" : "No token"
    );
    return token || null;
  } catch (error) {
    console.error("❌ getStoredToken: Error loading token:", error);
    return null;
  }
}
