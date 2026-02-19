import { useEffect, useMemo, useState } from "react";
import Home from "./pages/Home";
import CategoryMenu from "./pages/CategoryMenu";
import List from "./pages/List";
import Detail from "./pages/Detail";
import { getPostById } from "./content/posts";

// ── 뷰 상수 ──────────────────────────────────────────────
export const VIEWS = {
  HOME: "home",
  MENU: "menu",
  LIST: "list",
  DETAIL: "detail",
};

// ── 히스토리 헬퍼 ─────────────────────────────────────────
function pushView(stateObj) {
  window.history.pushState(stateObj, "", "/");
}
function replaceView(stateObj) {
  window.history.replaceState(stateObj, "", "/");
}

// ─────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState(VIEWS.HOME);
  const [category, setCategory] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const post = useMemo(() => {
    if (!selectedId) return null;
    return getPostById(selectedId);
  }, [selectedId]);

  // ── 새로고침 시 상태 복원 ─────────────────────────────────
  useEffect(() => {
    const s = window.history.state;

    if (s?.view === VIEWS.LIST || s?.view === VIEWS.DETAIL) {
      setView(s.view);
      setCategory(s.category ?? null);
      setSelectedId(s.selectedId ?? null);
      return;
    }

    setView(VIEWS.HOME);
    setCategory(null);
    setSelectedId(null);
    replaceView({ view: VIEWS.HOME, category: null, selectedId: null });
  }, []);

  // ── 브라우저 뒤/앞 이동 처리 ──────────────────────────────
  useEffect(() => {
    const onPop = (e) => {
      const s = e.state;
      if (!s?.view) return;
      setView(s.view);
      setCategory(s.category ?? null);
      setSelectedId(s.selectedId ?? null);
    };

    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // ── 네비게이션 핸들러 ─────────────────────────────────────
  const openMenu = () => setView(VIEWS.MENU);
  const closeMenu = () => setView(VIEWS.HOME);

  const openList = (cat) => {
    setCategory(cat);
    setSelectedId(null);
    setView(VIEWS.LIST);
    pushView({ view: VIEWS.LIST, category: cat, selectedId: null });
  };

  const openDetail = (id) => {
    setSelectedId(id);
    setView(VIEWS.DETAIL);
    pushView({ view: VIEWS.DETAIL, category, selectedId: id });
  };

  const goHome = () => {
    setView(VIEWS.HOME);
    setCategory(null);
    setSelectedId(null);
    pushView({ view: VIEWS.HOME, category: null, selectedId: null });
  };

  const goBack = () => window.history.back();

  // ── 렌더 ──────────────────────────────────────────────────
  if (view === VIEWS.HOME) {
    return <Home onLogoClick={openMenu} />;
  }

  if (view === VIEWS.MENU) {
    return <CategoryMenu onPickCategory={openList} onClose={closeMenu} />;
  }

  if (view === VIEWS.LIST) {
    return (
      <List
        category={category}
        onHome={goHome}
        onNavigate={openList}
        onBackMenu={closeMenu}
        onOpenDetail={openDetail}
      />
    );
  }

  return <Detail post={post} onBack={goBack} onHome={goHome} />;
}