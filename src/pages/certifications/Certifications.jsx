import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

// eslint-disable-next-line react/prop-types
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

const Certifications = () => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <main className="mx-6 lg:mx-12 pt-10">
      <p className=" my-5 font-bold text-lg">Certifications</p>

      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)} className=" text-white">
          2024
        </AccordionHeader>
        <AccordionBody>
          <ul>
            <li className="text-white">
              <p>Backend development (NODEJS)</p>
              <p>
                Issued by: Tech Studio Academy Lagos State
                <span className=" ms-5 text-xs underline">
                  <a href="https://drive.google.com/file/d/1CjUM_9QfRC06KDb4IDqDls_GbtzwYtzp/view">
                    Show credential
                  </a>
                </span>
              </p>
            </li>

            <li className="mt-5 text-white">
              <p>Mern Stack (REACTJS & NODEJS)</p>
              <p>
                Issued by: Udemy
                <span className=" ms-5 text-xs underline">
                  <a href="https://drive.google.com/file/d/17du8jdMMi-iqx4ky6ITh8utxz_-yTn5K/view">
                    Show credential
                  </a>
                </span>
              </p>
            </li>

            <li className="mt-5 text-white">
              <p>Frontend Development (REACT NATIVE)</p>
              <p>
                Issued by: Udemy
                <span className=" ms-5 text-xs underline">
                  <a href="https://drive.google.com/file/d/1Oo8RC0RKK5opg3WmKijw_dQhafxD3ceS/view">
                    Show credential
                  </a>
                </span>
              </p>
            </li>
          </ul>
        </AccordionBody>
      </Accordion>

      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)} className=" text-white">
          2023
        </AccordionHeader>
        <AccordionBody>
          <ul>
            <li className="text-white">
              <p>Frontend web development (REACTJS)</p>
              <p>
                Issued by: New Horizon ICT Ikeja Lagos State{" "}
                <span className=" ms-5 text-xs underline">
                  <a href="https://drive.google.com/file/d/1exHobbcUAsoUo4G_WmStkgKHfxssY6oF/view">
                    Show credential
                  </a>
                </span>
              </p>
            </li>

            <li className="mt-5 text-white">
              <p>Frontend development (REACTJS)</p>
              <p>
                Issued by: Udemy
                <span className=" ms-5 text-xs underline">
                  <a href="https://drive.google.com/file/d/1sKqLLamwZiAd5KP1S1W0hjcm0QAbMxAa/view">
                    Show credential
                  </a>
                </span>
              </p>
            </li>
          </ul>
        </AccordionBody>
      </Accordion>
    </main>
  );
};

export default Certifications;
