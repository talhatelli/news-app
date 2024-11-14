export default function ArticleCard({ article }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.4s ease",
        height: "100%",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
      )}
      <div style={{ padding: "15px", flex: "1" }}>
        <h2
          style={{
            fontSize: "1.5em",
            marginBottom: "10px",
            color: "#333",
          }}
        >
          {article.title}
        </h2>
        <p style={{ color: "#666", marginBottom: "15px" }}>
          {article.description}
        </p>
      </div>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          padding: "10px 0",
          backgroundColor: "#FA923D",
          color: "#fff",
          textAlign: "center",
          textDecoration: "none",
          borderTop: "1px solid #ddd",
          fontWeight: "bold",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#FFC085")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#FA923D")}
      >
        Read More
      </a>
    </div>
  );
}
