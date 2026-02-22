const CATEGORIES = [
  { key: "fiction", label: "FIC" },
  { key: "art",     label: "ART" },
  { key: "video",   label: "VID" },
];

export default function CategoryBar({ category, onNavigate }) {
  return (
    <div className="categoryBar">
      {CATEGORIES.map(({ key, label }) => (
        <button
          key={key}
          className={"categoryBarBtn" + (category === key ? " categoryBarBtn--active" : "")}
          onClick={() => onNavigate(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}