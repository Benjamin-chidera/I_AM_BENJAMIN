/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useExperienceStore } from "../../store/experience.store";
import { Briefcase, Calendar } from "lucide-react";
import { Card } from "../../components/UI";

const Experience = () => {
  const { experiences, getExperiences, isUpdating } = useExperienceStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true);
      await getExperiences();
      setLoading(false);
    };
    fetchExperiences();
  }, [getExperiences]);

  if (loading) {
    return (
      <main className="mx-4 lg:mx-8 pt-8">
        <Skeleton width={100} height={28} className="mb-8" />

        <div className="relative space-y-6">
          <div className="relative flex items-start">
            <div className="absolute left-0 h-8 w-8 md:h-12 md:w-12 flex items-center justify-center rounded-full bg-[#0c0c1d] border-2 border-cyan-500/50 z-10">
              <Skeleton circle={true} height={32} width={32} />
            </div>

            <div className="ml-12 md:ml-20 w-full">
              <Card className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-full">
                    <Skeleton width={160} height={20} className="mb-1.5" />
                    <Skeleton width={120} height={18} />
                  </div>
                  <Skeleton width={80} height={20} />
                </div>

                <Skeleton count={2} height={14} className="mb-3" />

                <div>
                  <Skeleton width={80} height={12} className="mb-1.5" />
                  <Skeleton count={1} height={14} />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-4 lg:mx-8 pt-8">
      <h2 className="my-4 font-bold text-xl text-white">Experience</h2>

      <div className="relative space-y-6 before:absolute before:inset-0 before:ml-4 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-cyan-500 before:via-purple-500 before:to-transparent md:before:ml-8">
        {experiences.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <Briefcase size={40} className="mx-auto mb-2 opacity-50" />
            <p>No experience added yet.</p>
          </div>
        ) : (
          experiences.map((exp) => (
            <div
              key={exp.id}
              className="relative flex items-start group"
              style={{
                opacity: isUpdating ? 0.6 : 1,
                transition: "opacity 0.3s ease",
              }}
            >
              <div className="absolute left-0 h-8 w-8 md:h-12 md:w-12 flex items-center justify-center rounded-full bg-[#0c0c1d] border-2 border-cyan-500/50 shadow-[0_0_8px_rgba(6,182,212,0.25)] z-10">
                <Briefcase className="h-4 w-4 md:h-6 md:w-6 text-cyan-400" />
              </div>

              <div className="ml-12 md:ml-20 w-full">
                <Card className="p-4 hover:border-cyan-500/30 transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">
                        {exp.role}
                      </h3>
                      <h4 className="text-sm text-cyan-400 font-medium">
                        {exp.company_name}
                      </h4>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="flex items-center text-[11px] font-mono text-gray-400 bg-white/5 px-2 py-0.5 rounded">
                        <Calendar size={12} className="mr-2" /> {exp.years}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400 mb-3 leading-relaxed">
                    {exp.description}
                  </p>

                  {exp.projects_done && (
                    <div>
                      <span className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold">
                        Key Projects
                      </span>
                      <p className="text-xs text-purple-300 mt-2 px-2 py-1 bg-purple-500/10 rounded border border-purple-500/20">
                        {exp.projects_done}
                      </p>
                    </div>
                  )}
                </Card>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
};

export default Experience;
