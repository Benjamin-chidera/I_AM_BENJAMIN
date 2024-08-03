import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export const Footer = () => {
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  return (
    <motion.div
      className="text-center mt-20"
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
