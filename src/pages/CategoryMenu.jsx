import { useEffect, useRef, useState } from "react";

const CATEGORIES = [
  { key: "fiction", label: "FICTION", style: { top: "-222px", left: "-165px", width: "200px", height: "145px" } },
  { key: "art",     label: "ART",     style: { top: "-122px", left: "-35px",  width: "200px", height: "145px" } },
  { key: "video",   label: "VIDEO",   style: { top: "-22px",  left: "-165px", width: "200px", height: "145px" } },
  { key: "review",  label: "REVIEW",  style: { top: "78px",   left: "-35px",  width: "200px", height: "145px" } },
];

const CENTER_TOP  = -(145 / 2);
const CENTER_LEFT = -(200 / 2);

const PIXEL_SIZE = 1.5; // 모자이크 블록 크기

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
        for (let y = 0; y < h; y += PIXEL_SIZE) {
          for (let x = 0; x < w; x += PIXEL_SIZE) {
            if (Math.random() > 0.5) {
              ctx.fillStyle = `rgba(57, 232, 65, ${0.25 + Math.random() * 0.25})`;
              ctx.fillRect(x, y, PIXEL_SIZE, PIXEL_SIZE);
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
      activeRef.current = false;
      onSelect();
    } else {
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