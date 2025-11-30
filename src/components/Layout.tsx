import React, { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FileText,
  Briefcase,
  Cpu,
  Award,
  Github,
  Menu,
  FileBadge,
  LogOut,
} from "lucide-react";
import { GiReturnArrow } from "react-icons/gi";

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  to,
  icon,
  label,
  onClick,
}) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        isActive
          ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.05)]"
          : "text-gray-400 hover:bg-white/5 hover:text-white"
      }`
    }
  >
    <span className="group-hover:scale-110 transition-transform duration-200">
      {icon}
    </span>
    <span className="font-medium tracking-wide">{label}</span>
  </NavLink>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.substring(1);
    if (!path) return "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  const navItems = [
    {
      to: "/admin/discover-benix/",
      icon: <FileText size={20} />,
      label: "Resume",
    },
    {
      to: "/admin/discover-benix/socials",
      icon: <Github size={20} />,
      label: "Socials",
    },
    {
      to: "/admin/discover-benix/profile",
      icon: <User size={20} />,
      label: "Profile",
    },
    {
      to: "/admin/discover-benix/about",
      icon: <LayoutDashboard size={20} />,
      label: "About",
    },
    {
      to: "/admin/discover-benix/projects",
      icon: <Briefcase size={20} />,
      label: "Projects",
    },
    {
      to: "/admin/discover-benix/experience",
      icon: <Briefcase size={20} />,
      label: "Experience",
    },
    {
      to: "/admin/discover-benix/skills",
      icon: <Cpu size={20} />,
      label: "Skills",
    },
    {
      to: "/admin/discover-benix/certifications",
      icon: <Award size={20} />,
      label: "Certifications",
    },
    {
      to: "/",
      icon: <GiReturnArrow size={20} />,
      label: "Return to Portfolio",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#0c0c1d] text-gray-200 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0c0c1d] border-r border-white/5 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center space-x-3 mb-10 px-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
              <span className="text-cyan-400 font-bold">D</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              DevAdmin
            </h1>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => (
              <SidebarItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                onClick={() => setIsMobileMenuOpen(false)}
              />
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t border-white/5">
            <button className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/5 w-full transition-colors">
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        {/* Top Navbar */}
        <header className="h-20 flex items-center justify-between px-6 lg:px-10 border-b border-white/5 bg-[#0c0c1d]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <button
              className="lg:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {getPageTitle()}
            </h2>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-3 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-medium text-emerald-400">
                System Online
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-white">Alex Developer</p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 p-[2px]">
                <img
                  src="https://picsum.photos/200"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-2 border-[#0c0c1d]"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 pb-20 scroll-smooth">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* {children} */}
            <Outlet/>
          </div>
        </div>
      </main>
    </div>
  );
};
