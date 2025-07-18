"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function Skills() {
  const [skills, setSkills] = useState([
    {
      id: 1,
      name: "React",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Node.js",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]);

  const [skillForm, setSkillForm] = useState({
    name: "",
    image: "",
  });

  const [editingSkill, setEditingSkill] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });

  const handleAddSkill = () => {
    const newSkill = {
      id: Date.now(),
      ...skillForm,
    };
    setSkills([...skills, newSkill]);
    setSkillForm({ name: "", image: "" });
  };

  const handleEditSkill = (skill) => {
    setEditingSkill(skill);
    setSkillForm(skill);
  };

  const handleUpdateSkill = () => {
    setSkills(
      skills.map((s) =>
        s.id === editingSkill.id ? { ...skillForm, id: editingSkill.id } : s
      )
    );
    setEditingSkill(null);
    setSkillForm({ name: "", image: "" });
  };

  const handleDeleteSkill = (id) => {
    setSkills(skills.filter((s) => s.id !== id));
    setDeleteDialog({ open: false, id: null });
  };

  return (
    <div className="space-y-6">
      <div>
        <Typography variant="h2" color="white" className="mb-2">
          Skills
        </Typography>
        <Typography color="gray" className="text-gray-400">
          Manage your technical skills
        </Typography>
      </div>

      <Card className="bg-gray-800">
        <CardHeader>
          <Typography variant="h5" color="white">
            Add Skill
          </Typography>
          <Typography color="gray" className="text-gray-400">
            Add your technical skills with images
          </Typography>
        </CardHeader>
        <CardBody className="space-y-4">
          <div>
            <Typography color="white" className="mb-2">
              Skill Name
            </Typography>
            <Input
              value={skillForm.name}
              onChange={(e) =>
                setSkillForm({ ...skillForm, name: e.target.value })
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
              value={skillForm.image}
              onChange={(e) =>
                setSkillForm({ ...skillForm, image: e.target.value })
              }
              className="!border-gray-600 !bg-gray-700 text-white"
              labelProps={{ className: "text-white" }}
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={editingSkill ? handleUpdateSkill : handleAddSkill}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              {editingSkill ? "Update Skill" : "Add Skill"}
            </Button>
            {editingSkill && (
              <Button
                variant="outlined"
                onClick={() => {
                  setEditingSkill(null);
                  setSkillForm({ name: "", image: "" });
                }}
                className="border-gray-600 text-gray-300"
              >
                Cancel
              </Button>
            )}
          </div>
        </CardBody>
      </Card>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {skills.map((skill) => (
          <Card key={skill.id} className="bg-gray-800">
            <CardBody className="p-4 text-center">
              <img
                src={skill.image || "/placeholder.svg"}
                alt={skill.name}
                className="w-16 h-16 mx-auto mb-2 rounded"
              />
              <Typography variant="h6" color="white" className="mb-4">
                {skill.name}
              </Typography>
              <div className="flex gap-2 justify-center">
                <IconButton
                  size="sm"
                  onClick={() => handleEditSkill(skill)}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  <PencilIcon className="w-4 h-4" />
                </IconButton>
                <IconButton
                  size="sm"
                  color="red"
                  onClick={() => setDeleteDialog({ open: true, id: skill.id })}
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
      >
        <DialogHeader className="bg-gray-800 text-white">
          <Typography variant="h5" color="white">
            Delete Skill
          </Typography>
        </DialogHeader>
        <DialogBody className="bg-gray-800 text-gray-300">
          Are you sure you want to delete this skill?
        </DialogBody>
        <DialogFooter className="bg-gray-800">
          <Button
            variant="outlined"
            onClick={() => setDeleteDialog({ open: false, id: null })}
            className="mr-2 border-gray-600 text-gray-300"
          >
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => handleDeleteSkill(deleteDialog.id)}
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
