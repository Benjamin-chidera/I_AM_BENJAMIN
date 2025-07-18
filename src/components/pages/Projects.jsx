"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Input,
  Textarea,
  Chip,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    image: "",
    imageFile: null, // To store the selected file
    githubUrl: "",
    liveUrl: "",
    techStack: "",
  });

  const [editingProject, setEditingProject] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProjectForm((prev) => ({
          ...prev,
          image: reader.result, // Base64 string for preview
          imageFile: file, // Store the file for upload
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProject = () => {
    const newProject = {
      id: Date.now(),
      ...projectForm,
      techStack: projectForm.techStack.split(",").map((tech) => tech.trim()),
    };
    setProjects([...projects, newProject]);
    setProjectForm({
      title: "",
      description: "",
      image: "",
      imageFile: null,
      githubUrl: "",
      liveUrl: "",
      techStack: "",
    });
  };

  const handleEditProject = (project) => {
    setEditingProject(project);
    setProjectForm({
      ...project,
      techStack: project.techStack.join(", "),
    });
  };

  const handleUpdateProject = () => {
    setProjects(
      projects.map((p) =>
        p.id === editingProject.id
          ? {
              ...projectForm,
              id: editingProject.id,
              techStack: projectForm.techStack
                .split(",")
                .map((tech) => tech.trim()),
            }
          : p
      )
    );
    setEditingProject(null);
    setProjectForm({
      title: "",
      description: "",
      image: "",
      imageFile: null,
      githubUrl: "",
      liveUrl: "",
      techStack: "",
    });
  };

  const handleDeleteProject = (id) => {
    setProjects(projects.filter((p) => p.id !== id));
    setDeleteDialog({ open: false, id: null });
  };

  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2" color="white" className="mb-2">
          Projects
        </Typography>
        <Typography color="gray" className="text-gray-400">
          Manage your portfolio projects
        </Typography>
      </div>

      <Card className="bg-gray-800">
        <CardHeader>
          <Typography variant="h5" color="white">
            Add New Project
          </Typography>
          <Typography color="gray" className="text-gray-400">
            Add a new project to your portfolio
          </Typography>
        </CardHeader>
        <CardBody className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Typography color="white" className="mb-2">
                Title
              </Typography>
              <Input
                value={projectForm.title}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, title: e.target.value })
                }
                className="!border-gray-600 !bg-gray-700 text-white"
                labelProps={{ className: "text-white" }}
              />
            </div>
            <div>
              <Typography color="white" className="mb-2">
                Image URL
              </Typography>
              <Input
                value={projectForm.image}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, image: e.target.value })
                }
                className="!border-gray-600 !bg-gray-700 text-white"
                labelProps={{ className: "text-white" }}
              />
            </div>
          </div>
          <div>
            <Typography color="white" className="mb-2">
              Description
            </Typography>
            <Textarea
              value={projectForm.description}
              onChange={(e) =>
                setProjectForm({ ...projectForm, description: e.target.value })
              }
              className="!border-gray-600 !bg-gray-700 text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Typography color="white" className="mb-2">
                GitHub URL
              </Typography>
              <Input
                value={projectForm.githubUrl}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, githubUrl: e.target.value })
                }
                className="!border-gray-600 !bg-gray-700 text-white"
                labelProps={{ className: "text-white" }}
              />
            </div>
            <div>
              <Typography color="white" className="mb-2">
                Live URL
              </Typography>
              <Input
                value={projectForm.liveUrl}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, liveUrl: e.target.value })
                }
                className="!border-gray-600 !bg-gray-700 text-white"
                labelProps={{ className: "text-white" }}
              />
            </div>
          </div>
          <div>
            <Typography color="white" className="mb-2">
              Tech Stack (comma separated)
            </Typography>
            <Input
              value={projectForm.techStack}
              onChange={(e) =>
                setProjectForm({ ...projectForm, techStack: e.target.value })
              }
              placeholder="React, Node.js, MongoDB"
              className="!border-gray-600 !bg-gray-700 text-white"
              labelProps={{ className: "text-white" }}
            />
          </div>
          <div>
            <label className="text-gray-400">Upload Project Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            {projectForm.image && (
              <div className="mt-4">
                <p className="text-gray-400">Image Preview:</p>
                <img
                  src={projectForm.image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={editingProject ? handleUpdateProject : handleAddProject}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              {editingProject ? "Update Project" : "Add Project"}
            </Button>
            {editingProject && (
              <Button
                variant="outlined"
                onClick={() => {
                  setEditingProject(null);
                  setProjectForm({
                    title: "",
                    description: "",
                    image: "",
                    imageFile: null,
                    githubUrl: "",
                    liveUrl: "",
                    techStack: "",
                  });
                }}
                className="border-gray-600 text-gray-300"
              >
                Cancel
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="bg-gray-800">
            <CardHeader className="p-0">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h5" color="white" className="mb-2">
                {project.title}
              </Typography>
              <Typography color="gray" className="mb-4">
                {project.description}
              </Typography>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech, index) => (
                  <Chip
                    key={index}
                    value={tech}
                    className="bg-blue-600 text-white"
                  />
                ))}
              </div>
              <div className="flex gap-2 mb-4">
                <Button
                  size="sm"
                  variant="outlined"
                  className="border-gray-600 text-gray-300"
                >
                  <EyeIcon className="w-4 h-4 mr-1" />
                  GitHub
                </Button>
                <Button
                  size="sm"
                  variant="outlined"
                  className="border-gray-600 text-gray-300"
                >
                  <EyeIcon className="w-4 h-4 mr-1" />
                  Live
                </Button>
              </div>
              <div className="flex gap-2">
                <IconButton
                  size="sm"
                  onClick={() => handleEditProject(project)}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  <PencilIcon className="w-4 h-4" />
                </IconButton>
                <IconButton
                  size="sm"
                  color="red"
                  onClick={() =>
                    setDeleteDialog({ open: true, id: project.id })
                  }
                >
                  <TrashIcon className="w-4 h-4" />
                </IconButton>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        handler={() => setDeleteDialog({ open: false, id: null })}
        className="rounded-lg shadow-lg"
      >
        <DialogHeader className="bg-gray-800 text-white rounded-t-lg">
          <Typography variant="h5" color="white" className="font-bold">
            Delete Project
          </Typography>
        </DialogHeader>
        <DialogBody className="bg-gray-800 text-gray-300">
          <Typography className="text-sm">
            Are you sure you want to delete this project? This action cannot be
            undone.
          </Typography>
        </DialogBody>
        <DialogFooter className="bg-gray-800 rounded-b-lg flex justify-end space-x-2">
          <Button
            variant="outlined"
            onClick={() => setDeleteDialog({ open: false, id: null })}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => handleDeleteProject(deleteDialog.id)}
            className="hover:bg-red-700"
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
