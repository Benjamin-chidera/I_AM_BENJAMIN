/* eslint-disable react/no-unknown-property */

import studym8 from "../../assets/studym8.png";
import Pos from "../../assets/Pos.png";
import JOBME from "../../assets/JOBME.png";
import swiftCart from "../../assets/swiftCart.png";
import { FaGithub, FaInternetExplorer } from "react-icons/fa";
import { motion } from "framer-motion";

export const Projects = () => {
  return (
    <main className=" lg:px-5 " id="portfolio">
      <motion.section
        className=" gap-2 px-6  pt-10"
        initial={{
          x: -200,
          opacity: 0,
        }}
        whileInView={{
          x: 0,
          opacity: 1,
        }}
      >
        {/* <div className="h-1 w-10 md:w-20 bg-slate-300"></div> */}
        <h1 className="text-2xl font-semibold">PROJECTS</h1>
        {/* <div className="h-1 w-10 md:w-20 bg-slate-300"></div> */}
      </motion.section>

      <section className=" flex flex-col gap-20 mt-10 mx-5">
        <section className=" lg:flex justify-center gap-10">
          {/* STUDM8 */}
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
              <img src={studym8} alt="" className=" w-[150px] mb-5 md:mb-0" />
            </div>

            <div>
              <p className="max-w-lg">
                StudyM8 is a comprehensive AI-powered productivity tool designed
                to provide students with a seamless experience in organizing,
                planning, and tracking their study activities. The platform
                allows users to upload unstructured learning materials—such as
                images, PDFs, or notes—from which it intelligently extracts and
                summarizes key information. Based on this, it generates a
                structured study roadmap with estimated completion times for
                each topic. Users can customize their study calendar, mark tasks
                as completed, and track their progress over time. Additionally,
                the system empowers users with features such as intelligent
                reminders, availability-based scheduling, and a history log to
                ensure consistent learning and improved academic outcomes.
              </p>

              <div className="flex items-center gap-10 mt-7">
                <motion.a
                  href="https://github.com/Benjamin-chidera/automated-study-planner"
                  target="_blank"
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
                  href="https://studym8.vercel.app/"
                  target="_blank"
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

          {/* POSTIT */}
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
              <img src={Pos} alt="" className=" w-[150px]  mb-5 md:mb-0" />
            </div>

            <div>
              <p className="max-w-lg">
                PostIt is a dynamic blog site designed to facilitate seamless
                posting, viewing, editing, and deletion of blog posts. The
                platform empowers users to share their thoughts and ideas
                through posts while providing an interactive experience for
                readers to engage with the content. Key features include the
                ability to create, view, edit, and delete posts, as well as
                comment on posts and manage comments.
              </p>

              <div className="flex items-center gap-10 mt-7">
                <motion.a
                  href="https://github.com/Benjamin-chidera/Postit-blog"
                  target="_blank"
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
                  target="_blank"
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

        <section className=" lg:flex justify-center gap-10">
          {/* SWIFT-CART */}
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
              <img
                src={swiftCart}
                alt=""
                className=" w-[150px]  mt-2 md:mb-0"
              />

              {/* <marquee behavior="smooth" direction="">
              Coming soon.....
            </marquee> */}
            </div>

            <div>
              <p className="max-w-lg mt-3 lg:mt-0">
                Swift Cart is a cutting-edge E-commerce destination designed
                exclusively for shoppers. It boasts a wide array of products
                spanning from trendy fashion. Customers on Swift Cart can dive
                into a rich catalog, indulge in secure transactions,
                effortlessly see their orders, and enjoy tailored
                recommendations. The platform excels in user engagement,
                offering hassle-free returns, and transparent reviews. Swift
                Cart stands out as a premier shopping hub, delivering
                unparalleled convenience and satisfaction to buyers.
              </p>

              <div className="flex items-center gap-10 mt-7">
                <motion.a
                  href="https://github.com/Benjamin-chidera/Swift-Cart-Client"
                  target="_blank"
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
                  href="https://swift-cart-one.vercel.app/"
                  target="_blank"
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

          {/* JOBME*/}
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
              <img src={JOBME} alt="" className=" w-[150px]  mb-5 md:mb-0" />

              {/* <marquee behavior="smooth" direction="">
              Coming soon.....
            </marquee> */}
            </div>

            <div>
              <p className="max-w-lg">
                JOBME is a dynamic job marketplace designed to bridge the gap
                between job seekers and employers. This platform allows job
                seekers to browse a comprehensive list of job opportunities,
                apply for positions that match their skills and interests, and
                manage their applications seamlessly. Employers benefit from
                JOBME by easily posting available job openings, reaching a broad
                audience of qualified candidates, and managing applications
                efficiently. The user-friendly interface and robust
                functionality of JOBME ensure an efficient and streamlined
                experience for both job seekers and employers, facilitating
                successful connections and career growth.
              </p>

              <div className="flex items-center gap-10 mt-7">
                <motion.a
                  href="https://github.com/Benjamin-chidera/JOB_ME"
                  target="_blank"
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
                  href="https://jobme.discoverbenix.com/"
                  target="_blank"
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
      </section>
    </main>
  );
};
