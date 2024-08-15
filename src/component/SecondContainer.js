import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./SecondContainer.module.css";

class SecondContainer extends Component {
  render() {
    return (
      <div className={styles.siteListContainer}>
        <Link to="/sub3" style={{ textDecoration: "none" }}>
          <div className={styles.siteContainer}>
            <div className={styles.siteThumbNail}></div>
            <div className={styles.detailsContainer}>
              <div className={styles.siteDetails}>
                일본 데이터 e심 - Google 검색
              </div>
              <div className={styles.siteLinks}>
                google.co.kr/search?q_src=google/jdkfjsdd
              </div>
            </div>
          </div>
        </Link>
        <div className={styles.buttonContainer}>
          <div className={styles.warningSign}>✓ 바이러스</div>
          <div className={styles.warningSign}>✓ 트래킹</div>
          <div className={styles.warningSign}>✓ 악성코드</div>
        </div>
      </div>
    );
  }
}

export default SecondContainer;
