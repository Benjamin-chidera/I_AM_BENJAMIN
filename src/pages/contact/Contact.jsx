import React, { useState } from "react";
import { motion } from "framer-motion";

import { IoCall } from "react-icons/io5";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Success } from "../../components/modal/Success";
import { Loader } from "../../components/modal/Loader";



export const Contact = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const [loading, setLoading] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .sendForm("service_k5bg9xq", "template_pyoaecr", form.current, {
        publicKey: "j3hqSqhoTvHJ8rDtk",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setOpen(true);
          setLoading(false);
           form.current.reset();
        },
        (error) => {
          console.log("FAILED...", error.text);
          setLoading(false);
        }
      );
  };

  return (
    <main id="contact" className="pt-10 lg:mx-6">
      <motion.section
        className="flex justify-center items-center gap-2"
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
        <h1 className="text-2xl md:text-4xl font-semibold">CONTACT</h1>
        <div className="h-1 w-10 md:w-20 bg-slate-300"></div>
      </motion.section>
      <section className="md:flex justify-between mt-10 px-7 w-full">
        <section className="mb-5 W-[30%]">
          <h1 className="text-3xl md:text-7xl md:max-w-md font-semibold">
            Let’s work together
          </h1>

          <div className="mt-3">
            <h1 className="text-xl flex items-center gap-2">
              <IoCall />
              Phone
            </h1>
            <p>
              <a
                href="tel:+2349048401533"
                className="text-blue-500 hover:underline"
              >
                +234 9048 40153 3
              </a>
            </p>
          </div>
        </section>

        <motion.section
          className=" md:w-[70%]"
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
          <form
            className="flex flex-col gap-5 w-full"
            ref={form}
            onSubmit={sendEmail}
          >
            <input
              type="text"
              name="user_name"
              id=""
              placeholder="Name"
              className="p-2  outline-none bg-transparent border"
              required
            />
            <input
              type="email"
              name="user_email"
              id=""
              className="p-2  outline-none bg-transparent border"
              placeholder="Email"
              required
            />
            <textarea
              name="message"
              id=""
              cols="30"
              rows="10"
              className="p-2  outline-none bg-transparent border resize-none"
              placeholder="Message"
              required
            ></textarea>
            <button
              className=" bg-yellow-400 py-4 text-black font-semibold text-xl flex justify-center"
              value="Send"
            >
              {loading ? <Loader /> : "Submit"}
            </button>
          </form>
        </motion.section>
        <Success open={open} setOpen={setOpen} handleOpen={handleOpen} />
      </section>
    </main>
  );
};
