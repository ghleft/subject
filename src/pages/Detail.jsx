import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Header from "../components/Header";
import BigCategoryLabel from "../components/BigCategoryLabel";
import Footer from "../components/Footer";

export default function Detail({ post, onBack, onHome, onNavigate }) {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const scrollToTop = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const t1 = setTimeout(() => setHeaderVisible(true), 50);
    const t2 = setTimeout(() => setContentVisible(true), 450);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

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

  useEffect(() => {
    if (post?.category === "fiction" || post?.category === "art") {
      document.body.classList.add("detail-fiction");
    }
    return () => document.body.classList.remove("detail-fiction");
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
      <div style={{ opacity: headerVisible ? 1 : 0, transition: "opacity 0.8s" }}>
        <Header onHome={onHome} mode="detail" />
      </div>
      <div style={{ opacity: contentVisible ? 1 : 0, transition: "opacity 1.0s" }}>
        <div className="detail-wrap">
          <div className="listWrap">
            <BigCategoryLabel category={post.category} onClick={onNavigate} />
            <div className="detailTitleBar">{post.title}</div>
          </div>
        </div>
        {post.category === "fiction" && (
          <div className="bodyText">
            {loading && <div className="muted">loading...</div>}
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
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
        <div className="floatButtons">
          <button className="floatBtn floatBtn--back" onClick={() => { document.documentElement.scrollTop = 0; document.body.scrollTop = 0; window.scrollTo(0, 0); onBack(); }}>&#8963;</button>
          <button className="floatBtn" onClick={scrollToTop}>&#8963;</button>
        </div>
        <Footer />
      </div>
    </div>
  );
}