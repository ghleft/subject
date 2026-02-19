import { useMemo } from "react";
import PostCard from "../components/PostCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getPostsByCategory } from "../content/posts";

export default function List({ category, onHome, onNavigate, onBackMenu, onOpenDetail }) {
  const posts = useMemo(() => getPostsByCategory(category), [category]);

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
      <Header onHome={onHome} onNavigate={onNavigate} mode="list" category={category} />

      <div className="list">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} onClick={() => onOpenDetail(p.id)} />
        ))}
      </div>

      <Footer />
    </div>
  );
}