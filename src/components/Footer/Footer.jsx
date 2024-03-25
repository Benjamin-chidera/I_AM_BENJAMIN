import React from "react";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <motion.div
      className="text-center"
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
    >
      &copy; 2024 | Code with 💻👨‍💻 Benjamin Chidera
    </motion.div>
  );
};
