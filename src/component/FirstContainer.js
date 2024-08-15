import React, { Component } from "react";
import styles from "./FirstContainer.module.css";

class FirstContainer extends Component {
  render() {
    return (
      <div className={styles.siteListContainer}>
        <div className={styles.siteInfo}>
          <div className={styles.siteNew}>new</div>
          <p className={styles.siteTime}>4분 전</p>
          <p className={styles.dot}>·</p>
          <p className={styles.siteType}>댓글</p>
        </div>
        <p className={styles.siteDetail}>
          Live2D Official VTuber App #nizimaLIVE✨New Feature : Hand Tracking👋
        </p>
        <div className={styles.linkTag}>
          <div className={styles.linkThumbNail}></div>
          <div className={styles.typeDetail}>
            <p className={styles.linkType}>X. 무슨 일이 일어나고 있나요?</p>
            <p className={styles.linkDetail}>https://x.com/?lang=ko</p>
          </div>
        </div>
      </div>
    );
  }
}
export default FirstContainer;
