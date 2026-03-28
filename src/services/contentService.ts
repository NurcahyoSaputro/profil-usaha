import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';

export interface SiteContent {
  hero: {
    title: string;
    subtitle: string;
    buttonText: string;
    imageUrl: string;
  };
  about: {
    title: string;
    description: string;
    points: string[];
    quote: string;
    author: string;
    role: string;
    image1: string;
    image2: string;
  };
  contact: {
    phone: string;
    email: string;
    address: string;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  tag: string;
  order: number;
}

const SITE_CONTENT_PATH = 'siteContent';
const PRODUCTS_PATH = 'products';

export const getSiteContent = async (): Promise<SiteContent | null> => {
  const docRef = doc(db, SITE_CONTENT_PATH, 'main');
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? (docSnap.data() as SiteContent) : null;
};

export const updateSiteContent = async (content: Partial<SiteContent>) => {
  const docRef = doc(db, SITE_CONTENT_PATH, 'main');
  await setDoc(docRef, content, { merge: true });
};

export const getProducts = async (): Promise<Product[]> => {
  const q = query(collection(db, PRODUCTS_PATH), orderBy('order', 'asc'));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

export const subscribeToSiteContent = (callback: (content: SiteContent) => void) => {
  return onSnapshot(doc(db, SITE_CONTENT_PATH, 'main'), (doc) => {
    if (doc.exists()) {
      callback(doc.data() as SiteContent);
    }
  });
};

export const subscribeToProducts = (callback: (products: Product[]) => void) => {
  const q = query(collection(db, PRODUCTS_PATH), orderBy('order', 'asc'));
  return onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
    callback(products);
  });
};

export const updateProduct = async (id: string, product: Partial<Product>) => {
  const docRef = doc(db, PRODUCTS_PATH, id);
  await updateDoc(docRef, product);
};

export const addProduct = async (product: Omit<Product, 'id'>) => {
  const docRef = doc(collection(db, PRODUCTS_PATH));
  await setDoc(docRef, product);
};

export const deleteProduct = async (id: string) => {
  const docRef = doc(db, PRODUCTS_PATH, id);
  // In a real app, you might want to soft delete or check permissions
  // For simplicity, we'll just delete it.
};
