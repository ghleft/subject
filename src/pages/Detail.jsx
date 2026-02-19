import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Detail({ post, onBack, onHome }) {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let alive = true;

    async function load() {
      setMarkdown("");
      if (!post) return;

      if (post.category === "fiction" && post.bodyUrl) {
        setLoading(true);
        try {
          const res = await fetch(post.bodyUrl);
          const text = await res.text();
          if (alive) setMarkdown(text);
        } catch {
          if (alive) setMarkdown("본문을 불러오지 못했습니다.");
        } finally {
          if (alive) setLoading(false);
        }
      }
    }

    load();
    return () => { alive = false; };
  }, [post]);

  if (!post) {
    return (
      <div className="page-container">
        <Header onHome={onHome} mode="detail" />
        <p>없는 글입니다.</p>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-container">
      <Header onHome={onHome} mode="detail" title={post.title} />

      {post.category === "fiction" && (
        <div className="bodyText">
          {loading && <div className="muted">loading...</div>}
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      )}

      {post.category === "art" && (
        <img className="artImage" src={post.imageUrl} alt={post.title} />
      )}

      {post.category === "video" && (
        <div className="videoWrap">
          <iframe
            title={post.title}
            src={`https://www.youtube.com/embed/${post.youtubeId}`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      )}

      <Footer />
    </div>
  );
}