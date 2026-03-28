import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Admin from "./components/Admin";
import { subscribeToSiteContent, subscribeToProducts, SiteContent, Product } from './services/contentService';

function MainSite({ content, products }: { content: SiteContent | null, products: Product[] }) {
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

export default function App() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const unsubscribeContent = subscribeToSiteContent(setContent);
    const unsubscribeProducts = subscribeToProducts(setProducts);

    return () => {
      unsubscribeContent();
      unsubscribeProducts();
    };
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MainSite content={content} products={products} />} />
        <Route path="/admin" element={<Admin />} />
        {/* Fallback for any other route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
