import { Navbar } from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export const PageLayout = () => {
  return (
    <>
      <section className="main-section" id="home">
        <Navbar />
      </section>
      <div>
        <Outlet />
      </div>
    </>
  );
};
