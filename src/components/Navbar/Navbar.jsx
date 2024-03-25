import React, { useState } from "react";
import { FaGithub, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";


import { motion } from "framer-motion";
import { MobileNav } from "./MobileNav";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const items = ["home", "about", "portfolio", "contact", "skills"];

  const handleClose = () => {
    setOpen(false)
  }

  const navVariants = {
    hidden: {
      opacity: 0,
      scale: 0.2,
    },

    visible: {
      opacity: 1,
      scale: 1,

      transition: {
        duration: 1,
      },
    },
  };

  return (
    <main className="  bg-[#0c0c1d] md:bg-transparent z-20">
      <motion.main
        className="flex justify-between items-center px-7  w-full"
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="font-bold text-xl  md:text-2xl">I_AM_BENJAMIN 👨🏾‍💻</h1>

        <section className="hidden lg:flex flex-col gap-5 items-center">
          <motion.div className="flex items-center gap-5 font-semibold text-xl">
            {items.map((t) => (
              <motion.a
                className=" capitalize"
                href={`#${t}`}
                key={t}
                whileHover={{ scale: 1.1, color: "gray" }}
                whileTap={{ scale: 0.9 }}
              >
                {t}
              </motion.a>
            ))}
          </motion.div>

          <div className="flex items-center gap-8">
            <motion.a
              href="https://github.com/Benjamin-chidera"
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
            >
              {" "}
              <FaGithub />
            </motion.a>
            <motion.a
              href=" https://instagram.com/benjamin_c.dev?igshid=MzMyNGUyNmU2YQ=="
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
            >
              {" "}
              <FaInstagram />
            </motion.a>
            <motion.a
              href="https://twitter.com/BenjaminChide14"
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
            >
              {" "}
              <FaSquareXTwitter />
            </motion.a>
            <motion.a
              href="https://wa.me/09048401533"
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaWhatsapp />
            </motion.a>
          </div>
        </section>

        <button
          className=" z-50 flex lg:hidden justify-end items-end mt-2 relative"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <IoCloseSharp color="black" size={40} />
          ) : (
            <IoMdMenu size={40} color="white" />
          )}
        </button>
      </motion.main>
      <section className="lg:hidden">
        {/* mobile navbar */}
        <div className="">
          {open && <MobileNav handleClose={handleClose} />}
        </div>
      </section>
    </main>
  );
};
