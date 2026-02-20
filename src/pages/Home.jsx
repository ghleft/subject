import bg03 from "../assets/bg_03.png";
import bg04 from "../assets/bg_04.png";

export default function Home({ onLogoClick }) {
  return (
    <div className="page-container page-container--home">
      <div className="homeStage">
        <div className="logoWrap" onClick={onLogoClick}>
          <img className="logoBg" src={bg03} alt="" aria-hidden="true" />
          <img className="logoFg" src={bg04} alt="logo" />
          <span className="logoLabel logoLabel--left">ONE FRAME</span>
          <span className="logoLabel logoLabel--right">INFINITE VIEWS</span>
        </div>
        <div className="menuSlot" aria-hidden="true" />
      </div>
    </div>
  );
}