import { Navbar } from "../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export const PageLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-20" id="home">
        <Outlet />
      </div>
    </>
  );
};
