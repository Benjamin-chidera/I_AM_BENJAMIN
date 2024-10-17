/* eslint-disable react/prop-types */
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { useState } from "react";

// eslint-disable-next-line react/prop-types

const Experience = () => {
  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${
          id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    );
  }

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <main className="mx-6 lg:mx-12 pt-10">
      <p className=" my-5 font-bold text-lg">Experience</p>

      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)} className=" text-white">
          Click to view Projects
        </AccordionHeader>
        <AccordionBody>
          <ul className=" space-y-7">
            <li className="text-white">
              <p className=" mb-2">Project Name: Ghost Air Homes </p>

              <p className=" flex justify-between items-center gap-10 lg:gap-0 font-semibold">
                Company: WiiBi (Ghost Air)
                <span className=" ms-5 text-xs underline">
                  <a href="https://www.ghostair.homes/">Visit</a>
                </span>
              </p>
            </li>

            <li className="text-white">
              <p className=" mb-2">Project Name: Tech Studio Academy </p>

              <p className=" flex justify-between items-center gap-10 lg:gap-0 font-semibold">
                Company: Tech Studio Academy Lagos State
                <span className=" ms-5 text-xs underline">
                  <a href="https://techstudioacademy.com">Visit</a>
                </span>
              </p>
            </li>

            <li className="text-white">
              <p className=" mb-2">Project Name: 10x Revenue </p>

              <p className=" flex justify-between items-center gap-10 lg:gap-0 font-semibold">
                Company: Tech Studio Academy Lagos State
                <span className=" ms-5 text-xs underline">
                  <a href="https://10-x.vercel.app/">Visit</a>
                </span>
              </p>
            </li>

            <li className="text-white">
              <p className=" mb-2">Project Name: Skycom</p>

              <p className=" flex justify-between items-center gap-10 lg:gap-0 font-semibold">
                Company: Tech Studio Academy Lagos State
                <span className=" ms-5 text-xs underline">
                  <a href="https://skycom.vercel.app/">Visit</a>
                </span>
              </p>
            </li>

            <li className="text-white">
              <p className=" mb-2">Project Name: Curaflux</p>

              <p className=" flex justify-between items-center gap-10 lg:gap-0 font-semibold">
                Company: CuraFlux
                <span className=" ms-5 text-xs underline">
                  <a href="https://curaflux.netlify.app/">Visit</a>
                </span>
              </p>
            </li>
          </ul>
        </AccordionBody>
      </Accordion>
    </main>
  );
};

export default Experience;
