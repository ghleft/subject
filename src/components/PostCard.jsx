export default function PostCard({ post, onClick }) {
  return (
    <div className="list-item" onClick={onClick} role="button" tabIndex={0}>
      <div className="item-tags">
        {post.tag1 && <span className="item-tag item-tag--adult"><span className="item-tag-text">{post.tag1}</span></span>}
        {post.tag2 && <span className="item-tag item-tag--normal"><span className="item-tag-text">{post.tag2}</span></span>}
        {post.tag3 && <span className="item-tag item-tag--normal"><span className="item-tag-text">{post.tag3}</span></span>}
      </div>
      <div className="item-content">
        <div className="item-title">{post.title}</div>
        <div className="item-author">{post.author}</div>
      </div>
    </div>
  );
}