/* eslint-disable react/no-unknown-property */

import { FaGithub } from "react-icons/fa";
import { ExternalLink, ImageIcon } from "lucide-react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useProjectsStore } from "../../store/projects.store";
import { useEffect, useState } from "react";

export const Projects = () => {
  const { projects, getProjects, isUpdating } = useProjectsStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      await getProjects();
      setLoading(false);
    };
    fetchProjects();
  }, [getProjects]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "In Development":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  if (loading) {
    return (
      <main className="lg:px-5" id="portfolio">
        <motion.section
          className="gap-2 px-6 pt-10"
          initial={{
            x: -200,
            opacity: 0,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
        >
          <h1 className="text-2xl font-semibold">PROJECTS</h1>
        </motion.section>

        <section className="flex flex-col gap-20 mt-10 mx-5">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {Array.from({ length: projects.length || 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-[#13132b] rounded-3xl overflow-hidden border border-white/5"
              >
                <Skeleton height={400} />
                <div className="p-6 space-y-4">
                  <Skeleton width={200} height={24} />
                  <Skeleton count={3} height={16} />
                  <div className="flex gap-2 pt-4">
                    <Skeleton width={80} height={20} />
                    <Skeleton width={80} height={20} />
                  </div>
                  <Skeleton height={40} className="mt-4" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="lg:px-5" id="portfolio">
      <motion.section
        className="gap-2 px-6 pt-10"
        initial={{
          x: -200,
          opacity: 0,
        }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
      >
        <h1 className="text-2xl font-semibold">PROJECTS</h1>
      </motion.section>

      <section className="flex flex-col gap-20 mt-10 mx-5">
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <ImageIcon size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No Projects Yet
            </h3>
            <p className="text-gray-400">
              Start by adding your first project to showcase your work.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="group relative bg-[#13132b] rounded-3xl overflow-hidden border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.15)] flex flex-col"
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
                {/* Image Section */}
                <div className="relative h-56 w-full overflow-hidden bg-black/40">
                  {project.project_image ? (
                    <img
                      src={project.project_image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 bg-gradient-to-br from-white/5 to-transparent">
                      <ImageIcon size={40} className="mb-2 opacity-50" />
                      <span className="text-xs uppercase tracking-widest font-medium">
                        No Preview
                      </span>
                    </div>
                  )}

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#13132b] via-[#13132b]/20 to-transparent opacity-80" />

                  {/* Status Badge */}
                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border backdrop-blur-md shadow-lg ${getStatusColor(
                      project.project_status
                    )}`}
                  >
                    {project.project_status}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col relative z-10">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors truncate">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 lg:h-[200px]">
                      {project.description}
                    </p>

                    {/* Tools/Tags */}
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tools_used &&
                        project.tools_used.split(",").map((tool, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-cyan-200 bg-cyan-900/20 border border-cyan-500/10 rounded-lg"
                          >
                            {tool.trim()}
                          </span>
                        ))}
                    </div>
                  </div>

                  {/* Footer Links */}
                  <div className="mt-auto pt-5 border-t border-white/5 flex items-center justify-between gap-4">
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-all group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isUpdating}
                    >
                      <FaGithub
                        size={16}
                        className="text-gray-400 group-hover/btn:text-white transition-colors"
                      />
                      <span>Code</span>
                    </a>
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500/10 text-sm font-medium text-cyan-400 hover:bg-cyan-500/20 hover:text-cyan-300 transition-all border border-cyan-500/20 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isUpdating}
                    >
                      <ExternalLink
                        size={16}
                        className="group-hover/btn:scale-110 transition-transform"
                      />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
