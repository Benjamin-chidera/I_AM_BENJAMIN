/* eslint-disable react/no-unescaped-entities */

import db from "../../assets/db.png";

const About = () => {
  return (
    <main className="mx-6 lg:mx-12 pt-10 lg:flex justify-between">
      {/* Profile Image */}
      <section className="relative lg:sticky lg:top-10 lg:h-[350px] lg:w-[300px] transition-all duration-500">
        <img
          className="hidden lg:block h-full w-full object-cover cursor-pointer rounded-tl-xl rounded-tr-xl"
          src={db}
          alt="Benjamin"
        />
      </section>

      {/* About Content */}
      <section className="lg:ml-10">
        <h2 className="mb-5 underline font-bold text-4xl">About Benjamin</h2>
        <div className="max-w-[700px] space-y-5 leading-relaxed text-lg">
          <p>
            Hi, I'm <b>Benjamin Chidera</b>, a <b>Software/AI Engineer</b> with
            over <b>3 years of experience</b> building scalable, modern web and
            mobile applications. My journey began as a frontend developer in
            2022, and since then I've grown into fullstack and AI engineering —
            combining clean design, seamless user experiences, and intelligent
            automation.
          </p>

          <p>
            I hold a degree in <b>Business Administration</b> from Caritas
            University, alongside certifications from{" "}
            <b>New Horizon, Tech Studio Academy, and Udemy</b>. My professional
            journey includes impactful roles at <b>Ghost Air</b> and{" "}
            <b>Tech Studio Academy</b>, where I contributed to building robust
            applications and collaborated on innovative learning tools.
          </p>

          {/* Skills List */}
          <div>
            <p className="font-semibold">⚡ Core Competencies:</p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>
                <b>Frontend:</b> React.js, Next.js, React Native, TypeScript,
                JavaScript
              </li>
              <li>
                <b>State Management:</b> Redux Toolkit, Zustand, React Query
              </li>
              <li>
                <b>Styling:</b> Tailwind CSS, ShadCN UI, Framer Motion
              </li>
              <li>
                <b>Backend:</b> FastAPI, Node.js, Express.js
              </li>
              <li>
                <b>Databases:</b> MongoDB, PostgreSQL, MySQL, SQLite, Redis
              </li>
              <li>
                <b>AI/ML:</b> LangChain, LangGraph, LLMs, RAG, AI Agents,
                Hugging Face
              </li>
              <li>
                <b>Tools:</b> Git/GitHub, Postman, Jest, Vite, VS Code
              </li>
            </ul>
          </div>

          <p>
            I'm also the creator of <b>StudyM8</b>, an{" "}
            <b>AI-powered study planner</b> that transforms study material into
            structured roadmaps, and <b>a Co-Creator of Curaflux</b>, a
            healthcare staffing platform inspired by the Uber model. These
            projects showcase my ability to integrate web technologies with
            cutting-edge AI.
          </p>

          <p>
            Looking ahead, my goal is to specialize in{" "}
            <b>AI Engineering & LLM Integration</b>, focusing on fine-tuning,
            intelligent agents, and secure, scalable platforms that enhance
            productivity and user experience.
          </p>

          <p>
            Outside of coding, I love exploring new tech trends, participating
            in hackathons, and sharing knowledge as a{" "}
            <b>volunteer JavaScript tutor</b>. When I’m not building or
            learning, you’ll likely find me on the soccer field, exploring new
            places, or spending time with family and friends.
          </p>

          <p>
            🚀 Always open to collaboration! Let’s connect:{" "}
            <a
              href="mailto:benjaminchidera72@gmail.com"
              className="text-blue-500 font-medium"
            >
              benjaminchidera72@gmail.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;
