/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { motion } from "framer-motion";
import ben from "../../assets/ben.jpeg";
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

export const Hero = () => {
  const sliderVariants = {
    initial: {
      x: 0,
    },
    animate: {
      x: "-220%",
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 5,
      },
    },
  };

  const handleDownload = () => {
    const downloadLink = document.createElement("a");

    downloadLink.href =
      "https://drive.google.com/file/d/13AoxSsT3XZ4uUT39dP-_arKp8eQzdbRp/view?usp=drive_link";

    downloadLink.download = "resume.pdf";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <main
      className="hero lg:flex justify-between py-14 lg:py-20 w-full relative z-10 px-7 md:px-14"
      id="home"
    >
      <section className=" w-[80%] relative">
        <motion.div
          initial={{
            opacity: 0,
            x: -200,
          }}
          animate={{
            opacity: 1,
            x: 0,

            transition: {
              duration: 1,
            },
          }}
        >
          <section className=" relative">
            <p className=" mb-5">
              <span className=" font-bold text-black">Hi, My </span> Name is
            </p>
            <div className=" bg-white w-14 h-14 rounded-full absolute -top-4 -left-2 -z-30"></div>
          </section>
          <h1 className="text-[rebeccapurple] text-lg md:text-4xl font-bold flex items-center gap-1">
            BENJAMIN CHIDERA BENJAMIN.
          </h1>
          <h2 className=" text-xl  font-semibold leading-9  lg:max-w-[400px] mt-3">
            I'm currently a FULL STACK DEVELOPER based in Lagos, Nigeria.
          </h2>

          <button
            className="my-7 border px-8 py-5 font-semibold text-sm md:text-xl whitespace-nowrap"
            onClick={handleDownload}
          >
            DownLoad Resume
          </button>
        </motion.div>

        <motion.div
          className="hidden lg:block absolute text-[200px] bottom-0 whitespace-nowrap w-[50%] h-fit font-bold -z-30 text-[#ffffff09]"
          variants={sliderVariants}
          initial="initial"
          animate="animate"
        >
          I_AM_BENJAMIN
        </motion.div>
      </section>

      <motion.section
        className=" w-[50%]"
        initial={{
          opacity: 0,
          x: 200,
        }}
        animate={{
          opacity: 1,
          x: 0,

          transition: {
            duration: 1,
          },
        }}
      >
        <motion.div className="relative" style={{ height: 400, width: 350 }}>
          <motion.img
            className="hidden lg:block h-[350px] w-[300px] object-cover cursor-pointer rounded-tl-xl rounded-tr-xl"
            src={ben}
            alt="Profile"
            drag
            dragConstraints={{
              left: -50, // Allow dragging 50px to the left
              right: 50, // Allow dragging 50px to the right
              top: -50, // Allow dragging 50px upward
              bottom: 50, // Allow dragging 50px downward
            }}
            whileHover={{
              scale: 1.1,
            }}
            transition={{
              duration: 1,
            }}
          />
        </motion.div>

        <div className="flex items-center gap-10 md:gap-14 mt-10">
          <motion.a
            href="https://github.com/Benjamin-chidera"
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
          >
            {" "}
            <FaGithub size={20} />
          </motion.a>
          <motion.a
            href=" https://instagram.com/benjamin_c.dev?igshid=MzMyNGUyNmU2YQ=="
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
          >
            {" "}
            <FaInstagram size={20} />
          </motion.a>
          <motion.a
            href="https://twitter.com/BenjaminChide14"
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
          >
            {" "}
            <FaSquareXTwitter size={20} />
          </motion.a>
          <motion.a
            href="https://wa.me/09048401533"
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaWhatsapp size={20} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/benjamin-chidera"
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaLinkedin size={20} />
          </motion.a>
        </div>
      </motion.section>
    </main>
  );
};
