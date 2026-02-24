import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Header from "../components/Header";
import BigCategoryLabel from "../components/BigCategoryLabel";
import Footer from "../components/Footer";

const BOOK_URL = "https://msearch.shopping.naver.com/book/catalog/32462359900";
const CORRECT_PIN = "1796";
const STORAGE_KEY = "age_verified";

function AgeGate({ onUnlock }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (input.trim() === "") {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (input === CORRECT_PIN) {
      localStorage.setItem(STORAGE_KEY, "true");
      onUnlock();
    } else {
      alert("비밀번호가 일치하지 않습니다.");
      setInput("");
    }
  };

  return (
    <div className="bodyText ageGate">
      <p>해당 포스트는 성인 인증 후 열람하실 수 있습니다.</p>
      <p>아래 도서 ISBN 뒷자리 4자리를 입력해주세요.</p>
      <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" className="ageGate__bookBtn">도서 링크</a>
      <form onSubmit={handleSubmit} className="ageGate__inputRow">
        <input
          className="ageGate__input"
          type="password"
          inputMode="numeric"
          style={{ fontSize: "16px" }}
          maxLength={4}
          placeholder=""
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="ageGate__btn" type="submit">확인</button>
      </form>
    </div>
  );
}

export default function Detail({ post, onBack, onHome, onNavigate }) {
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [unlocked, setUnlocked] = useState(
    () => localStorage.getItem(STORAGE_KEY) === "true"
  );

  const isLocked = post?.tag2?.length > 0;

  const scrollToTop = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    // localStorage에 인증 기록이 있으면 잠금 해제 유지
    if (localStorage.getItem(STORAGE_KEY) !== "true") {
      setUnlocked(false);
    }
    const t1 = setTimeout(() => setHeaderVisible(true), 50);
    const t2 = setTimeout(() => setContentVisible(true), 450);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [post]);

  useEffect(() => {
    let alive = true;
    async function load() {
      setMarkdown("");
      if (!post) return;
      if (post.category === "fiction" && post.bodyUrl && (!isLocked || unlocked)) {
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
  }, [post, unlocked, isLocked]);

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
    <div className="page-container detail-page">
      <div style={{ opacity: headerVisible ? 1 : 0, transition: "opacity 0.8s" }}>
        <Header onHome={onHome} mode="detail" />
      </div>
      <div style={{ opacity: contentVisible ? 1 : 0, transition: "opacity 1.0s" }}>
        <div className="detail-wrap">
          <div className="listWrap" style={{ borderTop: "none", borderBottom: "none" }}>
            <BigCategoryLabel category={post.category} onClick={onNavigate} />
            <div className="detailTitleBar">{post.title}</div>
          </div>
        </div>
        {post.category === "fiction" && (
          isLocked && !unlocked
            ? <AgeGate key={post.id || post.title} onUnlock={() => setUnlocked(true)} />
            : <div className="bodyText">
                {loading && <div className="muted">loading...</div>}
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{markdown}</ReactMarkdown>
              </div>
        )}
        {post.category === "art" && (
          post.images
            ? post.images.map((img, i) => (
                <img key={i} className="artImage" src={img} alt={`${post.title} ${i + 1}`} />
              ))
            : <img className="artImage" src={post.imageUrl} alt={post.title} />
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
        <div className="floatButtons" style={{ display: isLocked && !unlocked ? "none" : "flex" }}>
          <button className="floatBtn floatBtn--back" onClick={() => { document.documentElement.scrollTop = 0; document.body.scrollTop = 0; window.scrollTo(0, 0); onBack(); }}>&#8963;</button>
          <button className="floatBtn" onClick={scrollToTop}>&#8963;</button>
        </div>
        <Footer />
      </div>
    </div>
  );
}