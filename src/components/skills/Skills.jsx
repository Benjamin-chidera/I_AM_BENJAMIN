import React from "react";
import html from "../../assets/html.png";
import css from "../../assets/css.png";
import js from "../../assets/js.png";
import bt from "../../assets/bt.png";
import tw from "../../assets/tw.png";
import re from "../../assets/re.png";
import sc from "../../assets/sc.png";
import su from "../../assets/su.png";
import nj from "../../assets/nj.png";
import mo from "../../assets/mo.webp";
import ex from "../../assets/ex.jpeg";
import nextjs from "../../assets/nextjs.png";
import type from "../../assets/type.png";
import { motion } from "framer-motion";

export const Skills = () => {
  return (
    <main id="skills" className="pt-10">
      <motion.section
        className="flex justify-center items-center gap-2 my-10 px-7"
        initial={{
          x: -200,
          opacity: 0,
        }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
      >
        <div className="h-1 w-10 md:w-20 bg-slate-300"></div>
        <h1 className="text-2xl md:text-4xl font-semibold">SKILLS</h1>
        <div className="h-1 w-10 md:w-20 bg-slate-300"></div>
      </motion.section>

      <section className="grid grid-cols-3 md:grid-cols-6 gap-5 place-items-center lg:w-[800px] mx-auto">
        <motion.img
          src={html}
          alt=""
          className="w-[75px] h-[70px]"
          initial={{
            scale: 1.0,
          }}
          whileHover={{
            scale: 1.1,
          }}
        />
        <motion.img
          src={css}
          alt=""
          className="w-[75px] h-[70px]"
          initial={{
            scale: 0.8,
          }}
          whileHover={{
            scale: 1.1,
          }}
        />
        <motion.img
          src={js}
          alt=""
          className="w-[75px] h-[70px]"
          initial={{
            scale: 0.8,
          }}
          whileHover={{
            scale: 1.1,
          }}
        />
        <motion.img
          src={bt}
          alt=""
          className="w-[75px] h-[70px]"
          initial={{
            scale: 0.8,
          }}
          whileHover={{
            scale: 1.1,
          }}
        />
        <motion.img
          src={tw}
          alt=""
          className="w-[75px] h-[70px]"
          initial={{
            scale: 0.8,
          }}
          whileHover={{
            scale: 1.1,
          }}
        />
        <motion.img
          src={re}
          alt=""
          className="w-[75px] h-[70px]"
          initial={{
            scale: 0.8,
          }}
          whileHover={{
            scale: 1.1,
          }}
        />
        <motion.img
          src={sc}
          alt=""
          className="w-[75px] h-[70px]"
          initial={{
            scale: 0.8,
          }}
          whileHover={{
            scale: 1.1,
          }}
        />
        <motion.img
          src={su}
          alt=""
          className="w-[75px] h-[70px]"
          initial={{
            scale: 0.8,
          }}
          whileHover={{
            scale: 1.1,
          }}
        />
        <motion.img
          src={nj}
          alt=""
          className="w-[75px] h-[70px]"
          initial={{
            scale: 0.8,
          }}
          whileHover={{
            scale: 1.1,
          }}
        />
        <motion.img
          src={mo}
          alt=""
          className="w-[75px] h-[70px]"
          initial={{
            scale: 0.8,
          }}
          whileHover={{
            scale: 1.1,
          }}
        />
        <motion.img
          src={ex}
          alt=""
          className="w-[75px] h-[70px]"
          initial={{
            scale: 0.8,
          }}
          whileHover={{
            scale: 1.1,
          }}
        />
        <motion.img
          src={nextjs}
          alt=""
          className="w-[75px] h-[70px]"
          initial={{
            scale: 0.8,
          }}
          whileHover={{
            scale: 1.1,
          }}
        />
        <motion.img
          src={type}
          alt=""
          className="w-[75px] h-[70px]"
          initial={{
            scale: 0.8,
          }}
          whileHover={{
            scale: 1.1,
          }}
        />
      </section>
    </main>
  );
};
