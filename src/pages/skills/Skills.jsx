

import { motion } from "framer-motion";
import PropTypes from "prop-types";

// Frontend
// import html from "../../assets/frontend/html.png";
// import css from "../../assets/frontend/css.png";
import js from "../../assets/frontend/js.png";
import tw from "../../assets/frontend/tw.png";
import re from "../../assets/frontend/re.png";

import nextjs from "../../assets/frontend/nextjs.png";
import type from "../../assets/frontend/type.png";
import native from "../../assets/frontend/native.png";
import redux from "../../assets/frontend/redux.svg";
import zustand from "../../assets/frontend/zustand.jpg";
import framer from "../../assets/frontend/framer-motion.png";
import shadcn from "../../assets/frontend/shadcn.png";

// Backend
import nj from "../../assets/backend/nj.png";
import ex from "../../assets/backend/ex.jpeg";
import mo from "../../assets/backend/mo.webp";
import mysql from "../../assets/backend/mysql.png";
import fastapi from "../../assets/backend/fastapi.png";
import redis from "../../assets/backend/redis.svg";

// AI
import python from "../../assets/ai/python.svg";
import langchain from "../../assets/ai/langchain.avif";
import langgraph from "../../assets/ai/langgraph.avif";
import huggingface from "../../assets/ai/huggingface.svg";
import ollama from "../../assets/ai/ollama.png";
// import ocr from "../../assets/ai/ocr.png";

// Tools
import git from "../../assets/tools/git.svg";
import github from "../../assets/tools/github.png";
import postman from "../../assets/tools/postman.svg";
import vite from "../../assets/tools/vite.svg";
import jest from "../../assets/tools/jest.svg";

// Utility function to render skills
const SkillGrid = ({ skills }) => (
  <section className="grid grid-cols-3 md:grid-cols-6 gap-5 place-items-center lg:w-[800px] mx-auto px-6">
    {skills.map(({ src, alt }, index) => (
      <div key={index} className="relative group flex flex-col items-center">
        {/* Logo */}
        <motion.img
          src={src}
          alt={alt}
          className="w-[120px] h-[120px] object-contain transition-transform"
          initial={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
        />
        {/* Label on hover */}
        <span className="absolute bottom-[-25px] text-sm font-medium text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {alt}
        </span>
      </div>
    ))}
  </section>
);
SkillGrid.propTypes = {
  skills: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
};


export const Skills = () => {
  const frontendSkills = [
    // { src: html, alt: "HTML" },
    // { src: css, alt: "CSS" },
    { src: js, alt: "JavaScript" },
    { src: tw, alt: "Tailwind CSS" },
    { src: re, alt: "React.js" },
    { src: nextjs, alt: "Next.js" },
    { src: type, alt: "TypeScript" },
    { src: native, alt: "React Native" },
    { src: redux, alt: "Redux" },
    { src: zustand, alt: "Zustand" },
    { src: framer, alt: "Framer Motion" },
    { src: shadcn, alt: "ShadCN UI" },
  ];

  const backendSkills = [
    { src: nj, alt: "Node.js" },
    { src: ex, alt: "Express.js" },
    { src: mo, alt: "MongoDB" },
    { src: mysql, alt: "MySQL" },
    { src: fastapi, alt: "FastAPI" },
    { src: redis, alt: "Redis" },
  ];

  const aiSkills = [
    { src: python, alt: "Python" },
    { src: langchain, alt: "LangChain" },
    { src: langgraph, alt: "LangGraph" },
    { src: huggingface, alt: "Hugging Face" },
    { src: ollama, alt: "Ollama" },
  ];

  const toolSkills = [
    { src: git, alt: "Git" },
    { src: github, alt: "GitHub" },
    { src: postman, alt: "Postman" },
    { src: vite, alt: "Vite" },
    { src: jest, alt: "Jest" },
  ];

  return (
    <main id="skills" className="my-12">
      {/* Section Header */}
      <motion.section
        className="flex justify-center items-center gap-2 mb-10"
        initial={{ x: -200, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
      >
        <div className="h-1 w-10 md:w-20 bg-slate-300"></div>
        <h1 className="text-2xl md:text-4xl font-semibold">SKILLS</h1>
        <div className="h-1 w-10 md:w-20 bg-slate-300"></div>
      </motion.section>

      {/* Categories */}
      <div className="space-y-12">
        <div>
          <h2 className="text-xl font-semibold text-center mb-4">Frontend</h2>
          <SkillGrid skills={frontendSkills} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-center mb-4">Backend</h2>
          <SkillGrid skills={backendSkills} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-center mb-4">AI / ML</h2>
          <SkillGrid skills={aiSkills} />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-center mb-4">Tools</h2>
          <SkillGrid skills={toolSkills} />
        </div>
      </div>
    </main>
  );
};
