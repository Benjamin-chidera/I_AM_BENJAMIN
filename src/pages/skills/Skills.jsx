import { motion } from "framer-motion";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect } from "react";
import { useSkillsStore } from "../../store/skills.store";

export const Skills = () => {
  const { skills, getSkills, isUpdating } = useSkillsStore();

  useEffect(() => {
    getSkills();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SkillGrid = ({ skillsData }) => (
     <section className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-6 md:gap-8 place-items-center ">
      {skillsData.map((sk) => (
        <div key={sk.id} className="relative group flex flex-col items-center">
          {/* Logo */}
          <motion.img
            src={sk.skills_img}
            alt={sk.skills_name}
            className="w-30 h-30 md:w-40 md:h-40 object-contain transition-transform"
            initial={{ scale: 0.9 }}
            whileHover={{ scale: 1.08 }}
          />
          {/* Label on hover */}
          <span className="absolute bottom-[-20px] text-xs md:text-sm font-medium text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {sk.skills_name}
          </span>
        </div>
      ))}
    </section>
  );



  const SkeletonLoader = ({ count }) => (
    <section className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-6 md:gap-8 place-items-center w-full max-w-6xl mx-auto">
      {Array.from({ length: count > 0 ? count : 4 }).map((_, i) => (
        <div key={i} className="relative group flex flex-col items-center">
          <div className="w-20 h-20 md:w-24 md:h-24">
            <Skeleton  baseColor="#1a1a3a" highlightColor="#2a2a5a" circle={true} height="100%" className="w-full h-full block" />
          </div>
        </div>
      ))}
    </section>
  );

  const skillTypes = ["frontend", "backend", "ai/ml", "tools"];

  return (
    <main id="skills" className="my-10">
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
        {skillTypes.map((type) => (
          <div key={type}>
            <h2 className="text-xl font-semibold text-center mb-4 capitalize">
              {type}
            </h2>
            {!isUpdating && skills.length > 0 ? (
              <SkillGrid
                skillsData={skills.filter((sk) => sk.skills_type === type)}
              />
            ) : (
              <SkeletonLoader count={skills.filter((sk) => sk.skills_type === type).length} />
            )}
          </div>
        ))}
      </div>
    </main>
  );
};
