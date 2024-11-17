import Image from "next/image";

export default function NoData() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "150px",
      }}
    >
      <Image
        src="/icons/no-data-icon.svg"
        alt="No Data"
        width={150}
        height={150}
      />
      <p style={{ marginTop: "10px" }}>
        This type of filtering is included in premium. Please create a premium
        membership.
      </p>
    </div>
  );
}
