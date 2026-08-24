import { useCollection } from "../lib/useRealtime.js";
import "../styles/pages.css";

function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function Blog() {
  const posts = useCollection("blog");
  const sorted = [...posts].sort((a, b) => b.publishedAt - a.publishedAt);

  return (
    <div className="page-blog">
      <section className="page-hero">
        <div className="container">
          <span className="section-label">Insights</span>
          <h1>News & Advice From Our Team</h1>
          <p>Hiring trends, workforce tips, and updates from Star Management Consultancy.</p>
        </div>
      </section>

      <section>
        <div className="container">
          {sorted.length === 0 ? (
            <div className="empty-state">No articles published yet.</div>
          ) : (
            <div className="card-grid">
              {sorted.map((post) => (
                <article className="info-card blog-card" key={post.id}>
                  <span className="blog-date">{formatDate(post.publishedAt)}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Blog;
