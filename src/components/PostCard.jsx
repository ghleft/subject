export default function PostCard({ post, onClick }) {
  const tags = Array.isArray(post.tag) ? post.tag : post.tag ? [post.tag] : [];
  return (
    <div className="list-item" onClick={onClick} role="button" tabIndex={0}>
      {tags.length > 0 && (
        <div className="item-tags">
          {tags.map((t) => (
            <span key={t} className="item-tag">{t}</span>
          ))}
        </div>
      )}
      <div className="item-left">
        <div className="item-title">{post.title}</div>
      </div>
      <div className="item-author">{post.author}</div>
    </div>
  );
}