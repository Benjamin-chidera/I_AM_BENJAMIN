
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export const Footer = () => {
  const location = useLocation();

  const date = new Date().getFullYear();

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
      &copy; {date} | Code with 💻👨‍💻 Benjamin Chidera
    </motion.div>
  );
};
