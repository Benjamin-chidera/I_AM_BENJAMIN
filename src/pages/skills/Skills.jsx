import { motion } from "framer-motion";
import PropTypes from "prop-types";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useEffect } from "react";
import { useSkillsStore } from "../../store/skills.store";

export const Skills = () => {
  const { skills, getSkills, isUpdating } = useSkillsStore();

  useEffect(() => {
    getSkills();
    console.log("Skills from store:", skills);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const SkillGrid = ({ skillsData }) => (
    <section className="grid grid-cols-3 md:grid-cols-6 gap-5 place-items-center lg:w-[800px] mx-auto px-6">
      {skillsData.map((sk) => (
        <div key={sk.id} className="relative group flex flex-col items-center">
          {/* Logo */}
          <motion.img
            src={sk.skills_img}
            alt={sk.skills_name}
            className="w-[120px] h-[120px] object-contain transition-transform"
            initial={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
          />
          {/* Label on hover */}
          <span className="absolute bottom-[-25px] text-sm font-medium text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {sk.skills_name}
          </span>
        </div>
      ))}
    </section>
  );

  SkillGrid.propTypes = {
    skillsData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        skills_img: PropTypes.string.isRequired,
        skills_name: PropTypes.string.isRequired,
        skills_type: PropTypes.string.isRequired,
      })
    ).isRequired,
  };

  const SkeletonLoader = () => (
    <section className="grid grid-cols-3 md:grid-cols-6 gap-5 place-items-center lg:w-[800px] mx-auto px-6">
      {/* {Array(6)
        .fill(null)
        .map((_, i) => ( */}
      <div className="flex flex-col items-center gap-2">
        <Skeleton circle width={100} height={100} />
        {/* <Skeleton width={80} height={16} /> */}
      </div>
      {/* ))} */}
    </section>
  );

  const skillTypes = ["frontend", "backend", "ai/ml", "tools"];

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
              <SkeletonLoader />
            )}
          </div>
        ))}
      </div>
    </main>
  );
};
