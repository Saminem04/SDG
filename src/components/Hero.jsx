import React from 'react';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-green-400 overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute w-[800px] h-[800px] bg-white/10 rounded-full -top-1/2 -left-1/4 backdrop-blur-3xl"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute w-[600px] h-[600px] bg-white/10 rounded-full -bottom-1/2 -right-1/4 backdrop-blur-3xl"
      />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          Connecting Volunteers to SDG Projects Globally
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-white/90 mb-8"
        >
          Join our global community of changemakers and contribute to sustainable development goals through meaningful volunteer opportunities.
        </motion.p>
        
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-white via-white to-green-50 text-blue-600 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl hover:from-white hover:to-green-100 transition-all duration-300 text-lg"
        >
          Get Started
        </motion.button>
      </div>
    </motion.section>
  );
}