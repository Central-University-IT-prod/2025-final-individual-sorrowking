const generateFileName = (file: File) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const fileExtension = file.name.split('.').pop();
  return `image_${timestamp}-${randomString}.${fileExtension}`;
};

const generateRandomId = () => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomString}`;
};

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const DB_NAME = 'ImageDB';
    const DB_VERSION = 2; 
    
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images', { keyPath: 'key' });
      }
    };
    

    request.onsuccess = (event) => {
      const target = event.target as IDBOpenDBRequest;
      resolve(target.result);
    };

    request.onerror = (event) => {
      const target = event.target as IDBOpenDBRequest;
      reject(target.error);
    };
  });
};

const storeImage = async (key: string, base64: string): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction('images', 'readwrite');
  const store = transaction.objectStore('images');
  store.put({ key, base64 });
};

const getImage = async (key: string): Promise<string | null> => {
  const db = await openDB();
  const transaction = db.transaction('images', 'readonly');
  const store = transaction.objectStore('images');
  const request = store.get(key);

  return new Promise((resolve) => {
    request.onsuccess = (event) => {
      const target = event.target as IDBRequest;
      resolve(target.result?.base64 || null);
    };
    request.onerror = () => {
      resolve(null);
    };
  });
};

const deleteImage = async (key: string): Promise<void> => {
  const db = await openDB();
  const transaction = db.transaction('images', 'readwrite');
  const store = transaction.objectStore('images');
  const request = store.delete(key);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(); 
    };

    request.onerror = (event) => {
      const target = event.target as IDBRequest;
      reject(target.error); 
    };
  });
};

export { generateFileName, generateRandomId, openDB, storeImage, getImage, deleteImage };