export default function PostCard({ post, onClick }) {
  const tag = post.tags?.[0];

  return (
    <div className="list-item" onClick={onClick} role="button" tabIndex={0}>
      {tag && <span className="item-tag">{tag}</span>}
      <div className="item-content">
        <div className="item-title">{post.title}</div>
        <div className="item-author">{post.author}</div>
      </div>
    </div>
  );
}