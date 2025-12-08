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
      <main className="mx-6 lg:mx-12 pt-10">
        <Skeleton width={200} height={32} className="mb-10" />

        <div className="relative space-y-8">
          {/* {Array.from({ length: 4 }).map((_, index) => ( */}
          <div className="relative flex items-start">
            <div className="absolute left-0 h-10 w-10 md:h-20 md:w-20 flex items-center justify-center rounded-full bg-[#0c0c1d] border-2 border-cyan-500/50 z-10">
              <Skeleton circle={true} height={40} width={40} />
            </div>

            <div className="ml-16 md:ml-32 w-full">
              <Card>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-full">
                    <Skeleton width={200} height={24} className="mb-2" />
                    <Skeleton width={150} height={20} />
                  </div>
                  <Skeleton width={100} height={24} />
                </div>

                <Skeleton count={3} height={16} className="mb-4" />

                <div>
                  <Skeleton width={100} height={14} className="mb-2" />
                  <Skeleton count={2} height={16} />
                </div>
              </Card>
            </div>
          </div>
          {/* ))} */}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-6 lg:mx-12 pt-10">
      <h2 className="my-5 font-bold text-2xl text-white">Experience</h2>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-cyan-500 before:via-purple-500 before:to-transparent md:before:ml-[2.5rem]">
        {experiences.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Briefcase size={48} className="mx-auto mb-3 opacity-50" />
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
              <div className="absolute left-0 h-10 w-10 md:h-20 md:w-20 flex items-center justify-center rounded-full bg-[#0c0c1d] border-2 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)] z-10">
                <Briefcase className="h-5 w-5 md:h-8 md:w-8 text-cyan-400" />
              </div>

              <div className="ml-16 md:ml-32 w-full">
                <Card className="hover:border-cyan-500/30 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {exp.role}
                      </h3>
                      <h4 className="text-lg text-cyan-400 font-medium">
                        {exp.company_name}
                      </h4>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="flex items-center text-xs font-mono text-gray-400 bg-white/5 px-2 py-1 rounded">
                        <Calendar size={12} className="mr-2" /> {exp.years}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {exp.description}
                  </p>

                  {exp.projects_done && (
                    <div>
                      <span className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
                        Key Projects
                      </span>
                      <p className="text-sm text-purple-300 mt-2 px-3 py-2 bg-purple-500/10 rounded border border-purple-500/20">
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
