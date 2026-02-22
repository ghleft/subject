export default function BigCategoryLabel({ category, onClick }) {
  return (
    <div className="bigCategoryWrap">
      <button
        className={"bigCategoryLabel" + (category === "review" ? " bigCategoryLabel--review" : "")}
        onClick={onClick ? () => onClick(category) : undefined}
        style={{ cursor: onClick ? "pointer" : "default" }}
      >
        {category ? category.toUpperCase() : ""}
      </button>
    </div>
  );
}