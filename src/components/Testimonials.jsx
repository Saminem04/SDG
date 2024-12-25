import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Environmental Volunteer",
    quote: "Being part of this platform has allowed me to contribute meaningfully to environmental projects worldwide.",
    gradient: "from-blue-400 to-green-300"
  },
  {
    name: "Michael Chen",
    role: "Education Volunteer",
    quote: "I've met amazing people and helped make education accessible to communities in need.",
    gradient: "from-purple-400 to-pink-300"
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-12 text-gray-800"
        >
          Volunteer Stories
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -5 }}
              className="relative overflow-hidden rounded-xl p-6"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-5`} />
              <div className="relative">
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 text-lg">{testimonial.name}</h3>
                  <p className="text-sm text-blue-600 font-medium">{testimonial.role}</p>
                </div>
                <p className="text-gray-700 italic">{testimonial.quote}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}