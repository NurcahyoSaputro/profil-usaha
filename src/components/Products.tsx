import { motion } from "motion/react";
import { Product } from "../services/contentService";

interface ProductsProps {
  products: Product[];
}

const defaultProducts = [
  {
    id: "1",
    name: "Original Gurih",
    description: "Rasa klasik dengan sentuhan garam laut pilihan.",
    price: "Rp 15.000",
    image: "https://picsum.photos/seed/original/400/500",
    tag: "Best Seller",
    order: 0
  },
  {
    id: "2",
    name: "Pedas Daun Jeruk",
    description: "Sensasi pedas nendang dengan aroma daun jeruk segar.",
    price: "Rp 18.000",
    image: "https://picsum.photos/seed/spicy/400/500",
    tag: "Hot",
    order: 1
  },
  {
    id: "3",
    name: "Keju Bakar",
    description: "Gurihnya keju premium yang dibakar sempurna.",
    price: "Rp 17.000",
    image: "https://picsum.photos/seed/cheese/400/500",
    tag: "New",
    order: 2
  },
  {
    id: "4",
    name: "Balado Manis",
    description: "Perpaduan manis dan pedas balado khas nusantara.",
    price: "Rp 16.000",
    image: "https://picsum.photos/seed/balado/400/500",
    tag: "Favorite",
    order: 3
  }
];

export default function Products({ products }: ProductsProps) {
  const displayProducts = products.length > 0 ? products : defaultProducts;

  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary uppercase tracking-widest text-sm font-bold mb-4 block"
          >
            Koleksi Kami
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-light mb-6"
          >
            Varian Rasa <span className="italic">Istimewa</span>
          </motion.h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Kami menghadirkan berbagai pilihan rasa yang dikembangkan khusus untuk memanjakan lidah Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-3xl mb-6 aspect-[3/4]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                {product.tag && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      {product.tag}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="text-2xl font-serif mb-2">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-4 leading-relaxed">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-primary">{product.price}</span>
                <button className="text-sm font-bold uppercase tracking-widest border-b-2 border-primary pb-1 hover:text-accent hover:border-accent transition-all">
                  Tambah
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
