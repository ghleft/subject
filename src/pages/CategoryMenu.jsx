import bg03 from "../assets/bg_03.png";
import bg04 from "../assets/bg_04.png";

const CATEGORIES = [
  { key: "fiction", label: "FIC" },
  { key: "art",     label: "ART" },
  { key: "video",   label: "VID" },
];

export default function CategoryMenu({ onPickCategory }) {
  return (
    <div className="page-container page-container--home">
      <div className="homeStage">
        <div className="logoWrap">
          <img className="logoBg" src={bg03} alt="" aria-hidden="true" />
          <img className="logoFg" src={bg04} alt="logo" />
          <span className="logoLabel logoLabel--left">ONE FRAME</span>
          <span className="logoLabel logoLabel--right">INFINITE VIEWS</span>
        </div>
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