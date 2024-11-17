import React, { useState } from "react";
import Line from "@/components/Dividers/Line";
import MenuBurger from "@/components/MenuBurger";
import Sidebar from "@/components/Sidebar";

export default function AppTitle() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {" "}
      <MenuBurger toggleSidebar={toggleSidebar} />
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div
        style={{
          backgroundColor: "#F3F4F6",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          padding: "20px 0",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
            fontSize: "2.5em",
            cursor: "pointer",
            fontFamily: "Times New Roman",
            margin: 0,
          }}
        >
          THE{" "}
          <span
            style={{
              textAlign: "center",
              margin: "0 2px",
            }}
          >
            NEWS
            <Line lineWidth={125} lineHeight={4} />
          </span>
          APP
        </h1>
      </div>
    </div>
  );
}
