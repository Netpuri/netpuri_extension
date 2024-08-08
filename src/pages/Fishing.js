import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import styles from './Fishing.module.css';
import './Filtering.module.css'; 



const Sub3 = () => {
    return (
      <div className="sub3-container">
      </div>
    );
  };
 
const Fishing = () => {
    const [selectedMenu, setSelectedMenu] = useState('phishingDetection');
    const [prevMenu, setPrevMenu] = useState('');
    const [animationClass, setAnimationClass] = useState('');
    const [animationKey, setAnimationKey] = useState(0);
    

  
    useEffect(() => {
      if (selectedMenu !== prevMenu) {
        const isToLeft = selectedMenu === 'filtering' && prevMenu === 'phishingDetection';
        const animation = isToLeft ? styles.slideLeft : styles.slideRight;
        
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
        <div key={animationKey} className={`${styles.selectedMenu} ${animationClass}`} style={{ left: selectedMenu === 'phishingDetection' ? '0%' : '50%' }} />
        <div className={styles.menu} onClick={() => handleMenuClick('filtering')}>
          <Link to="/sub" style={{ textDecoration: 'none', color: selectedMenu === 'filtering' ? '#FFFFFF' : '#4B4B4B' }}>필터링</Link>
        </div>
        <div className={styles.menu} onClick={() => handleMenuClick('phishingDetection')}>
          <Link to="/sub2" style={{ textDecoration: 'none', color: selectedMenu === 'phishingDetection' ? '#FFFFFF' : '#4B4B4B' }}>피싱 사이트 감지</Link>
        </div>
      </div>


{/* 
             <div className={styles.menuContainer}>
            <div className={styles.unselectedMenu}>
                <Link to="/sub" style={{textDecoration: "none"}}>
                    <div className={`${styles.menu} ${styles.filteringMenu}`}>필터링</div>
                </Link>
                </div>
                <div className={styles.selectedMenu}>
                    <Link to="/sub2" style={{textDecoration: "none"}}>
                        <div className={`${styles.menu} ${styles.fishingMenu}`}>피싱 사이트 감지</div>
                    </Link>
                </div>
            </div>   */}
    
            <div className={styles.offAlarm}>
                <p className={styles.closeButton}>⨉</p>
                <div className={styles.block}>
                    <p className={styles.blockAlarm}>피싱사이트 차단이 현재 꺼져있습니다.</p>
                    <p className={styles.blockDetail}>개인정보 보호를 위해 피싱사이트 차단 활성화를 추천합니다.</p>
                </div>
            </div>

            <div className={styles.order}>
                <div className={styles.orderDanger}>위험도순</div>
                <div className={styles.orderButton}>∨</div>
            </div>

           
            <div className={styles.linkBox}>
                <div className={styles.siteListContainer}>
                    <Link to="/sub3" style={{textDecoration: "none"}}>
                    <div className={styles.siteContainer}>
                        <div className={styles.siteThumbNail}></div>
                        <div className={styles.detailsContainer}>
                            <div className={styles.siteDetails}>일본 데이터 e심 - Google 검색</div>
                            <div className={styles.siteLinks}>google.co.kr/search?q_src=google/jdkfjsdd</div>
                        </div>
                    </div>
                    </Link>
                    <div className={styles.buttonContainer}>
                        <div className={styles.virusButton}>✓ 바이러스</div>
                        <div className={styles.trackingButton}>✓ 트래킹</div>
                        <div className={styles.malwareButton}>✓ 악성코드</div>
                    </div>
                </div>

                <div className={styles.siteListContainer}>
                    <div className={styles.siteContainer}>
                        <div className={styles.siteThumbNail}></div>
                        <div className={styles.detailsContainer}>
                            <div className={styles.siteDetails}>하네다 공항에서 긴자역 가는 3가지 방법</div>
                            <div className={styles.siteLinks}>https://merici.tistory.com/entry/하네다-공항에서</div>
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.trackingButton}>✓ 트래킹</div>
                        <div className={styles.virusButton}>✓ 바이러스</div>
                    </div>
                </div>

                <div className={styles.siteListContainer}>
                    <div className={styles.siteContainer}>
                        <div className={styles.siteThumbNail}></div>
                        <div className={styles.detailsContainer}>
                            <div className={styles.siteDetails}>최고의 디자인을 위한 3가지 습관과 원칙</div>
                            <div className={styles.siteLinks}>https://www.nhn-commerce.com/echost
                            </div>
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <div className={styles.malwareButton}>✓ 악성코드</div>
                        <div className={styles.trackingButton}>✓ 트래킹</div>
                    </div>
                </div>
            </div>
        </div>

    );
}


export default Fishing;
