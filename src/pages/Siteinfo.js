import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Siteinfo.module.css";

const Siteinfo = () => {
  return (
    <div>
      <nav>
        <Link to="/sub2" style={{ textDecoration: "none" }}>
          <div className={styles.arrow}>←</div>
        </Link>
        <div className={styles.name}>사이트 상세 요약</div>
        <div className={styles.close}>⨉</div>
      </nav>

      <div className={styles.backGround}>
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
        <div className={styles.boxing}>
          <div className={styles.detailBox}>
            <p className={styles.detailIndex}>방문 시간</p>
            <p className={styles.detailDes}>2024.5.30 19:30:27</p>
          </div>

          <div className={styles.detailBox}>
            <p className={styles.detailIndex}>위험 가능성</p>
            <p className={styles.detailDes}>바이러스/트레킹/악성코드</p>
          </div>

          <div className={styles.detailBox}>
            <p className={styles.detailIndex}>페이지 주요 정보</p>
            <p className={styles.detailDes}>
              해당 사이트는 불법 투자를 다루는 사이트로 판단되며 사용자의
              개인정보 유출을 유도합니다. 사이트는 주로 고수익 투자 기회를
              가장하여 사용자로 하여금 민감한 금융 정보를 제공하도록 돕습니다.
            </p>
            <p className={styles.detailOrg}>
              ㆍ 중국의 불법 투자 조직: 이 사이트는 중국에 기반을 둔 불법 투자
              조직과 연계되어 있으며, 가짜 투자 상품을 통해 사용자의 돈을
              갈취하는 데 목적이 있습니다.
              <br />ㆍ 가짜 투자 상품 광고: 사용자를 유인하기 위해 주식,
              암호화폐, 부동산 등 다양한 가짜 투자 상품을 광고합니다.
              <br />ㆍ 고수익 보장: 사이트는 사용자가 고수익을 쉽게 얻을 수
              있다고 속이며, 투자 시 높은 수익률을 약속합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Siteinfo;
