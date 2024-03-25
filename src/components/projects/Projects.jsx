import React from "react";
import yem from "../../assets/yem.png";
import Pos from "../../assets/Pos.png";
import { FaGithub, FaInternetExplorer } from "react-icons/fa";
import { motion } from "framer-motion";

export const Projects = () => {
  return (
    <main className=" " id="portfolio">
      <motion.section
        className="flex justify-center items-center gap-2 my-10"
        initial={{
          x: -200,
          opacity: 0,
        }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
      >
        <div className="h-1 w-10 md:w-20 bg-slate-300"></div>
        <h1 className="text-2xl md:text-4xl font-semibold">PROJECTS</h1>
        <div className="h-1 w-10 md:w-20 bg-slate-300"></div>
      </motion.section>

      <section className=" flex flex-col gap-20 mt-10 mx-5">
        <motion.section
          className="md:flex justify-center gap-10 mt-5"
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <div>
            <img src={yem} alt="" className=" w-[400px] mb-5 md:mb-0" />
          </div>

          <div>
            <p className="max-w-lg">
              YemSays is a comprehensive real estate project designed to provide
              customers with a seamless experience in viewing and booking
              properties. The platform allows customers to browse through a
              diverse range of properties, view detailed information, and
              schedule inspections to physically visit the properties they are
              interested in. Additionally, the system empowers administrators
              with the capability to upload available properties, manage
              property listings, and oversee the bookings made by customers for
              property inspections.
            </p>

            <div className="flex items-center gap-10 mt-7">
              <motion.a
                href=" https://github.com/Benjamin-chidera/yemSays-RealEstate"
                initial={{
                  scale: 0.9,
                }}
                whileTap={{
                  scale: 0.7,
                }}
                whileHover={{
                  scale: 1.1,
                }}
                transition={{
                  duration: 1,
                }}
              >
                <FaGithub size={27} />
              </motion.a>
              <motion.a
                href="https://yem-says-fawn.vercel.app/"
                initial={{
                  scale: 0.9,
                }}
                whileTap={{
                  scale: 0.7,
                }}
                whileHover={{
                  scale: 1.1,
                }}
                transition={{
                  duration: 1,
                }}
              >
                <FaInternetExplorer size={27} />
              </motion.a>
            </div>
          </div>
        </motion.section>

        <motion.section
          className="md:flex justify-center gap-10 mt-5 "
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <div>
            <img src={Pos} alt="" className=" w-[400px]  mb-5 md:mb-0" />
          </div>

          <div>
            <p className="max-w-lg">
              PostIt is a dynamic blog site designed to facilitate seamless
              posting, viewing, editing, and deletion of blog posts. The
              platform empowers users to share their thoughts and ideas through
              posts while providing an interactive experience for readers to
              engage with the content. Key features include the ability to
              create, view, edit, and delete posts, as well as comment on posts
              and manage comments.
            </p>

            <div className="flex items-center gap-10 mt-7">
              <motion.a
                href="https://github.com/Benjamin-chidera/Postit-blog"
                target="blank"
                initial={{
                  scale: 0.9,
                }}
                whileTap={{
                  scale: 0.7,
                }}
                whileHover={{
                  scale: 1.1,
                }}
                transition={{
                  duration: 1,
                }}
              >
                <FaGithub size={27} />
              </motion.a>
              <motion.a
                href="https://postit-blog-six.vercel.app/"
                target="blank"
                initial={{
                  scale: 0.9,
                }}
                whileTap={{
                  scale: 0.7,
                }}
                whileHover={{
                  scale: 1.1,
                }}
                transition={{
                  duration: 1,
                }}
              >
                <FaInternetExplorer size={27} />
              </motion.a>
            </div>
          </div>
        </motion.section>
      </section>
    </main>
  );
};
