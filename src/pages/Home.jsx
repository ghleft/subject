import logo from "../logo.svg";

export default function Home({ onLogoClick }) {
  return (
    <div className="page-container">
      <div className="homeStage">
        <img
          className="mainLogo"
          src={logo}
          alt="logo"
          onClick={onLogoClick}
        />
        {/* 메뉴가 열릴 공간 확보 (CategoryMenu와 레이아웃 높이 통일) */}
        <div className="menuSlot" aria-hidden="true" />
      </div>
    </div>
  );
}