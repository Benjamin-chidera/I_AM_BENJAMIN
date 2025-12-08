import { motion } from "framer-motion";
// import ben from "../../assets/ben.jpeg";
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useProfileStore } from "../../store/profile.store";
import { useResumeStore } from "../../store/resume.store";
import { useEffect, useState } from "react";
import { useSocialsStore } from "../../store/socials.store";

export const Hero = () => {
  const { profile, getProfile } = useProfileStore();
  const { url, getResume } = useResumeStore();
  const { socials, getSocials } = useSocialsStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getProfile(), getResume(), getSocials()]);
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    downloadLink.href = url;
    downloadLink.download = "resume.pdf";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const getIconForPlatform = (platformName) => {
    const platform = platformName.toLowerCase().trim();

    switch (platform) {
      case "github":
        return FaGithub;
      case "instagram":
        return FaInstagram;
      case "twitter":
        return FaSquareXTwitter;
      case "whatsapp":
        return FaWhatsapp;
      case "linkedin":
        return FaLinkedin;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <main
        className="hero lg:flex justify-between py-14 lg:py-20 w-full relative z-10 px-7 md:px-14"
        id="home"
      >
        <section className="w-[80%] relative">
          <div className="relative">
            <p className="mb-5">
              <span className="font-bold text-black">Hi, My </span> Name is
            </p>
            <div className="bg-white w-14 h-14 rounded-full absolute -top-4 -left-2 -z-30"></div>
          </div>

          <Skeleton width={200} height={40} className="mb-4" />
          <Skeleton width={250} height={30} count={2} className="mb-3" />
          <Skeleton width={200} height={45} className="mt-7" />

          <motion.div
            className="hidden lg:block absolute text-[200px] bottom-0 whitespace-nowrap w-[50%] h-fit font-bold -z-30 text-[#ffffff09]"
            variants={sliderVariants}
            initial="initial"
            animate="animate"
          >
            I_AM_BENJAMIN
          </motion.div>
        </section>

        <section className="w-[50%]">
          <div className="relative" style={{ height: 400, width: 350 }}>
            <Skeleton
              height={350}
              width={300}
              className="hidden lg:block rounded-tl-xl rounded-tr-xl"
            />
          </div>

          <div className="flex items-center gap-10 md:gap-14 mt-10">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} circle={true} height={24} width={24} />
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main
      className="hero lg:flex justify-between py-14 lg:py-20 w-full relative z-10 px-7 md:px-14"
      id="home"
    >
      <section className="w-[80%] relative">
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
          <section className="relative">
            <p className="mb-5">
              <span className="font-bold text-black">Hi, My </span> Name is
            </p>
            <div className="bg-white w-14 h-14 rounded-full absolute -top-4 -left-2 -z-30"></div>
          </section>
          <h1 className="text-[rebeccapurple] text-lg md:text-4xl font-bold flex items-center gap-1">
            {profile?.full_name}
          </h1>
          <h2 className="text-xl font-semibold leading-9 lg:max-w-[400px] mt-3">
            I am a {profile?.headline} based in {profile?.location}
          </h2>

          <button
            className="my-7 border px-8 py-5 font-semibold text-sm md:text-xl whitespace-nowrap hover:bg-black hover:text-white transition-colors"
            onClick={handleDownload}
            disabled={!url}
          >
            Download Resume
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
        className="w-[50%]"
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
        <motion.div className="relative" style={{ height: 400, width: 350 }}>
          <motion.img
            className="hidden lg:block h-[350px] w-[300px] object-cover cursor-pointer rounded-tl-xl rounded-tr-xl"
            src={profile?.profile_image}
            alt="Profile"
            drag
            dragConstraints={{
              left: -50,
              right: 50,
              top: -50,
              bottom: 50,
            }}
            whileHover={{
              scale: 1.1,
            }}
            transition={{
              duration: 1,
            }}
          />
        </motion.div>

        <div className="flex items-center gap-10 md:gap-14 mt-10">
          {socials?.map((soc) => {
            const IconComponent = getIconForPlatform(soc.platform_name);

            if (!IconComponent) {
              return null; // Skip if no matching icon
            }

            return (
              <motion.a
                key={soc.id}
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconComponent size={20} />
              </motion.a>
            );
          })}
        </div>
      </motion.section>
    </main>
  );
};
