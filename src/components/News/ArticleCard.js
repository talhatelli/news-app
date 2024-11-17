import "@/styles/news.css";

export default function ArticleCard({ article }) {
  return (
    <div className="article-card">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="article-card-image"
        />
      )}
      <div className="article-card-content">
        <h2 className="article-card-title">{article.title}</h2>
        <p className="article-card-description">{article.description}</p>
      </div>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="article-card-link"
      >
        Read More
      </a>
    </div>
  );
}
