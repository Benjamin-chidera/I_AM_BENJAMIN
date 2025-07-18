"use client";

import { useState } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import {
  FolderOpenIcon,
  UserIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

// Import components
import Overview from "../../components/pages/Overview";
import Projects from "../../components/pages/Projects";
import AboutMe from "../../components/pages/AboutMe";
import Experience from "../../components/pages/Experience";
import Skills from "../../components/pages/Skills";
import Certificates from "../../components/pages/Certificates";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("overview");
  // eslint-disable-next-line no-unused-vars
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Navigation items
  const navigationItems = [
    { id: "overview", label: "Overview", icon: ChartBarIcon },
    { id: "projects", label: "Projects", icon: FolderOpenIcon },
    { id: "about", label: "About Me", icon: UserIcon },
    { id: "experience", label: "Experience", icon: BriefcaseIcon },
    { id: "skills", label: "Skills", icon: CodeBracketIcon },
    { id: "certificates", label: "Certificates", icon: AcademicCapIcon },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <Overview setActiveSection={setActiveSection} />;
      case "projects":
        return <Projects />;
      case "about":
        return <AboutMe />;
      case "experience":
        return <Experience />;
      case "skills":
        return <Skills />;
      case "certificates":
        return <Certificates />;
      default:
        return <Overview setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: "#0c0c1d" }}>
      {/* Sidebar */}
      <div
        className={`${"w-64"} transition-all duration-300 bg-gray-900 border-r border-gray-700 flex flex-col`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <Typography color="gray" className="text-sm">
                  Dashboard
                </Typography>
              </div>
            )}
            <IconButton
              variant="text"
              size="sm"
              className="text-gray-400 hover:text-white text-2xl"
            >
              👨‍💻
            </IconButton>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <List className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <ListItem
                  key={item.id}
                  className={`rounded-lg ${
                    activeSection === item.id
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                  onClick={() => setActiveSection(item.id)}
                >
                  <ListItemPrefix>
                    <Icon className="h-6 w-6" />
                  </ListItemPrefix>
                  {sidebarOpen && (
                    <Typography color="inherit" className="font-medium">
                      {item.label}
                    </Typography>
                  )}
                </ListItem>
              );
            })}
          </List>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <Typography
              variant="h4"
              color="white"
              className="font-bold mb-4 text-center"
            >
              {navigationItems.find((item) => item.id === activeSection)?.label}
            </Typography>
            <div className="text-gray-300">{renderContent()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
