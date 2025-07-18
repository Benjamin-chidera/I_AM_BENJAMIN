"use client";

import { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's styles

export default function Experience() {
  const [experience, setExperience] = useState([]);
  const [experienceForm, setExperienceForm] = useState({
    title: "",
    company: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [editingExperience, setEditingExperience] = useState(null);

  const handleSaveExperience = () => {
    if (editingExperience) {
      setExperience((prev) =>
        prev.map((exp) =>
          exp.id === editingExperience.id
            ? { ...editingExperience, ...experienceForm }
            : exp
        )
      );
      setEditingExperience(null);
    } else {
      setExperience([...experience, { id: Date.now(), ...experienceForm }]);
    }
    setExperienceForm({
      title: "",
      company: "",
      description: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <Typography variant="h2" color="white" className="mb-2 font-bold">
          Experience
        </Typography>
        <Typography color="gray" className="text-gray-400">
          Manage your professional experience
        </Typography>
      </div>

      {/* Experience Form */}
      <Card className="bg-gray-800 shadow-lg rounded-lg">
        <CardHeader className="p-4 border-b border-gray-700">
          <Typography variant="h5" color="white" className="font-bold">
            {editingExperience ? "Edit Experience" : "Add Experience"}
          </Typography>
        </CardHeader>
        <CardBody className="p-6 space-y-4">
          <input
            type="text"
            placeholder="Job Title"
            value={experienceForm.title}
            onChange={(e) =>
              setExperienceForm({ ...experienceForm, title: e.target.value })
            }
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <input
            type="text"
            placeholder="Company"
            value={experienceForm.company}
            onChange={(e) =>
              setExperienceForm({ ...experienceForm, company: e.target.value })
            }
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
          <div>
            <label className="text-gray-400">Description</label>
            <ReactQuill
              value={experienceForm.description}
              onChange={(value) =>
                setExperienceForm({ ...experienceForm, description: value })
              }
              className="bg-gray-700 text-white rounded-lg"
              theme="snow"
              placeholder="Describe your role and responsibilities..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              placeholder="Start Date"
              value={experienceForm.startDate}
              onChange={(e) =>
                setExperienceForm({
                  ...experienceForm,
                  startDate: e.target.value,
                })
              }
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <input
              type="date"
              placeholder="End Date"
              value={experienceForm.endDate}
              onChange={(e) =>
                setExperienceForm({
                  ...experienceForm,
                  endDate: e.target.value,
                })
              }
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="flex space-x-4">
            <Button
              onClick={handleSaveExperience}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {editingExperience ? "Update Experience" : "Add Experience"}
            </Button>
            {editingExperience && (
              <Button
                variant="outlined"
                onClick={() => {
                  setEditingExperience(null);
                  setExperienceForm({
                    title: "",
                    company: "",
                    description: "",
                    startDate: "",
                    endDate: "",
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

      {/* Experience List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {experience.map((exp) => (
          <Card key={exp.id} className="bg-gray-800 shadow-lg rounded-lg">
            <CardHeader className="p-4 border-b border-gray-700">
              <Typography variant="h5" color="white" className="font-bold">
                {exp.title}
              </Typography>
              <Typography color="gray" className="text-gray-400">
                {exp.company}
              </Typography>
              <Typography color="gray" className="text-sm">
                {exp.startDate} - {exp.endDate || "Present"}
              </Typography>
            </CardHeader>
            <CardBody className="p-4">
              <Typography
                color="gray"
                className="text-gray-300 mb-4"
                dangerouslySetInnerHTML={{ __html: exp.description }}
              />
              <div className="flex justify-end space-x-2">
                <Button
                  size="sm"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                  onClick={() => {
                    setEditingExperience(exp);
                    setExperienceForm({
                      title: exp.title,
                      company: exp.company,
                      description: exp.description,
                      startDate: exp.startDate,
                      endDate: exp.endDate,
                    });
                  }}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  color="red"
                  onClick={() =>
                    setExperience((prev) =>
                      prev.filter((item) => item.id !== exp.id)
                    )
                  }
                  className="hover:bg-red-700"
                >
                  Delete
                </Button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
