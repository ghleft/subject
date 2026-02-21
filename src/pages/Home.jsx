import { useRef, useEffect, useState } from "react";
import bg03 from "../assets/bg_03.png";
import bg04 from "../assets/bg_04.png";

export default function Home({ onLogoClick }) {
  const fgRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setScanning(true), 50);   // 스캔 시작
    const t2 = setTimeout(() => setVisible(true), 400);   // 로고 등장 (스캔 중)
    const t3 = setTimeout(() => setScanning(false), 700); // 스캔 완전히 끝난 후 제거
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleClick = () => {
    const el = fgRef.current;
    if (!el) return;
    el.classList.add("logoFg--pop");
    el.addEventListener("animationend", () => {
      el.classList.remove("logoFg--pop");
      onLogoClick();
    }, { once: true });
  };

  const labelStyle = {
    opacity: visible ? 1 : 0,
    transition: "opacity 0.5s 0.55s",
  };

  return (
    <div className="page-container page-container--home">
      <div className="homeStage">
        <div className="logoWrap">
          {scanning && <div className="scanLine scanLine--go" />}
          <img
            className="logoBg"
            src={bg03} alt="" aria-hidden="true"
            style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s" }}
          />
          <img
            className="logoFg"
            ref={fgRef}
            src={bg04} alt="logo"
            onClick={handleClick}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "scale(1)" : "scale(1.2)",
              transition: "opacity 0.5s, transform 0.6s cubic-bezier(0.2, 0, 0, 1)",
            }}
          />
          <span className="logoLabel logoLabel--left" style={labelStyle}>ONE FRAME</span>
          <span className="logoLabel logoLabel--right" style={labelStyle}>INFINITE VIEWS</span>
        </div>
        <div
          className="menuSlot"
          aria-hidden="true"
          style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s" }}
        />
      </div>
    </div>
  );
}