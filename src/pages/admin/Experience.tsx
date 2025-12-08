import React, { useEffect, useState } from "react";
import { Card, Button, Input, Modal, Textarea } from "../../components/UI";
import { Plus, Briefcase, Calendar, Trash2, Edit2 } from "lucide-react";
import { useExperienceStore } from "../../store/experience.store";
import { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const AdminExperience: React.FC = () => {
  const {
    experiences,
    getExperiences,
    createExperience,
    updateExperience,
    deleteExperience,
    isUpdating,
    role,
    setRole,
    company_name,
    setCompanyName,
    years,
    setYears,
    description,
    setDescription,
    projects_done,
    setProjectsDone,
    currentExperienceId,
    setCurrentExperienceId,
    clearForm,
  } = useExperienceStore();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);

  const handleSaveExperience = async () => {
    if (currentExperienceId) {
      await updateExperience();
    } else {
      await createExperience();
    }
    setIsModalOpen(false);
  };

  const handleDeleteExperience = (id: string) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      deleteExperience(id);
    }
  };

  const openEditModal = (exp: any) => {
    setCurrentExperienceId(exp.id);
    setRole(exp.role);
    setCompanyName(exp.company_name);
    setYears(exp.years);
    setDescription(exp.description);
    setProjectsDone(exp.projects_done || "");
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    clearForm();
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true);
      await getExperiences();
      setLoading(false);
    };
    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <Skeleton width={150} height={28} />
          <Skeleton width={180} height={40} />
        </div>

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
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Toaster position="top-right" />
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl font-semibold text-white">Work History</h2>
        <Button onClick={openCreateModal} disabled={isUpdating}>
          <Plus size={18} className="mr-2" /> Add Experience
        </Button>
      </div>

      <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-cyan-500 before:via-purple-500 before:to-transparent md:before:ml-[2.5rem]">
        {experiences.length === 0 ? (
          <div className="text-center py-12">
            <Briefcase size={48} className="mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              No Experience Yet
            </h3>
            <p className="text-gray-400 mb-6">
              Start by adding your first work experience.
            </p>
            <Button onClick={openCreateModal}>
              <Plus size={18} className="mr-2" /> Add First Experience
            </Button>
          </div>
        ) : (
          experiences.map((exp) => (
            <div key={exp.id} className="relative flex items-start group">
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
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => openEditModal(exp)}
                          className="p-1.5 hover:bg-white/10 rounded text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isUpdating}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteExperience(exp.id)}
                          className="p-1.5 hover:bg-white/10 rounded text-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={isUpdating}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          clearForm();
        }}
        title={currentExperienceId ? "Edit Experience" : "Add Experience"}
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          <Input
            label="Job Role"
            value={role || ""}
            onChange={(e) => setRole(e.target.value)}
            disabled={isUpdating}
          />
          <Input
            label="Company"
            value={company_name || ""}
            onChange={(e) => setCompanyName(e.target.value)}
            disabled={isUpdating}
          />
          <Input
            label="Years (e.g., 2020 - 2022)"
            value={years || ""}
            onChange={(e) => setYears(e.target.value)}
            disabled={isUpdating}
          />
          <Textarea
            label="Description"
            rows={3}
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isUpdating}
          />
          <Textarea
            label="Key Projects Done"
            rows={2}
            value={projects_done || ""}
            onChange={(e) => setProjectsDone(e.target.value)}
            placeholder="e.g., Built API, Created UI Components, Database Optimization"
            disabled={isUpdating}
          />
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                clearForm();
              }}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveExperience} disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
