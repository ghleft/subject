import { useEffect, useMemo, useState } from "react";
import Home from "./pages/Home";
import CategoryMenu from "./pages/CategoryMenu";
import List from "./pages/List";
import Detail from "./pages/Detail";
import { getPostById } from "./content/posts";

export const VIEWS = {
  HOME: "home",
  MENU: "menu",
  LIST: "list",
  DETAIL: "detail",
};

function pushView(stateObj) {
  window.history.pushState(stateObj, "", window.location.pathname);
}
function replaceView(stateObj) {
  window.history.replaceState(stateObj, "", window.location.pathname);
}

export default function App() {
  const [view, setView] = useState(VIEWS.HOME);
  const [category, setCategory] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const post = useMemo(() => {
    if (!selectedId) return null;
    return getPostById(selectedId);
  }, [selectedId]);

  useEffect(() => {
    const s = window.history.state;
    if (s?.view === VIEWS.MENU || s?.view === VIEWS.LIST || s?.view === VIEWS.DETAIL) {
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

  const openMenu = () => {
    setView(VIEWS.MENU);
    pushView({ view: VIEWS.MENU, category: null, selectedId: null });
  };
  const closeMenu = () => setView(VIEWS.HOME);

  const openList = (cat) => {
    const isAlreadyInList = view === VIEWS.LIST;
    setCategory(cat);
    setSelectedId(null);
    setView(VIEWS.LIST);
    if (isAlreadyInList) {
      replaceView({ view: VIEWS.LIST, category: cat, selectedId: null });
    } else {
      pushView({ view: VIEWS.LIST, category: cat, selectedId: null });
    }
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

  useEffect(() => {
    const isNoScroll = view === VIEWS.HOME || view === VIEWS.MENU;
    document.body.classList.toggle("no-scroll", isNoScroll);
    return () => document.body.classList.remove("no-scroll");
  }, [view]);

  if (view === VIEWS.HOME) return <Home onLogoClick={openMenu} />;
  if (view === VIEWS.MENU) return <CategoryMenu onPickCategory={openList} onClose={closeMenu} />;
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