import { useState, useEffect } from 'react';
import { auth, loginWithGoogle, logout } from '../firebase';
import { 
  subscribeToSiteContent, 
  subscribeToProducts, 
  updateSiteContent, 
  updateProduct, 
  addProduct,
  SiteContent,
  Product
} from '../services/contentService';
import { motion } from 'motion/react';
import { Save, Plus, Trash2, LogOut, LogIn, ChevronRight, ChevronDown } from 'lucide-react';

export default function Admin() {
  const [user, setUser] = useState(auth.currentUser);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'products' | 'contact'>('hero');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });

    const unsubscribeContent = subscribeToSiteContent(setContent);
    const unsubscribeProducts = subscribeToProducts(setProducts);

    return () => {
      unsubscribeAuth();
      unsubscribeContent();
      unsubscribeProducts();
    };
  }, []);

  const handleSaveContent = async () => {
    if (!content) return;
    try {
      await updateSiteContent(content);
      alert('Konten berhasil disimpan!');
    } catch (error) {
      console.error(error);
      alert('Gagal menyimpan konten.');
    }
  };

  const handleUpdateProduct = async (id: string, data: Partial<Product>) => {
    try {
      await updateProduct(id, data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddProduct = async () => {
    try {
      await addProduct({
        name: "Produk Baru",
        description: "Deskripsi produk baru",
        price: "Rp 0",
        image: "https://picsum.photos/seed/new/400/500",
        tag: "New",
        order: products.length
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className="p-20 text-center">Memuat...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center">
          <h1 className="text-3xl font-serif mb-6">Admin Login</h1>
          <p className="text-gray-500 mb-8">Silakan login dengan akun Google Admin untuk mengelola konten website.</p>
          <button 
            onClick={loginWithGoogle}
            className="w-full bg-primary text-white py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-accent transition-all"
          >
            <LogIn size={20} />
            Login dengan Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white border-r border-gray-200 p-6">
        <div className="flex items-center justify-between mb-10">
          <span className="text-xl font-serif font-bold text-primary">Admin Panel</span>
          <button onClick={logout} className="text-gray-400 hover:text-red-500 transition-colors">
            <LogOut size={20} />
          </button>
        </div>

        <nav className="space-y-2">
          {[
            { id: 'hero', label: 'Hero Section' },
            { id: 'about', label: 'Tentang Kami' },
            { id: 'products', label: 'Produk' },
            { id: 'contact', label: 'Kontak' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                activeTab === tab.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-500 hover:bg-gray-100'
              }`}
            >
              {tab.label}
              <ChevronRight size={16} className={activeTab === tab.id ? 'opacity-100' : 'opacity-0'} />
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 max-w-5xl mx-auto w-full">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-serif capitalize">{activeTab} Management</h2>
          <button 
            onClick={handleSaveContent}
            className="bg-primary text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-accent transition-all"
          >
            <Save size={18} />
            Simpan Perubahan
          </button>
        </header>

        {content && (
          <div className="space-y-8">
            {activeTab === 'hero' && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Judul Utama</label>
                  <input 
                    type="text" 
                    value={content.hero.title}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                    className="w-full border-b border-gray-200 py-2 focus:border-primary outline-none text-xl font-serif"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Sub-judul</label>
                  <textarea 
                    value={content.hero.subtitle}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                    className="w-full border-b border-gray-200 py-2 focus:border-primary outline-none resize-none"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Teks Tombol</label>
                  <input 
                    type="text" 
                    value={content.hero.buttonText}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, buttonText: e.target.value } })}
                    className="w-full border-b border-gray-200 py-2 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">URL Gambar Hero</label>
                  <input 
                    type="text" 
                    value={content.hero.imageUrl}
                    onChange={(e) => setContent({ ...content, hero: { ...content.hero, imageUrl: e.target.value } })}
                    className="w-full border-b border-gray-200 py-2 focus:border-primary outline-none"
                  />
                </div>
              </div>
            )}

            {activeTab === 'about' && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Judul Tentang Kami</label>
                  <input 
                    type="text" 
                    value={content.about.title}
                    onChange={(e) => setContent({ ...content, about: { ...content.about, title: e.target.value } })}
                    className="w-full border-b border-gray-200 py-2 focus:border-primary outline-none text-xl font-serif"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Deskripsi</label>
                  <textarea 
                    value={content.about.description}
                    onChange={(e) => setContent({ ...content, about: { ...content.about, description: e.target.value } })}
                    className="w-full border-b border-gray-200 py-2 focus:border-primary outline-none resize-none"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Quote</label>
                  <input 
                    type="text" 
                    value={content.about.quote}
                    onChange={(e) => setContent({ ...content, about: { ...content.about, quote: e.target.value } })}
                    className="w-full border-b border-gray-200 py-2 focus:border-primary outline-none italic"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Penulis Quote</label>
                    <input 
                      type="text" 
                      value={content.about.author}
                      onChange={(e) => setContent({ ...content, about: { ...content.about, author: e.target.value } })}
                      className="w-full border-b border-gray-200 py-2 focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Jabatan</label>
                    <input 
                      type="text" 
                      value={content.about.role}
                      onChange={(e) => setContent({ ...content, about: { ...content.about, role: e.target.value } })}
                      className="w-full border-b border-gray-200 py-2 focus:border-primary outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-6">
                <button 
                  onClick={handleAddProduct}
                  className="w-full py-4 border-2 border-dashed border-gray-200 rounded-3xl text-gray-400 hover:text-primary hover:border-primary transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={20} />
                  Tambah Produk Baru
                </button>

                <div className="grid gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                      <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                        <img src={product.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 grid md:grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          value={product.name}
                          onChange={(e) => handleUpdateProduct(product.id, { name: e.target.value })}
                          className="font-bold border-b border-gray-100 outline-none focus:border-primary"
                          placeholder="Nama Produk"
                        />
                        <input 
                          type="text" 
                          value={product.price}
                          onChange={(e) => handleUpdateProduct(product.id, { price: e.target.value })}
                          className="text-primary font-bold border-b border-gray-100 outline-none focus:border-primary"
                          placeholder="Harga"
                        />
                        <input 
                          type="text" 
                          value={product.tag}
                          onChange={(e) => handleUpdateProduct(product.id, { tag: e.target.value })}
                          className="text-xs uppercase tracking-widest border-b border-gray-100 outline-none focus:border-primary"
                          placeholder="Tag"
                        />
                        <input 
                          type="text" 
                          value={product.image}
                          onChange={(e) => handleUpdateProduct(product.id, { image: e.target.value })}
                          className="text-xs text-gray-400 border-b border-gray-100 outline-none focus:border-primary"
                          placeholder="URL Gambar"
                        />
                        <textarea 
                          value={product.description}
                          onChange={(e) => handleUpdateProduct(product.id, { description: e.target.value })}
                          className="md:col-span-2 text-sm text-gray-500 border-b border-gray-100 outline-none focus:border-primary resize-none"
                          rows={2}
                          placeholder="Deskripsi"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nomor Telepon</label>
                  <input 
                    type="text" 
                    value={content.contact.phone}
                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, phone: e.target.value } })}
                    className="w-full border-b border-gray-200 py-2 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email Bisnis</label>
                  <input 
                    type="text" 
                    value={content.contact.email}
                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, email: e.target.value } })}
                    className="w-full border-b border-gray-200 py-2 focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Alamat Kantor</label>
                  <textarea 
                    value={content.contact.address}
                    onChange={(e) => setContent({ ...content, contact: { ...content.contact, address: e.target.value } })}
                    className="w-full border-b border-gray-200 py-2 focus:border-primary outline-none resize-none"
                    rows={3}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
