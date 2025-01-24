import "./App.css";
import { Top } from "./components/BackToTop/Top";
import { Cursor } from "./components/cursor/Cursor";
import { Footer } from "./components/Footer/Footer";
import { Hero } from "./pages/hero/Hero";
import { Navbar } from "./components/Navbar/Navbar";
import { Projects } from "./pages/projects/Projects";
import { Skills } from "./pages/skills/Skills";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/about/About";
import Certifications from "./pages/certifications/Certifications";
import { Contact } from "./pages/contact/Contact";
import NotFound from "./pages/notFound/NotFound";
import Experience from "./pages/experience/experience";

function App() {
  return (
    <main className=" container mx-auto pt-3">
      <BrowserRouter>
        <Cursor />
        <section className="main-section" id="home">
          <Navbar />
        </section>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Top />
        <section className="">
          <Footer />
        </section>
      </BrowserRouter>
    </main>
  );
}

export default App;
