import React from "react";
import { Link } from "react-router-dom";
import styles from "./Filtering.module.css";
import Logo from "../component/Logo";
import Container from "../component/FirstContainer";
import useStore from "../component/Buttoncolor";

const Filtering = () => {
  const selectedButtons = useStore((state) => state.selectedButtons);

  const firstButtonNames = ["혐오", "정치", "광고", "비방"];
  const secondButtonNames = ["우울", "자살"];

  return (
    <div>
      <Logo />
      <div className={styles.menuContainer}>
        <div className={styles.selectedMenu}>
          <Link to="/sub" style={{ textDecoration: "none" }}>
            <div className={`${styles.menu} ${styles.filteringMenu}`}>
              필터링
            </div>
          </Link>
        </div>
        <div className={styles.unselectedMenu}>
          <Link to="/sub2" style={{ textDecoration: "none" }}>
            <div className={`${styles.menu} ${styles.fishingMenu}`}>
              피싱 사이트 감지
            </div>
          </Link>
        </div>
      </div>

      <div className={styles.backGround}>
        <div className={styles.buttonContainer}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <button className={styles.button}>전체</button>
            <button
              className={styles.button}
              style={{
                backgroundColor: selectedButtons.includes(firstButtonNames)
                  ? "#FFD2D7"
                  : "#FFFFFF",
                color: selectedButtons.includes(firstButtonNames)
                  ? "#FF485D"
                  : "#9C9C9C",
              }}
            >
              사회적 유해
            </button>
            <button className={styles.button}>불법 및 위험</button>
            <button className={styles.button}>정신적 위험</button>
          </Link>
        </div>

        <div className={styles.linkBox}>
          <div className={styles.scrollBar}>
            <Container />
            <Container />
            <Container />
            <Container />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filtering;
