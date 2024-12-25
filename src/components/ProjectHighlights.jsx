import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Clean Water Initiative",
    description: "Providing clean water access to rural communities",
    category: "SDG 6",
    gradient: "from-blue-400 to-cyan-300"
  },
  {
    title: "Education for All",
    description: "Supporting quality education in underserved areas",
    category: "SDG 4",
    gradient: "from-purple-400 to-pink-300"
  },
  {
    title: "Green Cities",
    description: "Urban sustainability and climate action projects",
    category: "SDG 11",
    gradient: "from-green-400 to-emerald-300"
  }
];

export default function ProjectHighlights() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-gray-800"
        >
          Featured Projects
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10`} />
              <div className="relative p-6 bg-white/90 backdrop-blur-sm">
                <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-green-400 text-white mb-4">
                  {project.category}
                </span>
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                >
                  Learn More →
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}