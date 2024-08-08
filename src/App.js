import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Homepage from "./pages/HomePage";
import Filtering from "./pages/Filtering";
import Fishing from "./pages/Fishing";
import Siteinfo from "./pages/Siteinfo";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <RouteTransition />
    </div>
  );
};

const RouteTransition = () => {
  const location = useLocation();
  const [prevPath, setPrevPath] = useState(location.pathname);
  const [animateMenu, setAnimateMenu] = useState(false);

  useEffect(() => {
    if (prevPath === "/sub" && location.pathname === "/sub2") {
      setAnimateMenu(true);
      setTimeout(() => setAnimateMenu(false), 300); // 애니메이션 시간과 일치
    }
    setPrevPath(location.pathname);
  }, [location, prevPath]);

  const getTransitionClass = () => {
    if (prevPath === "/sub" && location.pathname === "/sub2") {
      return "none"; // 'sub' to 'sub2' - no animation
    } else if (prevPath === "/sub2" && location.pathname === "/sub3") {
      return "fade"; // 'sub2' to 'sub3' - apply fade animation
    } else if (prevPath === "/sub3" && location.pathname === "/sub2") {
      return "fade"; // 'sub3' to 'sub2' - apply fade animation
    } else if (prevPath === "/sub" && location.pathname === "/sub3") {
      return "fade"; // 'sub' to 'sub3' - apply fade animation
    } else if (prevPath === "/sub3" && location.pathname === "/sub") {
      return "fade"; // 'sub3' to 'sub' - apply fade animation
    } else if (
      prevPath === "/sub2" &&
      (location.pathname === "/sub" || location.pathname === "/sub3")
    ) {
      return "none"; // 'sub2' to 'sub' or 'sub3' - no animation
    } else {
      return "fade"; // Default fade animation
    }
  };

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames={getTransitionClass()}
        timeout={300}
      >
        <div>
          <Routes location={location}>
            <Route path="/" element={<Homepage />} />
            <Route path="/sub" element={<Filtering />} />
            <Route path="/sub2" element={<Fishing />} />
            <Route path="/sub3" element={<Siteinfo />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default App;
