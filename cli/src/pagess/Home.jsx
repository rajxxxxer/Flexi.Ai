import React from 'react';
import { motion } from 'framer-motion'; // ✅ Import framer-motion
import Navbar from '../compon/Navbar';
import Hero from '../compon/Hero';
import AiTools from '@/compon/AiTools';
import Testimonial from '@/compon/Testimonial';
import Plan from '@/compon/Plan';
import Footer from '@/compon/Footer';

// ✅ Animation variant for slide-up with fade
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut", // ✅ Replaced invalid easing
    },
  },
};


const Home = () => {
  return (
    <div>
      {/* Animate on load OR use whileInView for scroll-based animation */}

      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <Navbar />
      </motion.div>

      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <Hero />
      </motion.div>

      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <AiTools />
      </motion.div>

      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <Testimonial />
      </motion.div>

      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <Plan />
      </motion.div>

      <motion.div variants={fadeInUp} initial="hidden" animate="visible">
        <Footer />
      </motion.div>
    </div>
  );
};

export default Home;
