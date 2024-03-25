import React from "react";
import two from "../../assets/two.png";
import { motion } from "framer-motion";

export const About = () => {
  return (
    <main className="flex flex-col gap-1" id="about">
      <motion.section
        className="flex justify-center items-center gap-2 my-10"
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
        <h1 className="text-2xl md:text-4xl font-semibold">ABOUT ME</h1>
        <div className="h-1 w-10 md:w-20 bg-slate-300"></div>
      </motion.section>

      <motion.section
        className="flex justify-center  items-center"
        initial={{
          opacity: 0,
        }}
        whileInView={{
          opacity: 1,
        }}
        transition={{
          duration: 0.7,
        }}
      >
        <div className="max-w-2xl mx-5">
          <h1 className=" text-lg">
            I am a dedicated problem solver and solution-oriented Full Stack Web
            Developer with one year of hands-on experience, proficient in both
            Front-end and Back-end technologies. Since beginning my journey as a
            Front-end Developer in 2023, I have continued to grow and evolve,
            taking on new challenges and learning the latest technologies along
            the way. I specialize in building robust and scalable web
            applications using modern technologies such as React, Tailwind CSS,
            Bootstrap, MongoDB, Node.js, Express.js, and Supabase. My skill set
            extends beyond coding to encompass effective communication,
            collaboration, and thorough technical documentation.
          </h1>
        </div>
      </motion.section>
    </main>
  );
};
