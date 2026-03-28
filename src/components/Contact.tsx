import { motion } from "motion/react";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

interface ContactProps {
  content?: {
    phone: string;
    email: string;
    address: string;
  };
}

export default function Contact({ content }: ContactProps) {
  const phone = content?.phone || "+62 812 3456 7890";
  const email = content?.email || "halo@singkongcrispy.com";
  const address = content?.address || "Jl. Singkong No. 123, Bandung, Jawa Barat";

  return (
    <section id="contact" className="py-24 bg-primary text-white overflow-hidden relative">
      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl lg:text-5xl font-light mb-8">Hubungi <span className="italic">Kami</span></h2>
            <p className="text-white/70 mb-12 max-w-md leading-relaxed">
              Punya pertanyaan atau ingin menjadi reseller? Jangan ragu untuk menghubungi tim kami. Kami siap melayani Anda.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-white/50 uppercase tracking-widest mb-1">Telepon / WA</p>
                  <p className="text-xl">{phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-white/50 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-xl">{email}</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-white/50 uppercase tracking-widest mb-1">Alamat</p>
                  <p className="text-xl">{address}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-primary transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-8 lg:p-12 text-gray-900"
          >
            <h3 className="text-2xl font-serif mb-8">Kirim Pesan</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Nama Lengkap</label>
                  <input type="text" className="w-full border-b border-gray-200 py-2 focus:border-primary outline-none transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Email</label>
                  <input type="email" className="w-full border-b border-gray-200 py-2 focus:border-primary outline-none transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">Pesan</label>
                <textarea rows={4} className="w-full border-b border-gray-200 py-2 focus:border-primary outline-none transition-all resize-none" placeholder="Tulis pesan Anda di sini..."></textarea>
              </div>
              <button className="w-full bg-primary text-white py-4 rounded-full font-serif text-lg hover:bg-accent transition-all">
                Kirim Sekarang
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
