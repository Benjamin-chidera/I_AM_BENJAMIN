import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./Cursor.css"; // Import the CSS file for cursor styles

export const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <motion.div
      className="cursor"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    ></motion.div>
  );
};
