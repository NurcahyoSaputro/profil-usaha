import { motion } from "motion/react";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-cream/80 backdrop-blur-md border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-serif font-bold text-primary tracking-tight">Singkong Crispy</span>
          </div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">Beranda</a>
            <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">Tentang Kami</a>
            <a href="#products" className="text-sm font-medium hover:text-primary transition-colors">Produk</a>
            <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Kontak</a>
            <button className="bg-primary text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-accent transition-all flex items-center gap-2">
              <ShoppingBag size={16} />
              Pesan Sekarang
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-primary">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-cream border-b border-primary/10 px-4 pt-2 pb-6 space-y-4"
        >
          <a href="#home" className="block text-lg font-serif" onClick={() => setIsOpen(false)}>Beranda</a>
          <a href="#about" className="block text-lg font-serif" onClick={() => setIsOpen(false)}>Tentang Kami</a>
          <a href="#products" className="block text-lg font-serif" onClick={() => setIsOpen(false)}>Produk</a>
          <a href="#contact" className="block text-lg font-serif" onClick={() => setIsOpen(false)}>Kontak</a>
          <button className="w-full bg-primary text-white px-6 py-3 rounded-full text-lg font-serif">
            Pesan Sekarang
          </button>
        </motion.div>
      )}
    </nav>
  );
}
