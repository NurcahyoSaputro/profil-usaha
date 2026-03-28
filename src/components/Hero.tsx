import { motion } from "motion/react";

interface HeroProps {
  content?: {
    title: string;
    subtitle: string;
    buttonText: string;
    imageUrl: string;
  };
}

export default function Hero({ content }: HeroProps) {
  const title = content?.title || "Kelezatan Tradisional dalam Setiap Gigitan.";
  const subtitle = content?.subtitle || "Dibuat dari singkong pilihan petani lokal, diolah dengan resep warisan yang menghasilkan keripik super renyah dan bumbu yang meresap sempurna.";
  const buttonText = content?.buttonText || "Lihat Varian Rasa";
  const imageUrl = content?.imageUrl || "https://picsum.photos/seed/cassava-chips/800/1000";

  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl lg:text-8xl font-light leading-tight mb-6">
              {title.split(' ').map((word, i) => (
                word.toLowerCase() === 'tradisional' ? <span key={i} className="italic text-primary">{word} </span> : word + ' '
              ))}
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              {subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary text-white px-8 py-4 rounded-full text-lg font-serif hover:bg-accent transition-all shadow-lg shadow-primary/20">
                {buttonText}
              </button>
              <button className="border border-primary text-primary px-8 py-4 rounded-full text-lg font-serif hover:bg-primary hover:text-white transition-all">
                Cerita Kami
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <img 
                src={imageUrl} 
                alt="Keripik Singkong" 
                className="pill-image w-full max-w-md mx-auto shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl -z-0"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl -z-0"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
