import bg03 from "../assets/bg_03.png";
import bg04 from "../assets/bg_04.png";

const CATEGORIES = [
  { key: "fiction", label: "FIC" },
  { key: "art",     label: "ART" },
  { key: "video",   label: "VID" },
];

export default function Header({ onHome, onNavigate, mode, category, title }) {
  return (
    <div className="topBarOnlyTitle">
      <div className="headerInner">
        {/* 로고: pointer-events none으로 클릭 통과, 버튼만 클릭 가능 */}
        <div className="headerLogoWrap" style={{ pointerEvents: "none" }}>
          <img className="headerLogoBg" src={bg03} alt="" aria-hidden="true" />
          <img className="headerLogoFg" src={bg04} alt="logo" />
          <button
            className="headerLogoBtn"
            onClick={onHome}
            aria-label="홈으로"
            style={{ pointerEvents: "all" }}
          />
        </div>

        {mode === "detail" && title && (
          <div className="headerTitle">{title}</div>
        )}

        {mode === "list" && (
          <div className="headerNav">
            {CATEGORIES.map(({ key, label }, i) => (
              <>
                {i > 0 && <span key={key + "dot"} className="headerNavDot">·</span>}
                <button
                  key={key}
                  className={"headerNavBtn" + (category === key ? " headerNavBtn--active" : "")}
                  onClick={() => onNavigate(key)}
                >
                  {label}
                </button>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}