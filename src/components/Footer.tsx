export default function Footer() {
  return (
    <footer className="py-12 bg-cream border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <span className="text-2xl font-serif font-bold text-primary tracking-tight">Singkong Crispy</span>
            <p className="text-sm text-gray-500 mt-2">© 2026 Singkong Crispy. All rights reserved.</p>
          </div>
          
          <div className="flex gap-8 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</a>
            <a href="#" className="hover:text-primary transition-colors">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
