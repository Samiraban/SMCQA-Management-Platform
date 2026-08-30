import { useState } from "react";
import { Calendar, Newspaper, ArrowRight, ArrowUp } from "lucide-react";
import { useCollection } from "../lib/useRealtime.js";
import "../styles/Blog.css";

function formatDate(ts) {
  return new Date(ts).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

function readMinutes(text = "") {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}

function Blog() {
  const posts = useCollection("blog");
  const sorted = [...posts].sort((a, b) => b.publishedAt - a.publishedAt);

  const [featuredOpen, setFeaturedOpen] = useState(false);
  const [openId, setOpenId] = useState(null);

  const featured = sorted[0];
  const rest = sorted.slice(1);

  return (
    <div className="blog2-page">
      {/* HERO */}
      <section className="blog2-hero">
        <div className="container">
          <span className="section-label">Insights</span>
          <h1>News &amp; Advice From Our Team</h1>
          <p>
            Hiring trends, workforce tips, and updates from Star Management
            Consultancy.
          </p>
        </div>
      </section>

      {sorted.length === 0 ? (
        <section className="blog2-grid-section">
          <div className="container">
            <div className="blog2-empty">
              <Newspaper size={40} />
              <h3>No articles published yet</h3>
              <p>Check back soon for hiring tips and company updates.</p>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* FEATURED POST */}
          <section className="blog2-featured">
            <div className="container">
              <article className="blog2-featured-card">
                <div
                  className="blog2-featured-visual"
                  style={
                    featured.image
                      ? { backgroundImage: `url(${featured.image})` }
                      : undefined
                  }
                >
                  <span className="blog2-featured-badge">Latest</span>
                  {!featured.image && (
                    <div className="blog2-featured-icon">
                      <Newspaper size={34} />
                    </div>
                  )}
                </div>

                <div className="blog2-featured-body">
                  <div className="blog2-meta">
                    {featured.category && (
                      <span className="blog2-tag">{featured.category}</span>
                    )}
                    <div className="blog2-author">
                      <span className="blog2-avatar">
                        {initials(featured.author || "SMC Team")}
                      </span>
                      <span>{featured.author || "SMC Team"}</span>
                    </div>
                    <span className="blog2-meta-divider" />
                    <span>
                      <Calendar
                        size={14}
                        style={{
                          verticalAlign: "-2px",
                          marginRight: 5,
                        }}
                      />
                      {formatDate(featured.publishedAt)}
                    </span>
                    <span className="blog2-meta-divider" />
                    <span>
                      {readMinutes(featured.body || featured.excerpt)} min
                      read
                    </span>
                  </div>

                  <h2>{featured.title}</h2>
                  <p>{featured.excerpt}</p>

                  {featuredOpen && featured.body && (
                    <p className="blog2-card-full">{featured.body}</p>
                  )}

                  {featured.body && (
                    <button
                      type="button"
                      className="blog2-readmore"
                      onClick={() => setFeaturedOpen((v) => !v)}
                    >
                      {featuredOpen ? "Show less" : "Read full article"}
                      {featuredOpen ? (
                        <ArrowUp size={16} />
                      ) : (
                        <ArrowRight size={16} />
                      )}
                    </button>
                  )}
                </div>
              </article>
            </div>
          </section>

          {/* GRID OF OTHER POSTS */}
          {rest.length > 0 && (
            <section className="blog2-grid-section">
              <div className="container">
                <h3 className="blog2-grid-heading">More Articles</h3>

                <div className="blog2-grid">
                  {rest.map((post) => {
                    const isOpen = openId === post.id;

                    return (
                      <article className="blog2-card" key={post.id}>
                        <div
                          className="blog2-card-visual"
                          style={
                            post.image
                              ? { backgroundImage: `url(${post.image})` }
                              : undefined
                          }
                        >
                          {post.category && (
                            <span className="blog2-card-tag">
                              {post.category}
                            </span>
                          )}
                          {!post.image && (
                            <div className="blog2-card-icon">
                              <Newspaper size={22} />
                            </div>
                          )}
                        </div>

                        <div className="blog2-card-body">
                          <div className="blog2-meta">
                            <span>
                              <Calendar
                                size={13}
                                style={{
                                  verticalAlign: "-2px",
                                  marginRight: 5,
                                }}
                              />
                              {formatDate(post.publishedAt)}
                            </span>
                            <span className="blog2-meta-divider" />
                            <span>
                              {readMinutes(post.body || post.excerpt)} min
                              read
                            </span>
                          </div>

                          <h3>{post.title}</h3>
                          <p>{post.excerpt}</p>

                          {isOpen && post.body && (
                            <p className="blog2-card-full">{post.body}</p>
                          )}

                          {post.body && (
                            <button
                              type="button"
                              className="blog2-readmore"
                              onClick={() =>
                                setOpenId(isOpen ? null : post.id)
                              }
                            >
                              {isOpen ? "Show less" : "Read more"}
                              {isOpen ? (
                                <ArrowUp size={15} />
                              ) : (
                                <ArrowRight size={15} />
                              )}
                            </button>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default Blog;