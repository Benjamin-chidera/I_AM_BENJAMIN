/* eslint-disable react/no-unescaped-entities */

import db from "../../assets/db.png";

const About = () => {
  return (
    <main className="mx-6 lg:mx-12 pt-10 lg:flex justify-between">
      <section className="relative lg:sticky lg:top-10 lg:h-[350px] lg:w-[300px] transition-all duration-500">
        <img
          className="hidden lg:block h-full w-full object-cover cursor-pointer rounded-tl-xl rounded-tr-xl"
          src={db}
          alt="Benjamin"
        />
      </section>

      <section className="lg:ml-10">
        <p className="mb-5 underline font-bold text-4xl">About Benjamin</p>
        <div className="max-w-[700px]">
          <p>
            Hi, I'm Benjamin Chidera Benjamin, a passionate Full Stack Developer
            with over 2 years of experience in creating dynamic and responsive
            web applications. My journey in web development has been fueled by
            my love for innovative design and seamless user experiences.
          </p>

          <p className="mt-5">
            I hold a degree in Business Administration from Caritas University
            and certificates in Frontend and Backend Developer from{" "}
            <b>New Horizon, Tech Studio Academy and Udemy</b>, where I honed my
            skills in programming and web technologies. During my studies, I
            discovered my passion for frontend development and have been
            dedicated to mastering it ever since.
          </p>

          <p className="mt-5">
            I specialize in using modern web technologies to build interactive
            and visually appealing user interfaces. My core competencies
            include:
            <ul>
              <li>
                **Frontend Technologies:** HTML, CSS, JavaScript, TypeScript, React.js,
                Next.js, React Native
              </li>
              <li>**State Management:** Redux, Redux Toolkit</li>
              <li>**Styling:** Tailwind CSS, CSS-in-JS</li>
              <li>**Version Control:** Git, GitHub</li>
              <li>
                **Backend Technologies:** Node.js, Express.js, MongoDB, MySQL
              </li>
              <li>**Tools:** Vite, Postman, VS Code</li>
            </ul>
          </p>

          <p className="mt-5">
            I've had the privilege of working with innovative companies like
            Ghost Air and Tech Studio Academy, where I contributed to developing
            robust web applications. At Ghost Air, I played a key role in
            building a platform that allows users to rent homes and spaces,
            ensuring a smooth and user-friendly experience. My role at Tech
            Studio Academy involved collaborating with a team of developers to
            create educational tools that enhance learning experiences for
            students.
          </p>

          <p className="mt-5">
            In addition to my professional work, I enjoy working on personal
            projects that challenge me to learn new skills and push the
            boundaries of web development and mobile development. One of my
            notable projects is Swift Cart, an ecommerce platform that showcases
            my ability to integrate frontend and backend technologies
            seamlessly. I'm also proud of my contributions to open-source
            projects, where I collaborate with the developer community to create
            tools that benefit everyone.
          </p>

          <p className="mt-5">
            Looking ahead, I am eager to continue growing as a full stack
            developer and to take on more complex projects that leverage
            cutting-edge technologies. My goal is to contribute to impactful
            projects that make a difference in people's lives, whether through
            innovative user interfaces or powerful web or mobile applications.
          </p>

          <p className="mt-5">
            Outside of coding, I enjoy exploring the latest trends in
            technology, participating in hackathons, and engaging with the
            developer community. I also have a keen interest in artificial
            intelligence and am currently expanding my knowledge in this
            exciting field. When I'm not in front of my computer, you can find
            me playing soccer, exploring new places, or spending time with my
            family and friends.
          </p>

          <p className="mt-5">
            I am always open to new opportunities and collaborations. If you'd
            like to work together or just have a chat about web development,
            feel free to reach out! [Contact Me -{" "}
            <a
              href="mailto:benjaminchidera72@gmail.com"
              className="text-blue-500"
            >
              benjaminchidera72@gmail.com
            </a>
            ]
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;
