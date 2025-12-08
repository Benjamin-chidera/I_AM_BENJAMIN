import { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { FaSquareXTwitter } from "react-icons/fa6";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import db from "../../assets/db.png";
import { useSocialsStore } from "../../store/socials.store";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { socials, getSocials } = useSocialsStore();

  useEffect(() => {
    getSocials();
  }, [getSocials]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

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

  const items = [
    "about",
    "projects",
    "experience",
    "contact",
    "skills",
    "certifications",
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const navVariants = {
    hidden: {
      opacity: 0,
      scale: 0.2,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
      },
    },
  };

  const menuVariant = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 1],
      },
    },
  };

  const linkVariant = {
    initial: {
      y: "30vh",
      transition: {
        duration: 0.5,
        ease: [0.37, 0, 0.63, 1],
      },
    },
    open: {
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.37, 0, 0.63, 1],
      },
    },
    exit: {
      y: "30vh",
      transition: {
        duration: 0.5,
        ease: [0.37, 0, 0.63, 1],
      },
    },
  };

  const containerVariant = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
  };

  const socialLinkVariant = {
    initial: {
      y: 50,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.37, 0, 0.63, 1],
      },
    },
    open: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.37, 0, 0.63, 1],
      },
    },
    exit: {
      y: 50,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.37, 0, 0.63, 1],
      },
    },
  };

  return (
    <main className="bg-[#0c0c1d] shadow-2xl p-5 z-20 overyh">
      <motion.main
        className="flex justify-between items-center lg:px-7 w-full"
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <Link to={"/"} className="font-bold text-xl w-14 h-14">
          <img src={db} alt="" className="w-full h-full" />
        </Link>

        <section className="hidden lg:flex flex-col gap-5 items-center"></section>

        <button
          className="z-50 flex justify-end items-end mt-2 relative"
          onClick={() => setOpen(!open)}
        >
          {open ? (
            <IoCloseSharp color="black" size={32} />
          ) : (
            <IoMdMenu size={32} color="white" />
          )}
        </button>
      </motion.main>
      <AnimatePresence>
        {open && (
          <motion.section
            className="bg-[#f2f2f2] w-full h-screen fixed left-0 top-0 z-20 overflow-hidden origin-top"
            variants={menuVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              className="flex items-center flex-col justify-center h-[80vh] gap-10 font-semibold text-xl"
              variants={containerVariant}
              initial="initial"
              animate="open"
              exit="exit"
            >
              {items.map((t) => (
                <motion.div key={t} className="overflow-hidden">
                  <motion.div
                    className="capitalize"
                    whileHover={{ scale: 1.1, color: "black" }}
                    whileTap={{ scale: 0.9 }}
                    variants={linkVariant}
                  >
                    <Link
                      to={t}
                      className="text-black text-2xl lg:text-4xl"
                      onClick={handleClose}
                    >
                      {t}
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
              <motion.div
                className="flex items-center gap-10 md:gap-14 absolute bottom-32 lg:bottom-8"
                variants={containerVariant}
              >
                <div className="flex items-center gap-10 md:gap-14 mt-10">
                  {socials.map((soc) => {
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
                        variants={socialLinkVariant}
                      >
                        <IconComponent size={20} />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
};
