import { useEffect, useRef, useState } from "react";

const CATEGORIES = [
  { key: "fiction", label: "FICTION", style: { top: "-30px",  left: "-50px",  width: "200px", height: "145px" } },
  { key: "art",     label: "ART",     style: { top: "90px",   left: "60px",   width: "200px", height: "145px" } },
  { key: "video",   label: "VIDEO",   style: { top: "210px",  left: "170px",  width: "200px", height: "145px" } },
];

// menuGroup 중앙 기준 각 박스의 목표 위치 중심점 계산
// menuGroup: 320x300, 각 박스: 200x120
// 중앙으로 모일 때의 위치: menuGroup 중앙 - 박스 크기의 절반
const CENTER_TOP  = (300 / 2) - (145 / 2); // 77.5px
const CENTER_LEFT = (320 / 2) - (200 / 2); // 60px

function CornerBox({ children, onSelect, style, entered, animating }) {
  const canvasRef = useRef(null);
  const frameRef  = useRef(null);
  const activeRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const w = canvas.width;
    const h = canvas.height;
    const draw = () => {
      if (activeRef.current) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, w, h);
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            if (Math.random() > 0.5) {
              ctx.fillStyle = `rgba(57, 232, 65, ${0.25 + Math.random() * 0.25})`;
              ctx.fillRect(x, y, 1, 1);
            }
          }
        }
      } else {
        canvas.getContext('2d').clearRect(0, 0, w, h);
      }
      frameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  const isHoverDevice = window.matchMedia('(hover: hover)').matches;
  const handleClick = () => {
    if (isHoverDevice) {
      // PC: 바로 이동
      activeRef.current = false;
      onSelect();
    } else {
      // 모바일: 지글지글 후 이동
      activeRef.current = true;
      setTimeout(() => { activeRef.current = false; onSelect(); }, 400);
    }
  };
  const handleMouseEnter = () => { if (isHoverDevice && !animating) activeRef.current = true; };
  const handleMouseLeave = () => { if (isHoverDevice) activeRef.current = false; };

  const w = parseInt(style.width) * 4;
  const h = parseInt(style.height) * 4;

  const currentTop  = entered ? style.top  : `${CENTER_TOP}px`;
  const currentLeft = entered ? style.left : `${CENTER_LEFT}px`;

  return (
    <div
      className="menuBox"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      style={{
        position: "absolute",
        width: style.width,
        height: style.height,
        top: currentTop,
        left: currentLeft,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: entered ? 1 : 0,
        transition: `top 0.55s 0.5s cubic-bezier(0.2,0,0,1), left 0.55s 0.5s cubic-bezier(0.2,0,0,1), opacity 0.3s 0.2s`,
      }}
    >
      <canvas
        ref={canvasRef}
        width={w}
        height={h}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
      />
      <span className="menuBoxCorner menuBoxCorner--tl" />
      <span className="menuBoxCorner menuBoxCorner--tr" />
      <span className="menuBoxCorner menuBoxCorner--bl" />
      <span className="menuBoxCorner menuBoxCorner--br" />
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </div>
  );
}

export default function CategoryMenu({ onPickCategory }) {
  const [entered, setEntered] = useState(false);
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setEntered(true), 50);
    const t2 = setTimeout(() => setAnimating(false), 700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="menuStage">
      <div className="menuGroup">
        {CATEGORIES.map(({ key, label, style }, i) => (
          <CornerBox
            key={key}
            onSelect={() => onPickCategory(key)}
            style={style}
            entered={entered}
            animating={animating}
          >
            {label}
          </CornerBox>
        ))}
      </div>
    </div>
  );
}