import Image from "next/image";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Image
        src={"/icons/loading.gif"}
        alt="Loading..."
        width={100}
        height={100}
      />
      <h2
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        Loading
      </h2>
    </div>
  );
}
