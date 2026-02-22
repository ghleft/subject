export default function PostCard({ post, onClick }) {
  return (
    <div className="list-item" onClick={onClick} role="button" tabIndex={0}>
      {post.tag && <span className="item-tag">{post.tag}</span>}
      <div className="item-left">
        <div className="item-title">{post.title}</div>
      </div>
      <div className="item-author">{post.author}</div>
    </div>
  );
}