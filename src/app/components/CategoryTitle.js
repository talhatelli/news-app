export default function CategoryTitle({ category }) {
  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  const lineWidth = formattedCategory.length * 13;

  return (
    <div
      style={{
        textAlign: "start",
        margin: "50px 0px 10px 100px",
      }}
    >
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
        {formattedCategory}
      </h1>
      <div
        style={{
          width: `${lineWidth}px`, // Set the line width dynamically
          height: "2px",
          backgroundColor: "#FF9F1C",
          margin: "1px 0",
        }}
      />
      <div
        style={{
          width: `${lineWidth}px`, // Set the line width dynamically
          height: "2px",
          backgroundColor: "#FF9F1C",
          margin: "1px 0",
        }}
      />
    </div>
  );
}
