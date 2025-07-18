"use client";

import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  PlusIcon,
  FolderOpenIcon,
  BriefcaseIcon,
  CodeBracketIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline";

// Sample data - you can move this to a context or state management solution
const sampleData = {
  projects: [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-stack e-commerce solution with React and Node.js",
      image: "/placeholder.svg?height=200&width=300",
    },
  ],
  experience: [{ id: 1, projectName: "Portfolio Website" }],
  skills: [
    { id: 1, name: "React" },
    { id: 2, name: "Node.js" },
  ],
  certificates: [{ id: 1, title: "React Developer Certification" }],
};

export default function Overview({ setActiveSection }) {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <Typography variant="h2" color="white" className="mb-2 font-bold">
          Dashboard Overview
        </Typography>
        <Typography color="gray" className="text-gray-400">
          Welcome to your portfolio admin dashboard
        </Typography>
      </div>

      {/* Stats Section */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg rounded-lg">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography
                  color="white"
                  className="text-sm font-medium opacity-80"
                >
                  Total Projects
                </Typography>
                <Typography variant="h3" color="white" className="font-bold">
                  {sampleData.projects.length}
                </Typography>
              </div>
              <FolderOpenIcon className="h-10 w-10 text-blue-200" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-green-600 to-green-700 shadow-lg rounded-lg">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography
                  color="white"
                  className="text-sm font-medium opacity-80"
                >
                  Experience
                </Typography>
                <Typography variant="h3" color="white" className="font-bold">
                  {sampleData.experience.length}
                </Typography>
              </div>
              <BriefcaseIcon className="h-10 w-10 text-green-200" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600 to-purple-700 shadow-lg rounded-lg">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography
                  color="white"
                  className="text-sm font-medium opacity-80"
                >
                  Skills
                </Typography>
                <Typography variant="h3" color="white" className="font-bold">
                  {sampleData.skills.length}
                </Typography>
              </div>
              <CodeBracketIcon className="h-10 w-10 text-purple-200" />
            </div>
          </CardBody>
        </Card>

        <Card className="bg-gradient-to-br from-orange-600 to-orange-700 shadow-lg rounded-lg">
          <CardBody className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <Typography
                  color="white"
                  className="text-sm font-medium opacity-80"
                >
                  Certificates
                </Typography>
                <Typography variant="h3" color="white" className="font-bold">
                  {sampleData.certificates.length}
                </Typography>
              </div>
              <AcademicCapIcon className="h-10 w-10 text-orange-200" />
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Additional Sections */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Projects */}
        <Card className="bg-gray-800 shadow-lg rounded-lg">
          <CardHeader className="p-4 border-b border-gray-700">
            <Typography variant="h5" color="white" className="font-bold">
              Recent Projects
            </Typography>
          </CardHeader>
          <CardBody className="p-6">
            <div className="space-y-4">
              {sampleData.projects.slice(0, 3).map((project) => (
                <div key={project.id} className="flex items-center space-x-4">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <Typography color="white" className="font-medium">
                      {project.title}
                    </Typography>
                    <Typography color="gray" className="text-sm">
                      {project.description.slice(0, 50)}...
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gray-800 shadow-lg rounded-lg">
          <CardHeader className="p-4 border-b border-gray-700">
            <Typography variant="h5" color="white" className="font-bold">
              Quick Actions
            </Typography>
          </CardHeader>
          <CardBody className="p-6">
            <div className="space-y-3">
              <Button
                onClick={() => setActiveSection("projects")}
                className="w-full justify-start bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Add New Project
              </Button>
              <Button
                onClick={() => setActiveSection("experience")}
                className="w-full justify-start bg-green-600 hover:bg-green-700"
                size="lg"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
              <Button
                onClick={() => setActiveSection("skills")}
                className="w-full justify-start bg-purple-600 hover:bg-purple-700"
                size="lg"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
