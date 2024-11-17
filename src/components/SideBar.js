import React from "react";
import { useRouter } from "next/navigation";
import "../styles/side.css";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const router = useRouter();

  const navigateToPage = (path) => {
    router.push(path);
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "" : "closed"}`}>
      <h2>Menu</h2>
      <ul>
        <li onClick={() => navigateToPage("/")}>News</li>
        <li onClick={() => navigateToPage("/chart")}>News Graphics</li>
      </ul>
    </div>
  );
};

export default Sidebar;
