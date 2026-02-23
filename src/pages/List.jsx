import { useEffect, useMemo, useState } from "react";
import PostCard from "../components/PostCard";
import BigCategoryLabel from "../components/BigCategoryLabel";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getPostsByCategory } from "../content/posts";

const MiniNav = ({ category, onNavigate }) => (
  <div className="miniCategoryBar">
    {["fiction", "art", "video", "review"].map((cat) => {
      const isActive = category === cat;
      const isReview = cat === "review";
      const reviewMode = category === "review";
      let style = {};
      if (isActive && isReview) {
        style = { background: "#1735D4", color: "#39E841" };
      } else if (isActive) {
        style = { background: "#1735D4", color: "#FB6C40" };
      } else if (isReview) {
        style = { background: "#39E841", color: "#1735D4" };
      } else if (reviewMode) {
        style = { background: "#39E841", color: "#1735D4" };
      } else {
        style = { background: "#FB6C40", color: "#1735D4" };
      }
      return (
        <button key={cat} className="miniCategoryBtn" style={style} onClick={() => onNavigate(cat)}>
          {cat === "fiction" ? "FIC" : cat === "art" ? "ART" : cat === "video" ? "VID" : "REV"}
        </button>
      );
    })}
  </div>
);

function ReviewCard({ post }) {
  const [markdown, setMarkdown] = useState("");
  useEffect(() => {
    let alive = true;
    if (!post.bodyUrl) return;
    fetch(post.bodyUrl)
      .then((r) => r.text())
      .then((t) => { if (alive) setMarkdown(t); })
      .catch(() => { if (alive) setMarkdown("내용을 불러오지 못했습니다."); });
    return () => { alive = false; };
  }, [post.bodyUrl]);

  return (
    <div className="reviewCard">
      <div className="reviewCard__header">
        <div className="reviewCard__title">{post.title}</div>
      </div>
      <div className="reviewCard__body">
        {markdown
          ? markdown.split("\n").map((line, i) => <p key={i}>{line}</p>)
          : <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "13px" }}>내용 준비 중</p>
        }
      </div>
    </div>
  );
}

const ReviewList = ({ posts }) => (
  <div className="reviewList">
    {posts.map((p) => <ReviewCard key={p.id} post={p} />)}
  </div>
);

export default function List({ category, onHome, onNavigate, onBackMenu, onOpenDetail }) {
  const posts = useMemo(() => getPostsByCategory(category), [category]);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [listVisible, setListVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setHeaderVisible(true), 50);
    const t2 = setTimeout(() => setListVisible(true), 450);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!category) {
    return (
      <div className="page-container">
        <Header onHome={onHome} mode="list" />
        <button className="linkButton" onClick={onBackMenu}>← menu</button>
        <Footer />
      </div>
    );
  }

  const isReview = category === "review";
  const isVideo = category === "video";
  const videoPost = isVideo && posts.length > 0 ? posts[0] : null;
  const videoTags = videoPost ? (Array.isArray(videoPost.tag) ? videoPost.tag : videoPost.tag ? [videoPost.tag] : []) : [];

  return (
    <div className="page-container page-container--with-logo list-page">
      <div style={{ opacity: headerVisible ? 1 : 0, transition: "opacity 0.8s" }}>
        <Header onHome={onHome} mode="list" category={category} />
      </div>
      <div style={{ opacity: listVisible ? 1 : 0, transition: "opacity 1.0s" }}>
        {/* bigCategoryLabel: detail-wrap과 완전히 동일한 구조 */}
        <div className="detail-wrap">
          <div className="listWrap" style={{ background: "transparent" }}>
            <BigCategoryLabel category={category} />
            <div className="detailTitleBar" style={{ opacity: 0, pointerEvents: "none" }}>placeholder</div>
          </div>
        </div>

        {/* 미니바 + 리스트 */}
        <div className="listWithNav">
          <MiniNav category={category} onNavigate={onNavigate} />
          <div className={isReview ? "listWrap listWrap--review" : "listWrap"}>
            {isVideo && videoPost ? (
              <>
                <div className="list">
                  <div className="list-item list-item--no-click">
                    {videoTags.length > 0 && (
                      <div className="item-tags">
                        {videoTags.map((t) => <span key={t} className="item-tag">{t}</span>)}
                      </div>
                    )}
                    <div className="item-left">
                      <div className="item-title">{videoPost.title}</div>
                    </div>
                    <div className="item-author">{videoPost.author}</div>
                  </div>
                </div>
                <div className="videoWrap videoWrap--attached">
                  <iframe
                    title={videoPost.title}
                    src={`https://www.youtube.com/embed/${videoPost.youtubeId}`}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                </div>
              </>
            ) : isReview ? (
              <ReviewList posts={posts} />
            ) : (
              <div className="list">
                {posts.map((p) => (
                  <PostCard key={p.id} post={p} onClick={() => onOpenDetail(p.id)} />
                ))}
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}