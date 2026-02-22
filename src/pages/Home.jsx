import { useRef, useEffect, useState } from "react";
import bg03 from "../assets/bg_03.png";
import bg04 from "../assets/bg_04.png";

export default function Home({ onLogoClick }) {
  const fgRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setScanning(true), 50);
    const t2 = setTimeout(() => setVisible(true), 400);
    const t3 = setTimeout(() => setScanning(false), 700);
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

  const slideStyle = {
    opacity: visible ? 1 : 0,
    transform: visible ? undefined : "translateY(18px)",
    transition: "opacity 0.5s 0.55s, transform 0.6s cubic-bezier(0.2, 0, 0, 1) 0.55s",
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
          <span className="logoLabel logoLabel--left" style={slideStyle}>ONE FRAME</span>
          <span className="logoLabel logoLabel--right" style={slideStyle}>INFINITE VIEWS</span>

          <div className="homeInfoBox homeInfoBox--above" style={{...slideStyle, bottom: "calc(100% + -10px)", left: "-20%", transform: visible ? "translateX(-50%)" : "translateX(-50%) translateY(18px)"}}>
            <span className="menuBoxCorner menuBoxCorner--tl" />
            <span className="menuBoxCorner menuBoxCorner--tr" />
            <span className="menuBoxCorner menuBoxCorner--bl" />
            <span className="menuBoxCorner menuBoxCorner--br" />
            2026
          </div>
          <div className="homeInfoBox homeInfoBox--below-left" style={{...slideStyle, top: "calc(100% + 20px)", left: "150%", transform: visible ? "translateX(-120%)" : "translateX(-120%) translateY(18px)"}}>
            <span className="menuBoxCorner menuBoxCorner--tl" />
            <span className="menuBoxCorner menuBoxCorner--tr" />
            <span className="menuBoxCorner menuBoxCorner--bl" />
            <span className="menuBoxCorner menuBoxCorner--br" />
            gyehyeon left
          </div>
          <div className="homeInfoBox homeInfoBox--below-right" style={{...slideStyle, top: "calc(100% + 90px)", left: "30%", transform: visible ? "translateX(20%)" : "translateX(20%) translateY(18px)"}}>
            <span className="menuBoxCorner menuBoxCorner--tl" />
            <span className="menuBoxCorner menuBoxCorner--tr" />
            <span className="menuBoxCorner menuBoxCorner--bl" />
            <span className="menuBoxCorner menuBoxCorner--br" />
            collaboration
          </div>
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