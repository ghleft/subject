import logo from "../logo.svg";

const CATEGORIES = [
  { key: "fiction", label: "FIC" },
  { key: "art",     label: "ART" },
  { key: "video",   label: "VID" },
];

export default function CategoryMenu({ onPickCategory }) {
  return (
    <div className="page-container">
      <div className="homeStage">
        <img
          className="mainLogo"
          src={logo}
          alt="logo"
        />
        <div className="menuSlot">
          <div className="menuRow">
            {CATEGORIES.map(({ key, label }) => (
              <button
                key={key}
                className="menuLink"
                onClick={() => onPickCategory(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}