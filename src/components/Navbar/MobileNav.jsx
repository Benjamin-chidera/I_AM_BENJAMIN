
import { motion } from "framer-motion";

// eslint-disable-next-line react/prop-types
export const MobileNav = ({ handleClose }) => {
  const items = ["home", "portfolio", "contact", "skills"];

  const variants = {
    open: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    close: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  return (
    <motion.main
      className="z-40 bg-white w-[200px] max-w-full fixed top-0 bottom-0 right-0 flex justify-center h-screen "
      initial={{
        opacity: 0,
        x: 200,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <section>
        <motion.div className="flex items-center gap-10 font-semibold text-xl text-black justify-center flex-col h-screen">
          {items.map((t) => (
            <motion.a
              onClick={handleClose}
              className=" capitalize"
              href={`#${t}`}
              key={t}
              variants={variants}
              initial="close"
              animate="open"
              whileHover={{ scale: 1.1, color: "gray" }}
              whileTap={{ scale: 0.9 }}
            >
              {t}
            </motion.a>
          ))}
        </motion.div>
      </section>
    </motion.main>
  );
};
