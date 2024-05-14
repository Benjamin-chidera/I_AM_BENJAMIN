import "./App.css";
import { Top } from "./components/BackToTop/Top";
import { Contact } from "./components/contact/Contact";
import { Cursor } from "./components/cursor/Cursor";
import { Footer } from "./components/Footer/Footer";
import { Hero } from "./components/hero/Hero";
import { Navbar } from "./components/Navbar/Navbar";
import { Projects } from "./components/projects/Projects";
import { Skills } from "./components/skills/Skills";

function App() {
  return (
    <main className="container mx-auto pt-8">
      <Cursor />
      <section className="main-section" id="home">
        <Navbar />
        <Hero />
      </section>

      <section className="main-section" id="portfolio">
        <Projects />
      </section>
      <section className="main-section h-[100vh] lg:h-[400px]" id="skills">
        <Skills />
      </section>
      <section className="main-section" id="contact">
        <Contact />
      </section>
      <section className="mt-20">
        <Footer />
      </section>
      <Top />
    </main>
  );
}

export default App;
