import "./App.css";
import { Top } from "./components/BackToTop/Top";
import { Cursor } from "./components/cursor/Cursor";
import { Footer } from "./components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <main className="container mx-auto pt-3 min-h-screen">
      <BrowserRouter>
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
        </Routes>

        <Top />
        <Footer />
      </BrowserRouter>
    </main>
  );
}

export default App;
