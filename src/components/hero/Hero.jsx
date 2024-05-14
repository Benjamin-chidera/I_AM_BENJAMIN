import React from "react";
import { motion } from "framer-motion";
import ben from "../../assets/ben.jpeg";

export const Hero = () => {
  const sliderVariants = {
    initial: {
      x: 0,
    },
    animate: {
      x: "-220%",
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 5,
      },
    },
  };

  const handleDownload = () => {
    const downloadLink = document.createElement("a");

    downloadLink.href =
      "https://drive.google.com/file/d/1wXEcCZSVOFwuj_7Ib3j-Q9uPQd9pNLCT/view?usp=drive_link";

    downloadLink.download = "resume.pdf";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // const handleDownload = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://drive.google.com/file/d/111-4OFYwmP182D5mZRAm_RvpTs75a3a8/view?usp=drive_link"
  //     );
  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);

  //     const downloadLink = document.createElement("a");
  //     downloadLink.href = url;
  //     downloadLink.download = "resume.pdf";
  //     document.body.appendChild(downloadLink);
  //     downloadLink.click();
  //     document.body.removeChild(downloadLink);
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //   }
  // };

  return (
    <main
      className="hero flex justify-between py-20 w-full relative z-10 px-7 "
      id="home"
    >
      <section className=" w-[80%] relative">
        <motion.div
          initial={{
            opacity: 0,
            x: -200,
          }}
          animate={{
            opacity: 1,
            x: 0,

            transition: {
              duration: 1,
            },
          }}
        >
          <h1 className="text-[rebeccapurple] text-lg md:text-3xl font-bold">
            BENJAMIN CHIDERA BENJAMIN
          </h1>
          <h2 className=" text-4xl md:text-6xl font-bold leading-9 lg:text-7xl max-w-[900px] lg:leading-[80px] mt-3">
            FULL STACK DEVELOPER
          </h2>

          <button
            className="my-7 border px-8 py-5 font-semibold text-sm md:text-xl whitespace-nowrap"
            onClick={handleDownload}
          >
            DownLoad Resume
          </button>
        </motion.div>

        <motion.div
          className="hidden lg:block absolute text-[200px] bottom-0 whitespace-nowrap w-[50%] h-fit font-bold -z-30 text-[#ffffff09]"
          variants={sliderVariants}
          initial="initial"
          animate="animate"
        >
          I_AM_BENJAMIN
        </motion.div>
      </section>

      <motion.section
        className=" w-[50%]"
        initial={{
          opacity: 0,
          x: 200,
        }}
        animate={{
          opacity: 1,
          x: 0,

          transition: {
            duration: 1,
          },
        }}
      >
        <motion.img
          className="hidden lg:block h-[350px] w-[300px] object-cover cursor-pointer"
          src={ben}
          alt=""
          drag
          dragConstraints={{
            right: "20",
            left: "20",
            top: "10",
            bottom: "10",
          }}
          whileHover={{
            scale: 1.1,
          }}
          transition={{
            duration: 1,
          }}
        />
      </motion.section>
    </main>
  );
};
