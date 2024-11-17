import Line from "../Dividers/Line";

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
      <Line lineWidth={`${lineWidth}`} lineHeight={2} />
      <Line lineWidth={`${lineWidth}`} lineHeight={2} />
    </div>
  );
}
