import { React, useState, useEffect } from "react";
import Header from "../header/Header";
import { Sidebar } from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";

function ProLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full">
      <Header onToggleSidebar={toggleSidebar} />
      <div className="flex h-screen lg:pt-20 md:pt-16 sm:pt-14 pt-10">
        {isSidebarOpen && <Sidebar onClose={handleSidebarClose} />}
        <div className=" w-full overflow-y-auto bg-[#F8F8F8]">
          <div className="mt-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProLayout;
