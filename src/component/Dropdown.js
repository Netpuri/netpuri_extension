import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import icon from "./dropdown.png";

const Dropdown = () => {
  const options = ["위험도순", "최신순", "오래된순"];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.label} onClick={() => setIsOpen(!isOpen)}>
        {selectedOption}
        <img src={icon} className={styles.icon} alt="아이콘" />
      </div>
      <ul className={`${styles.optionList} ${isOpen ? styles.open : ""}`}>
        {options.map((option, index) => (
          <li
            key={index}
            className={styles.option}
            onClick={() => handleSelect(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
