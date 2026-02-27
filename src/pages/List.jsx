import { useEffect, useMemo, useState } from "react";
import PostCard from "../components/PostCard";
import BigCategoryLabel from "../components/BigCategoryLabel";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getPostsByCategory } from "../content/posts";

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
          : <p style={{ color: "rgba(0,0,0,0.4)", fontSize: "13px" }}></p>
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

const CATS = ["fiction", "art", "video", "review"];

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
  const catIdx = CATS.indexOf(category);
  const prevCat = CATS[(catIdx - 1 + CATS.length) % CATS.length];
  const nextCat = CATS[(catIdx + 1) % CATS.length];

  return (
    <div className="page-container page-container--with-logo list-page">
      <div style={{ opacity: headerVisible ? 1 : 0, transition: "opacity 0.8s" }}>
        <Header onHome={onHome} mode="list" category={category} />
      </div>
      <div style={{ opacity: listVisible ? 1 : 0, transition: "opacity 1.0s" }}>
        <div className="detail-wrap">
          <div className="listWrap" style={{ background: "transparent", borderTop: "none", borderBottom: "none" }}>
            <BigCategoryLabel category={category} />
            <div className="detailTitleBar" style={{ opacity: 0, pointerEvents: "none" }}>placeholder</div>
          </div>
        </div>

        <div className="listWrapOuter">
          <div className="listFloatButtons">
            <button className={`listFloatBtn listFloatBtn--prev${isReview ? " review" : ""}`} onClick={() => onNavigate(prevCat)}></button>
            <button className={`listFloatBtn listFloatBtn--next${isReview ? " review" : ""}`} onClick={() => onNavigate(nextCat)}></button>
          </div>
          <div className={isReview ? "listWrap listWrap--review" : "listWrap"} style={{ borderColor: isReview ? "#39E841" : "#FB6C40" }}>
            <span className="listWrapCorner listWrapCorner--tl" style={{ background: isReview ? "#39E841" : "#FB6C40" }} />
            <span className="listWrapCorner listWrapCorner--tr" style={{ background: isReview ? "#39E841" : "#FB6C40" }} />
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