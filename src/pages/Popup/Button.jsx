import React from 'react';
import { useState } from 'react';
import { StyledButton } from './Popup.styled';

const Button = ({ isClicked, text, category }) => {
  const [clicked, setClicked] = useState(isClicked);
  const handleClick = () => {
    setClicked((prev) => !prev);
  };
  return (
    <StyledButton className={clicked ? category : ''} onClick={handleClick}>
      {text}
    </StyledButton>
  );
};

export default Button;
