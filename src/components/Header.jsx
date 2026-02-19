const CATEGORIES = [
  { key: "fiction", label: "FICTION" },
  { key: "art",     label: "ART" },
  { key: "video",   label: "VIDEO" },
];

function CornerMarks() {
  return (
    <>
      <span className="cornerMark cornerMark--tl" aria-hidden="true" />
      <span className="cornerMark cornerMark--tr" aria-hidden="true" />
      <span className="cornerMark cornerMark--bl" aria-hidden="true" />
      <span className="cornerMark cornerMark--br" aria-hidden="true" />
    </>
  );
}

export default function Header({ onHome, onNavigate, mode, category, title }) {
  return (
    <div className="topBarOnlyTitle">
      <span className="brandText" onClick={onHome} role="button" tabIndex={0}>
        被寫體
      </span>

      {mode === "list" && (
        <div className="headerBox headerBox--list">
          <CornerMarks />
          {CATEGORIES.map(({ key, label }) => (
            <span
              key={key}
              className={`headerNavItem${category === key ? " headerNavItem--active" : ""}`}
              onClick={() => onNavigate(key)}
              role="button"
              tabIndex={0}
            >
              {label}
            </span>
          ))}
        </div>
      )}

      {mode === "detail" && title && (
        <div className="headerBox">
          <CornerMarks />
          {title}
        </div>
      )}
    </div>
  );
}