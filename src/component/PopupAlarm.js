import React, { useState } from "react";
import styles from "./PopupAlarm.module.css"; // 스타일 파일 경로

function PopupAlarm() {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div>
      {isVisible && (
        <div className={styles.offAlarm}>
          <p className={styles.closeButton} onClick={handleClose}>
            ⨉
          </p>
          <div className={styles.block}>
            <p className={styles.blockAlarm}>
              피싱사이트 차단이 현재 꺼져있습니다.
            </p>
            <p className={styles.blockDetail}>
              개인정보 보호를 위해 피싱사이트 차단 활성화를 추천합니다.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PopupAlarm;
