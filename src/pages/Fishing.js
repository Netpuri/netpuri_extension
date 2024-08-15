import React from "react";
import { Link } from "react-router-dom";
import styles from "./Fishing.module.css";
import Dropdown from "../component/Dropdown";
import Container from "../component/SecondContainer";
import Popup from "../component/PopupAlarm";
import Logo from "../component/Logo";

const Fishing = () => {
  return (
    <div className={styles.screen}>
      <Logo />
      <div className={styles.menuContainer}>
        <div className={styles.unselectedMenu}>
          <Link to="/sub" style={{ textDecoration: "none" }}>
            <div className={`${styles.menu} ${styles.filteringMenu}`}>
              필터링
            </div>
          </Link>
        </div>
        <div className={styles.selectedMenu}>
          <Link to="/sub2" style={{ textDecoration: "none" }}>
            <div className={`${styles.menu} ${styles.fishingMenu}`}>
              피싱 사이트 감지
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.container}>
        <Popup />

        <div className={styles.dropdownContainer}>
          <Dropdown />
        </div>

        <div className={styles.linkBox}>
          <div className={styles.scrollBar}>
            <Container />

            <Container />

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

export default Fishing;
