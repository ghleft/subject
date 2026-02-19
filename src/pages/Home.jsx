import logo from "../logo.svg";

export default function Home({ onLogoClick }) {
  return (
    <div className="page-container page-container--home">
      <div className="homeStage">
        <img
          className="mainLogo"
          src={logo}
          alt="logo"
          onClick={onLogoClick}
        />
        <div className="menuSlot" aria-hidden="true" />
      </div>
    </div>
  );
}