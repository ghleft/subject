export default function BigCategoryLabel({ category, onClick }) {
  return (
    <div className="bigCategoryWrap">
      <button
        className="bigCategoryLabel menuBox"
        onClick={onClick ? () => onClick(category) : undefined}
        style={{ cursor: onClick ? "pointer" : "default" }}
      >
        <span className="menuBoxCorner menuBoxCorner--tl" />
        <span className="menuBoxCorner menuBoxCorner--tr" />
        <span className="menuBoxCorner menuBoxCorner--bl" />
        <span className="menuBoxCorner menuBoxCorner--br" />
        <span style={{ position: "relative", zIndex: 1 }}>
          {category ? category.toUpperCase() : ""}
        </span>
      </button>
    </div>
  );
}