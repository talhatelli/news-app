import Image from "next/image";

export default function MenuBurger({ toggleSidebar }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
        padding: "30px 10px",
        zIndex: "1001",
      }}
      onClick={toggleSidebar}
    >
      <Image
        src="/icons/menu-burger-icon.svg"
        alt="Menu Burger"
        width={30}
        height={30}
      />
    </div>
  );
}
