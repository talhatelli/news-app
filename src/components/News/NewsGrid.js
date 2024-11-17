import ArticleCard from "./ArticleCard";
import "@/styles/news.css";

export default function NewsGrid({ articles }) {
  return (
    <div className="news-grid">
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article} />
      ))}
    </div>
  );
}
