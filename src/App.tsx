import { useState, useEffect } from 'react';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import { subscribeToSiteContent, subscribeToProducts, SiteContent, Product } from './services/contentService';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(window.location.pathname === '/admin');
  const [content, setContent] = useState<SiteContent | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const unsubscribeContent = subscribeToSiteContent(setContent);
    const unsubscribeProducts = subscribeToProducts(setProducts);

    // Simple routing
    const handlePath = () => setIsAdmin(window.location.pathname === '/admin');
    window.addEventListener('popstate', handlePath);
    
    return () => {
      unsubscribeContent();
      unsubscribeProducts();
      window.removeEventListener('popstate', handlePath);
    };
  }, []);

  if (isAdmin) {
    return <Admin />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero content={content?.hero} />
        <About content={content?.about} />
        <Products products={products} />
        <Contact content={content?.contact} />
      </main>
      <Footer />
    </div>
  );
}
