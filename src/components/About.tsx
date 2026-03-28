import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

interface AboutProps {
  content?: {
    title: string;
    description: string;
    points: string[];
    quote: string;
    author: string;
    role: string;
    image1: string;
    image2: string;
  };
}

export default function About({ content }: AboutProps) {
  const title = content?.title || "Kualitas dari Hulu ke Hilir";
  const description = content?.description || "Berawal dari dapur kecil di desa, kami berkomitmen untuk mengangkat derajat singkong lokal menjadi camilan kelas dunia. Kami bekerja sama langsung dengan petani lokal untuk memastikan kualitas bahan baku terbaik.";
  const points = content?.points || [
    "100% Singkong Segar Pilihan",
    "Tanpa Bahan Pengawet Buatan",
    "Minyak Goreng Berkualitas Tinggi",
    "Bumbu Alami Tanpa MSG Berlebih"
  ];
  const quote = content?.quote || "Kami tidak hanya menjual keripik, kami membagikan kebahagiaan dalam setiap kerenyahan.";
  const author = content?.author || "Budi Santoso";
  const role = content?.role || "Founder Singkong Crispy";
  const image1 = content?.image1 || "https://picsum.photos/seed/farm/400/600";
  const image2 = content?.image2 || "https://picsum.photos/seed/process/400/600";

  return (
    <section id="about" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-2 gap-4"
            >
              <img 
                src={image1} 
                alt="Petani Singkong" 
                className="rounded-3xl w-full h-80 object-cover mt-12"
                referrerPolicy="no-referrer"
              />
              <img 
                src={image2} 
                alt="Proses Pembuatan" 
                className="rounded-3xl w-full h-80 object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-secondary/10 rounded-full blur-3xl"></div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="order-1 lg:order-2"
          >
            <span className="text-primary uppercase tracking-widest text-sm font-bold mb-4 block">Tentang Kami</span>
            <h2 className="text-4xl lg:text-5xl font-light mb-8 leading-tight">
              {title.split(' ').map((word, i) => (
                word.toLowerCase() === 'hulu' || word.toLowerCase() === 'hilir' ? <span key={i} className="italic">{word} </span> : word + ' '
              ))}
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              {description}
            </p>
            
            <ul className="space-y-4 mb-10">
              {points.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <CheckCircle2 className="text-primary" size={20} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="bg-white p-8 rounded-3xl card-shadow border border-primary/5">
              <p className="italic text-lg text-primary mb-4">
                "{quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20"></div>
                <div>
                  <p className="font-bold">{author}</p>
                  <p className="text-sm text-gray-500">{role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
