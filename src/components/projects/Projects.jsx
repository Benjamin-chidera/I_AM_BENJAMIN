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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              tenetur animi eius dolor ad pariatur illum molestiae quas debitis
              exercitationem ipsam voluptatibus, reprehenderit et eos atque qui
              molestias. Possimus sapiente reiciendis asperiores tempore totam
              quod soluta ea nihil modi. Odio molestias repellat quam ea
              reiciendis eos. Nobis optio molestias expedita consequuntur
              possimus, corporis magnam, obcaecati veritatis quasi maxime eum ex
              qui necessitatibus quae odio eaque illo modi alias eius dolorum
              ipsum quis. Eaque perspiciatis libero possimus et facilis illum
              natus ratione
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
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              tenetur animi eius dolor ad pariatur illum molestiae quas debitis
              exercitationem ipsam voluptatibus, reprehenderit et eos atque qui
              molestias. Possimus sapiente reiciendis asperiores tempore totam
              quod soluta ea nihil modi. Odio molestias repellat quam ea
              reiciendis eos. Nobis optio molestias expedita consequuntur
              possimus, corporis magnam, obcaecati veritatis quasi maxime eum ex
              qui necessitatibus quae odio eaque illo modi alias eius dolorum
              ipsum quis. Eaque perspiciatis libero possimus et facilis illum
              natus ratione
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
