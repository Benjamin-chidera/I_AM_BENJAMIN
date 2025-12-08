import React, { useState, useEffect } from "react";
import { Button, Input, Modal } from "../../components/UI";
import {
  Plus,
  X,
  Layout,
  Server,
  Wrench,
  Sparkles,
  Image as ImageIcon,
} from "lucide-react";
import { useSkillsStore } from "../../store/skills.store";
import { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type CategoryId = "Frontend" | "Backend" | "AI/ML" | "Tools";
type SkillCategory = "frontend" | "backend" | "ai/ml" | "tools";

const catIdToType: Record<CategoryId, SkillCategory> = {
  Frontend: "frontend",
  Backend: "backend",
  "AI/ML": "ai/ml",
  Tools: "tools",
};
const typeToCatId: Record<SkillCategory, CategoryId> = {
  frontend: "Frontend",
  backend: "Backend",
  "ai/ml": "AI/ML",
  tools: "Tools",
};

export const AdminSkills: React.FC = () => {
  const {
    skills,
    getSkills,
    createSkill,
    updateSkill,
    deleteSkill,
    isUpdating,
    skills_name,
    setSkillsName,
    setSkillsType,
    setSkillsImg,
    setPreview,
    preview,
    clearForm,
  } = useSkillsStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState("");
  const [targetCategory, setTargetCategory] = useState<CategoryId>("Frontend");
  const [loading, setLoading] = useState(true);

  const categories = [
    {
      id: "Frontend",
      label: "Frontend Development",
      icon: <Layout className="w-5 h-5" />,
      desc: "UI/UX, Web & Mobile",
      color: "text-cyan-400",
      borderColor: "border-cyan-500/20",
      bgGradient: "from-cyan-500/10 to-blue-500/5",
    },
    {
      id: "Backend",
      label: "Backend Infrastructure",
      icon: <Server className="w-5 h-5" />,
      desc: "Server, Database, API",
      color: "text-emerald-400",
      borderColor: "border-emerald-500/20",
      bgGradient: "from-emerald-500/10 to-green-500/5",
    },
    {
      id: "AI/ML",
      label: "Artificial Intelligence",
      icon: <Sparkles className="w-5 h-5" />,
      desc: "Models, Agents, NLP",
      color: "text-violet-400",
      borderColor: "border-violet-500/20",
      bgGradient: "from-violet-500/10 to-purple-500/5",
    },
    {
      id: "Tools",
      label: "DevOps & Tools",
      icon: <Wrench className="w-5 h-5" />,
      desc: "CI/CD, Version Control",
      color: "text-amber-400",
      borderColor: "border-amber-500/20",
      bgGradient: "from-amber-500/10 to-orange-500/5",
    },
  ] as const;

  const handleOpenAdd = (category: CategoryId) => {
    setTargetCategory(category);
    setNewSkillName("");
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setSkillsImg(file);
  };

  const handleAddSkill = async () => {
    if (!newSkillName.trim()) return;
    setSkillsName(newSkillName.trim());
    setSkillsType(catIdToType[targetCategory]);
    await createSkill();
    setNewSkillName("");
    setPreview("");
    setSkillsImg(null);
    setIsModalOpen(false);
    clearForm();
  };

  const handleDeleteSkill = async (id: string) => {
    if (confirm("Remove this skill?")) {
      await deleteSkill(id);
      clearForm();
    }
  };

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      await getSkills();
      setLoading(false);
    };
    fetchSkills();
  }, [getSkills]);

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton width={250} height={32} />
          <Skeleton width={350} height={16} className="mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-[#0f0f1a] overflow-hidden flex flex-col h-full"
            >
              <div className="p-6 flex items-start justify-between border-b border-white/5">
                <div className="flex items-center gap-4 w-full">
                  <Skeleton circle={true} height={50} width={50} />
                  <div className="flex-1">
                    <Skeleton width={150} height={20} className="mb-2" />
                    <Skeleton width={120} height={14} />
                  </div>
                </div>
                <Skeleton width={40} height={40} />
              </div>

              <div className="p-6 flex-1">
                <div className="flex flex-wrap gap-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} width={120} height={36} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Toaster position="top-right" />

      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Skills & Technologies
        </h2>
        <p className="text-gray-400 mt-1">
          Manage your technical expertise across different domains.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className={`relative rounded-3xl border ${cat.borderColor} bg-[#0f0f1a] overflow-hidden flex flex-col h-full transition-all hover:shadow-[0_0_30px_-5px_rgba(0,0,0,0.3)] group`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${cat.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
            />

            <div className="relative p-6 flex items-start justify-between border-b border-white/5">
              <div className="flex items-center gap-4">
                <div
                  className={`p-3 rounded-2xl bg-white/5 border border-white/5 ${cat.color}`}
                >
                  {cat.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">{cat.label}</h3>
                  <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">
                    {cat.desc}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleOpenAdd(cat.id)}
                disabled={isUpdating}
                className={`p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Plus size={18} />
              </button>
            </div>

            <div className="relative p-6 flex-1">
              <div className="flex flex-wrap gap-3">
                {skills
                  .filter(
                    (s) =>
                      typeToCatId[s.skills_type as SkillCategory] === cat.id
                  )
                  .map((skill) => (
                    <div
                      key={skill.id}
                      className="group/skill relative pl-3 pr-9 py-2 rounded-xl bg-black/40 border border-white/10 hover:border-white/20 transition-all flex items-center gap-3"
                      title={skill.skills_name}
                    >
                      <div className="w-9 h-9 rounded-lg border border-white/10 overflow-hidden bg-white/5 flex items-center justify-center">
                        {skill.skills_img ? (
                          <img
                            src={skill.skills_img}
                            alt={skill.skills_name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <ImageIcon size={18} className="text-gray-500" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-gray-300 group-hover/skill:text-white">
                        {skill.skills_name}
                      </span>
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        disabled={isUpdating}
                        className="absolute right-2 p-1 rounded-md text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}

                {skills.filter(
                  (s) => typeToCatId[s.skills_type as SkillCategory] === cat.id
                ).length === 0 && (
                  <div className="w-full py-8 text-center border-2 border-dashed border-white/5 rounded-xl">
                    <p className="text-sm text-gray-600">No skills added yet</p>
                    <button
                      onClick={() => handleOpenAdd(cat.id)}
                      disabled={isUpdating}
                      className="text-xs text-cyan-500 hover:underline mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add one +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          clearForm();
          setNewSkillName("");
          setPreview("");
          setSkillsImg(null);
        }}
        title={`Add to ${targetCategory}`}
      >
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`text-sm font-bold ${
                  categories.find((c) => c.id === targetCategory)?.color
                }`}
              >
                {targetCategory}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Adding a new skill to the {targetCategory} category. This will
              appear as a tag in your portfolio.
            </p>
          </div>

          <Input
            label="Skill Name"
            placeholder="e.g. GraphQL, Figma, AWS Lambda"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            disabled={isUpdating}
            autoFocus
          />

          {/* Image upload */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Skill Image (optional)
            </label>
            <div className="relative border-2 border-dashed border-white/10 rounded-xl p-4 text-center hover:border-cyan-500/50 transition-colors">
              {preview ? (
                <div className="relative inline-block">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg mx-auto"
                  />
                  <button
                    onClick={() => {
                      setPreview("");
                      setSkillsImg(null);
                    }}
                    disabled={isUpdating}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs disabled:opacity-50"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center py-4 text-gray-500">
                  <ImageIcon size={22} className="mb-2" />
                  <p className="text-sm">Click to upload image</p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isUpdating}
                className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="secondary"
              onClick={() => {
                setIsModalOpen(false);
                clearForm();
                setNewSkillName("");
                setPreview("");
                setSkillsImg(null);
              }}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddSkill}
              disabled={isUpdating || !newSkillName.trim()}
            >
              {isUpdating ? "Saving..." : "Add Skill"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
