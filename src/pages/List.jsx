import { useEffect, useMemo, useState } from "react";
import PostCard from "../components/PostCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getPostsByCategory } from "../content/posts";

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
        <Header onHome={onHome} onNavigate={onNavigate} mode="list" category={category} />
        <button className="linkButton" onClick={onBackMenu}>← menu</button>
        <Footer />
      </div>
    );
  }

  return (
    <div className="page-container">
      <div style={{ opacity: headerVisible ? 1 : 0, transition: "opacity 0.8s" }}>
        <Header onHome={onHome} onNavigate={onNavigate} mode="list" category={category} />
      </div>

      <div style={{ opacity: listVisible ? 1 : 0, transition: "opacity 1.0s" }}>
        <div className="list">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} onClick={() => onOpenDetail(p.id)} />
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}