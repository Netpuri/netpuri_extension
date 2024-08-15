import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";
import staticImage from "./staticImage.png";
import useStore from "../component/Buttoncolor";

const Homepage = () => {
  const [isFiltering, setIsFiltering] = useState(false);
  const toggleSwitch = () => {
    setIsFiltering((prev) => !prev);
  };

  const buttonNames = [
    "혐오",
    "정치",
    "광고",
    "비방",
    "음란",
    "폭력",
    "도박",
    "불법",
    "우울",
    "자살",
  ];

  const selectedButtons = useStore((state) => state.selectedButtons);
  const setSelectedButtons = useStore((state) => state.setSelectedButtons);

  const buttonClick = (buttonName) => {
    setSelectedButtons(buttonName);
  };

  return (
    <div>
      <nav>
        <div className={styles.name}>WebCleanser</div>
        <div className={styles.close}>⨉</div>
      </nav>

      <div className={styles.switchContainer}>
        <div className={styles.menuContainer}>
          <p className={styles.title}>필터링</p>

          <div className={styles.para}>
            <div className={styles.Details}>
              <p className={styles.title2}>사회적 유해</p>
              <p className={styles.des}>혐오 발언과 정치적 선전 및 조작 검열</p>
            </div>
            <div id="buttons">
              {buttonNames.slice(0, 4).map((buttonName) => (
                <button
                  key={buttonName}
                  className={styles.homeButtons}
                  onClick={() => buttonClick(buttonName)}
                  style={{
                    backgroundColor: selectedButtons.includes(buttonName)
                      ? "#FFD2D7"
                      : "#FFFFFF",
                    color: selectedButtons.includes(buttonName)
                      ? "#FF485D"
                      : "#9C9C9C",
                  }}
                >
                  {buttonName}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.para}>
            <div className={styles.Details}>
              <p className={styles.title2}>불법 및 위험</p>
              <p className={styles.des}>
                법적으로 금지되거나 사회적으로 유해한 콘텐츠 검열
              </p>
            </div>
            <div id="buttons">
              {buttonNames.slice(4, 8).map((buttonName) => (
                <button
                  key={buttonName}
                  className={styles.homeButtons}
                  onClick={() => buttonClick(buttonName)}
                  style={{
                    backgroundColor: selectedButtons.includes(buttonName)
                      ? "#FFD2D7"
                      : "#FFFFFF",
                    color: selectedButtons.includes(buttonName)
                      ? "#FF485D"
                      : "#9C9C9C",
                  }}
                >
                  {buttonName}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.para}>
            <div className={styles.Details}>
              <p className={styles.title2}>정신적 위험</p>
              <p className={styles.des}>
                정신 건강에 악영향을 미칠 수 있는 콘텐츠 검열
              </p>
            </div>
            <div id="buttons">
              {buttonNames.slice(8, 10).map((buttonName) => (
                <button
                  key={buttonName}
                  className={styles.homeButtons}
                  onClick={() => buttonClick(buttonName)}
                  style={{
                    backgroundColor: selectedButtons.includes(buttonName)
                      ? "#AAF2E1"
                      : "#FFFFFF",
                    color: selectedButtons.includes(buttonName)
                      ? "#00BB8F"
                      : "#9C9C9C",
                  }}
                >
                  {buttonName}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.fishingDetect}>
          <p className={styles.fishingSite}>피싱 사이트 감지</p>
          <div
            className={`${styles.switch} ${isFiltering ? styles.on : ""}`}
            onClick={toggleSwitch}
          >
            <div className={styles.toggle}></div>
          </div>
        </div>
      </div>

      <div className={styles.staticsInfo}>
        <p className={styles.static}>통계</p>
        <Link to="/sub" style={{ textDecoration: "none" }}>
          <img src={staticImage} className={styles.image} />
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
