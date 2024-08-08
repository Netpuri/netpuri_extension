
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Filtering.module.css';
import icon from './Icon.png';


const Filtering = () => {

    const [selectedMenu, setSelectedMenu] = useState('filtering');
    const [prevMenu, setPrevMenu] = useState('');
    const [animationClass, setAnimationClass] = useState('');
    const [animationKey, setAnimationKey] = useState(0);



    useEffect(() => {
        if (selectedMenu !== prevMenu) {
         const animation = selectedMenu === 'filtering' ? styles.slideLeft : styles.slideRight;
           

            setAnimationClass(animation);
            setAnimationKey(prevKey => prevKey + 1);

            const timer = setTimeout(() => {
                setAnimationClass('');
                setPrevMenu(selectedMenu);

            }, 500);

            return () => clearTimeout(timer);
        }
    }, [selectedMenu, prevMenu]);

    const handleMenuClick = (menu) => {
        if (menu !== selectedMenu) {
            setSelectedMenu(menu);
        }
    };


    return (

        <div>
            <nav>
                <div className={styles.name}>WebCleanser</div>
                <div className={styles.close}>⨉</div>
            </nav>

            <div className={styles.menuContainer}>
                <div
                    key={animationKey}
                    className={`${styles.selectedMenu} ${animationClass}`}
                    style={{ left: selectedMenu === 'filtering' ? '0%' : '50%' }}
                />
                <div className={styles.menu} onClick={() => handleMenuClick('filtering')}>
                    <Link to="/sub" style={{ textDecoration: 'none', color: selectedMenu === 'filtering' ? '#FFFFFF' : '#4B4B4B' }}>
                        필터링
                    </Link>
                </div>
                <div className={styles.menu} onClick={() => handleMenuClick('fishing')}>
                    <Link to="/sub2" style={{ textDecoration: 'none', color: selectedMenu === 'fishing' ? '#FFFFFF' : '#4B4B4B' }}>
                        피싱 사이트 감지
                    </Link>
                </div>
            </div>



            {/*     
 <div className={styles.menuContainer}>
                <div className={styles.selectedMenu}>
                    <Link to="/sub" style={{textDecoration: "none"}}>
                        <div className={`${styles.menu} ${styles.filteringMenu}`}>필터링</div>
                    </Link>
                </div>

    

                <div className={styles.unselectedMenu}>
                    <Link to="/sub2" style={{textDecoration: "none"}}>   
                        <div className={`${styles.menu} ${styles.fishingMenu}`}>피싱 사이트 감지</div>
                    </Link>
                </div>
            </div>      */}


            <div className={styles.backGround}>
                <div className={styles.buttonContainer}>
                    <button className={styles.button}>전체</button>
                    <button className={styles.button}>사회적 유해
                        <img src={icon} className={styles.icon} />
                    </button>
                    <button className={styles.button}>불법 및 위험
                        <img src={icon} className={styles.icon} />
                    </button>
                    <button className={styles.button}>정신적 위험
                        <img src={icon} className={styles.icon} />
                    </button>
                </div>



                <div className={styles.linkBox}>
                    <div className={styles.scrollBar}>
                        <div className={styles.siteListContainer}>
                            <div className={styles.siteInfo}>
                                <div className={styles.siteNew}>new</div>
                                <p className={styles.siteTime}>4분 전</p>
                                <p className={styles.dot}>·</p>
                                <p className={styles.siteType}>댓글</p>
                            </div>
                            <p className={styles.siteDetail}>Live2D Official VTuber App #nizimaLIVE✨New Feature : Hand Tracking👋</p>
                            <div className={styles.linkTag}>
                                <div className={styles.linkThumbNail}></div>
                                <div className={styles.typeDetail}>
                                    <p className={styles.linkType}>X. 무슨 일이 일어나고 있나요?</p>
                                    <p className={styles.linkDetail}>https://x.com/?lang=ko</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.siteListContainer}>
                            <div className={styles.siteInfo}>
                                <div className={styles.siteNew}>new</div>
                                <p className={styles.siteTime}>4분 전 </p>
                                <p className={styles.dot}>·</p>
                                <p className={styles.siteType}>댓글</p>
                            </div>
                            <p className={styles.siteDetail}>서울의 자존심! 올해도 우승주 한잔?🍺 대기열없이 티켓양도하고 직관승요 하자!⚾️</p>
                            <div className={styles.container}>
                                <div className={styles.line3}></div>
                            </div>
                            <div className={styles.linkTag}>
                                <div className={styles.linkThumbNail}></div>
                                <div className={styles.typeDetail}>
                                    <p className={styles.linkType}>X. 무슨 일이 일어나고 있나요?</p>
                                    <p className={styles.linkDetail}>https://x.com/?lang=ko</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.siteListContainer}>
                            <div className={styles.siteInfo}>
                                <div className={styles.siteNew}>new</div>
                                <p className={styles.siteTime}>4분 전</p>
                                <p className={styles.dot}>·</p>
                                <p className={styles.siteType}>댓글</p>
                            </div>
                            <p className={styles.siteDetail}>❤️…나i¸모든걸주Ю도㈕깝ズl않Ør…❤️ュ것○l Łй 스탬프ㄹΓ면 て┤て┤욱..</p>
                            <div className={styles.container}>
                                <div className={styles.line3}></div>
                            </div>
                            <div className={styles.linkTag}>
                                <div className={styles.linkThumbNail}></div>
                                <div className={styles.typeDetail}>
                                    <p className={styles.linkType}>X. 무슨 일이 일어나고 있나요?</p>
                                    <p className={styles.linkDetail}>https://x.com/?lang=ko</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );




};


    export default Filtering;

