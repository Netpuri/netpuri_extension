import React, { Component } from "react";
import styles from "./Logo.module.css";
class Fishingcontainer extends Component {
  render() {
    return (
      <div className={styles.container}>
        <p className={styles.logo}>WebCleanser</p>
        <p className={styles.closeButton}>⨉</p>
      </div>
    );
  }
}

export default Fishingcontainer;
