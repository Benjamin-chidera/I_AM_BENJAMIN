import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Input,
  Modal,
  Badge,
  Textarea,
} from "../../components/UI";
import { useProjectsStore } from "../../store/projects.store";
import { Plus, Github, Globe, Edit, Trash, Folder, Upload } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const AdminProjects: React.FC = () => {
  const {
    projects,
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    isUpdating,
    title,
    setTitle,
    description,
    setDescription,
    github_url,
    setGithubUrl,
    live_url,
    setLiveUrl,
    project_status,
    setProjectStatus,
    tools_used,
    setToolsUsed,
    project_image,
    setProjectImage,
    preview,
    setPreview,
    currentProjectId,
    setCurrentProjectId,
    clearForm,
  } = useProjectsStore();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [loading, setLoading] = useState(true);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setPreview(url);
      setProjectImage(file);
    }
  };

  const handleSaveProject = async () => {
    console.log(currentProjectId);

    if (currentProjectId) {
      await updateProject();
    } else {
      await createProject();
    }
    setIsModalOpen(false);
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(id);
    }
  };

  const openEditModal = (project: any) => {
    setCurrentProjectId(project.id);
    setTitle(project.title);
    setDescription(project.description);
    setGithubUrl(project.github_url);
    setLiveUrl(project.live_url);
    setProjectStatus(project.project_status);
    setToolsUsed(project.tools_used || "");
    setPreview(project.project_image);
    setProjectImage(project.project_image);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    clearForm();
    setIsModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "green";
      case "In Development":
        return "yellow";
      case "Archived":
        return "gray";
      default:
        return "cyan";
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      await getProjects();
      setLoading(false);
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div>
        {/* <div className="flex justify-between items-center mb-8">
          <Skeleton width={150} height={28} />
          <Skeleton width={130} height={40} />
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* {Array.from({ length: 6 }).map((_, index) => ( */}
          <Card className="flex flex-col h-full">
            <div className="mb-4">
              <Skeleton height={160} className="mb-4 rounded-lg" />
              <div className="flex items-center justify-between mb-2">
                <Skeleton circle={true} height={48} width={48} />
                <Skeleton width={80} height={24} />
              </div>
              <Skeleton width="80%" height={24} className="mb-2" />
              <Skeleton count={2} height={16} className="mb-4" />
              <div className="flex flex-wrap gap-2 mb-6">
                <Skeleton width={60} height={24} />
                <Skeleton width={70} height={24} />
                <Skeleton width={80} height={24} />
              </div>
            </div>
            <div className="mt-auto flex gap-3 pt-4 border-t border-white/5">
              <Skeleton height={36} className="flex-1" />
              <Skeleton height={36} className="flex-1" />
            </div>
          </Card>
          {/* ))} */}
        </div>
      </div>
    );
  }

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-white">My Projects</h2>
        <Button onClick={openCreateModal}>
          <Plus size={18} className="mr-2" /> Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card className="text-center py-12">
          <Folder size={48} className="mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            No Projects Yet
          </h3>
          <p className="text-gray-400 mb-6">
            Start by creating your first project to showcase your work.
          </p>
          <Button onClick={openCreateModal}>
            <Plus size={18} className="mr-2" /> Create First Project
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col h-full group hover:bg-white/[0.03] transition-colors relative"
            >
              <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                  onClick={() => openEditModal(project)}
                  className="p-2 bg-black/50 rounded-lg text-cyan-400 hover:bg-cyan-500 hover:text-white transition-all"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDeleteProject(project.id)}
                  className="p-2 bg-black/50 rounded-lg text-red-400 hover:bg-red-500 hover:text-white transition-all"
                >
                  <Trash size={16} />
                </button>
              </div>

              <div className="mb-4">
                {project.project_image && (
                  <div className="w-full h-40 rounded-lg overflow-hidden mb-4 bg-black/20">
                    <img
                      src={project.project_image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between mb-2">
                  <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
                    <Folder size={24} />
                  </div>
                  <Badge color={getStatusColor(project.project_status) as any}>
                    {project.project_status}
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tools_used &&
                    project.tools_used.split(",").map((tool, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/5 rounded-md text-xs text-gray-300 border border-white/5"
                      >
                        {tool.trim()}
                      </span>
                    ))}
                </div>
              </div>

              <div className="mt-auto flex gap-3 pt-4 border-t border-white/5">
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-sm text-gray-300 transition-colors"
                >
                  <Github size={16} /> Code
                </a>
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-sm text-cyan-400 transition-colors"
                >
                  <Globe size={16} /> Live
                </a>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          clearForm();
        }}
        title={currentProjectId ? "Edit Project" : "New Project"}
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Image Upload */}
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Project Image
            </label>
            <div className="relative border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-cyan-500/50 transition-colors">
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setPreview("");
                      setProjectImage("");
                    }}
                    className="absolute top-2 right-2 bg-red-500/80 text-white px-2 py-1 rounded text-xs"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload size={32} className="text-gray-500 mb-2" />
                  <p className="text-sm text-gray-400">
                    Click to upload project image
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <Input
            label="Project Title"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isUpdating}
          />
          <Textarea
            label="Description"
            rows={3}
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isUpdating}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="GitHub URL"
              value={github_url || ""}
              onChange={(e) => setGithubUrl(e.target.value)}
              disabled={isUpdating}
            />
            <Input
              label="Live URL"
              value={live_url || ""}
              onChange={(e) => setLiveUrl(e.target.value)}
              disabled={isUpdating}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">
              Status
            </label>
            <select
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-2.5 text-gray-200 focus:outline-none focus:border-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              value={project_status || "In Development"}
              onChange={(e) => setProjectStatus(e.target.value)}
              disabled={isUpdating}
            >
              <option value="In Development">In Development</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <Input
            label="Tools Used (comma separated)"
            value={tools_used || ""}
            onChange={(e) => setToolsUsed(e.target.value)}
            placeholder="React, Node.js, Tailwind"
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
            <Button onClick={handleSaveProject} disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save Project"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
