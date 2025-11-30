import "./App.css";
import { Top } from "./components/BackToTop/Top";
import { Cursor } from "./components/cursor/Cursor";
import { Footer } from "./components/Footer/Footer";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import About from "./pages/about/About";
import Certifications from "./pages/certifications/Certifications";
import { Contact } from "./pages/contact/Contact";
import NotFound from "./pages/notFound/NotFound";
import Experience from "./pages/experience/experience";
import Portfolio from "./pages/discover-benix/portfolio";
import { PageLayout } from "./lib/pageLayout";
import { Hero } from "./pages/hero/Hero";
import { Projects } from "./pages/projects/Projects";
import { Skills } from "./pages/skills/Skills";
import { Layout } from "./components/Layout";
import { AdminAbout } from "./pages/admin/About";
import { AdminCertifications } from "./pages/admin/Certifications";
import { AdminExperience } from "./pages/admin/Experience";
import { AdminProfile } from "./pages/admin/Profile";
import { AdminProjects } from "./pages/admin/Projects";
import { AdminResume } from "./pages/admin/Resume";
import { AdminSkills } from "./pages/admin/Skills";
import { AdminSocials } from "./pages/admin/Socials";

function AppContent() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <main
      className={`${
        path.includes("admin") ? "" : "container mx-auto"
      } pt-3 min-h-screen `}
    >
      <Cursor />

      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/discover-benix" element={<Portfolio />} />

        {/* will not appear in github */}
        <Route path="/admin/discover-benix" element={<Layout />}>
          <Route index element={<AdminResume />} />
          <Route path="about" element={<AdminAbout />} />
          <Route path="certifications" element={<AdminCertifications />} />
          <Route path="experience" element={<AdminExperience />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="resume" element={<AdminResume />} />
          <Route path="skills" element={<AdminSkills />} />
          <Route path="socials" element={<AdminSocials />} />
        </Route>
        {/* will not appear in github */}
      </Routes>

      <Top />
      <Footer />
    </main>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
