"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedSection() {
  const features = [
    {
      title: "Materiais Premium",
      description:
        "Couros italianos e materiais cuidadosamente selecionados para durabilidade e elegância",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop&crop=center&auto=format&q=80",
    },
    {
      title: "Design Atemporal",
      description:
        "Acessórios clássicos que nunca saem de moda e complementam qualquer look",
      image:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&h=400&fit=crop&crop=center&auto=format&q=80",
    },
    {
      title: "Sustentabilidade",
      description:
        "Opções em couro vegano e práticas sustentáveis para um futuro melhor",
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=400&fit=crop&crop=center&auto=format&q=80",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-light text-gray-900 mb-4">
            Por que Escolher a MinimalWear
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Acreditamos em criar acessórios que resistem ao teste do tempo,
            tanto em estilo quanto em qualidade.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/about">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Saiba Mais Sobre Nós
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
