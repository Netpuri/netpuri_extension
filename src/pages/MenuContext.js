// src/MenuContext.js
import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
  const [selected, setSelected] = useState('A'); // 기본값을 'A'로 설정

  return (
    <MenuContext.Provider value={{ selected, setSelected }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
