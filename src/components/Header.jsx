import bg03 from "../assets/bg_03.webp";
import bg04 from "../assets/bg_04.webp";

export default function Header({ onHome, mode, title, category }) {
  return (
    <div className="topBarOnlyTitle">
      <div className="headerInner">
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

      </div>
    </div>
  );
}