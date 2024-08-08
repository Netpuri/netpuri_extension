import React, { useState, useRef, useEffect } from 'react';
import './SlidingMenu.css';

const SlidingMenu = () => {
    const [selectedMenu, setSelectedMenu] = useState('phishingDetection');
    const menuRefs = {
        phishingDetection: useRef(null),
        filtering: useRef(null),
    };

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
    };

    useEffect(() => {
        const updateBarStyle = () => {
            const selectedRef = menuRefs[selectedMenu].current;
            if (selectedRef) {
                const bar = document.querySelector('.sliding-bar');
                bar.style.width = `${selectedRef.offsetWidth}px`;
                bar.style.left = `${selectedRef.offsetLeft}px`;
            }
        };

        updateBarStyle();
        window.addEventListener('resize', updateBarStyle);

        return () => {
            window.removeEventListener('resize', updateBarStyle);
        };
    }, [selectedMenu]);

    return (
        <div className="menu-container">
            <div
                className={`menu ${selectedMenu === 'phishingDetection' ? 'selected' : ''}`}
                ref={menuRefs.phishingDetection}
                onClick={() => handleMenuClick('phishingDetection')}
            >
                피싱 사이트 감지
            </div>
            <div
                className={`menu ${selectedMenu === 'filtering' ? 'selected' : ''}`}
                ref={menuRefs.filtering}
                onClick={() => handleMenuClick('filtering')}
            >
                필터링
            </div>
            <div className="sliding-bar"></div>
        </div>
    );
};

export default SlidingMenu;
