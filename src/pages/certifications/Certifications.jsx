import { useMemo, useEffect } from "react";
import { Award, ExternalLink, Calendar, BadgeCheck } from "lucide-react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useCertificationsStore } from "../../store/certifications.store";

const Certifications = () => {
  const { certifications, getCertifications, isUpdating } =
    useCertificationsStore();

  useEffect(() => {
    getCertifications();
  }, [getCertifications]);

  // Group certificates by year
  const groupedCerts = useMemo(() => {
    const groups = {};
    certifications.forEach((cert) => {
      const year = cert.year_issued || "Unknown";
      if (!groups[year]) groups[year] = [];
      groups[year].push(cert);
    });
    // Sort years descending
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
  }, [certifications]);

  const SkeletonLoader = () => (
    <div className="space-y-8">
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <Skeleton width={80} height={32} borderRadius={20} />
          <Skeleton height={2} className="flex-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pl-2 md:pl-4 border-l-2 border-white/5 ml-4 md:ml-0">
          <div className="bg-[#13132b] rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton circle width={40} height={40} />
              <div className="flex-1 space-y-2">
                <Skeleton width="80%" height={16} />
                <Skeleton width="60%" height={12} />
              </div>
            </div>
            <Skeleton width="100%" height={40} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto mt-10 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Award className="text-amber-400" /> Certifications & Licenses
          </h2>
          <p className="text-gray-400 mt-1">
            Showcase your professional qualifications and achievements.
          </p>
        </div>
      </div>

      <div className="relative">
        {!isUpdating && certifications.length === 0 ? (
          <SkeletonLoader />
        ) : groupedCerts.length === 0 ? (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
            <BadgeCheck size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-400">
              No certifications yet
            </h3>
          </div>
        ) : (
          groupedCerts.map(([year, yearCerts]) => (
            <div key={year} className="mb-12 relative">
              {/* Year Marker */}
              <div className="flex items-center gap-4 mb-6 sticky top-0 bg-[#0c0c1d]/95 backdrop-blur-sm z-10 py-2">
                <div className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold text-sm shadow-[0_0_10px_rgba(245,158,11,0.15)] flex items-center">
                  <Calendar size={14} className="mr-2" />
                  {year}
                </div>
                <div className="h-px bg-gradient-to-r from-white/10 to-transparent flex-1" />
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pl-2 md:pl-4 border-l-2 border-white/5 ml-4 md:ml-0">
                {yearCerts.map((cert) => (
                  <div
                    key={cert.id}
                    className="group relative bg-[#13132b] border border-white/5 rounded-2xl p-5 hover:border-amber-500/30 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(245,158,11,0.1)] flex flex-col"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/5 flex items-center justify-center text-gray-300 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-300">
                          <Award size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white leading-tight group-hover:text-amber-100 transition-colors">
                            {cert.cert_name}
                          </h3>
                          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mt-1">
                            {cert.issued_organization}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                      {cert.cert_url ? (
                        <a
                          href={cert.cert_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-medium text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                        >
                          View Credential <ExternalLink size={12} />
                        </a>
                      ) : (
                        <span className="text-xs text-gray-600 italic">
                          No link provided
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Certifications;
