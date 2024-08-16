import React, { useState } from 'react';
import styled from 'styled-components';
import cancle from '../../assets/img/cancle.svg';
import cancle_small from '../../assets/img/cancle_small.svg';
import back from '../../assets/img/back.svg';
import Dropdown from './Dropdown';
import SiteItem from './SiteItem';

const Fishing = () => {
  const [isWarning, setIsWarning] = useState(true);
  const [isDetail, setIsDetail] = useState(false);

  return isDetail ? (
    <Detail>
      <div className="header">
        <img src={back} alt="back" onClick={() => setIsDetail(false)} />
        <p>사이트 상세 요약</p>
        <img
          src={cancle}
          alt="cancle"
          onClick={() => {
            window.close();
          }}
        />
      </div>
      <div className="body">
        <SiteInfo>
          <img
            src="https://www.google.com/s2/favicons?domain=www.naver.com"
            alt="favicon"
          />
          <div className="site-text">
            <p className="title-text">일본 데이터 e심 - Google 검색</p>
            <p>
              google.co.kr/search?q_src=google...google.co.kr/search?q_src=google...google.co.kr/search?q_src=google...
            </p>
          </div>
        </SiteInfo>
        <SiteDetail>
          <div>
            <p className="title-text">방문 시간</p>
            <p className="sub-text">2024.5.30 19:30:27</p>
          </div>
          <div>
            <p className="title-text">위험 가능성</p>
            <p className="sub-text">바이러스 / 트래킹 / 악성코드</p>
          </div>
          <div>
            <p className="title-text">페이지 주요 정보</p>
            <p className="sub-text line-height">
              해당 사이트는 불법 투자를 다루는 사이트로 판단되며 사용자의
              개인정보 유출을 유도합니다. 사이트는 주로 고수익 투자 기회를
              가장하여 사용자로 하여금 민감한 금융 정보를 제공하도록 유도합니다.
            </p>
            <ul className="sub-text line-height">
              <li>
                중국의 불법 투자 조직: 이 사이트는 중국에 기반을 둔 불법 투자
                조직과 연계되어 있으며, 가짜 투자 상품을 통해 사용자의 돈을
                갈취하는 데 목적이 있습니다.
              </li>
              <li>
                가짜 투자 상품 광고: 사용자를 유인하기 위해 주식, 암호화폐,
                부동산 등 다양한 가짜 투자 상품을 광고합니다.
              </li>
              <li>
                고수익 보장: 사이트는 사용자가 고수익을 쉽게 얻을 수 있다고
                속이며, 투자 시 높은 수익률을 약속합니다.
              </li>
            </ul>
          </div>
        </SiteDetail>
      </div>
    </Detail>
  ) : (
    <Container>
      {isWarning && (
        <Warning>
          <p className="title-text">피싱사이트 차단이 현재 꺼져있습니다.</p>
          <p>개인정보 보호를 위해 피싱사이트 차단 활성화를 추천합니다.</p>
          <img
            src={cancle_small}
            alt="cancle"
            onClick={() => setIsWarning(false)}
            width={8}
            height={8}
          />
        </Warning>
      )}
      <Dropdown />
      <ListContainer>
        <SiteItem
          onClick={() => {
            setIsDetail(true);
          }}
        />
        <SiteItem />
        <SiteItem />
      </ListContainer>
    </Container>
  );
};

export default Fishing;

const SiteDetail = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 28px;
  font-size: 12.62px;
  div {
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 350px;
  }
  .title-text {
    font-weight: 600;
    color: #4b4b4b;
  }
  .sub-text {
    font-weight: 400;
    color: #757575;
  }
  .line-height {
    line-height: 1.5;
  }
  ul {
    list-style-type: none; /* 기본 점 제거 */
    margin-left: 8px;
  }

  ul li {
    position: relative;
    padding-left: 15px; /* 점과 텍스트 간의 간격 */
  }

  ul li::before {
    content: '•'; /* 점을 생성 */
    position: absolute;
    left: 0;
  }
`;

const SiteInfo = styled.div`
  height: 80px;
  background-color: #f0f0f0;
  border-radius: 24px;
  padding: 0px 37px;
  display: flex;
  align-items: center;
  gap: 15.28px;

  img {
    width: 37.6px;
    height: 37.6px;
    border-radius: 30px;
    object-fit: cover;
  }

  .site-text {
    display: flex;
    flex-direction: column;
    gap: 8px;

    font-size: 11.75px;
    font-weight: 500;
    color: #616161;

    .title-text {
      font-size: 17.63px;
      color: #2d2d2d;
    }

    p {
      max-width: 320px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
`;

const Detail = styled.div`
  position: absolute;
  background-color: white;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  .header {
    display: flex;
    align-items: center;
    width: calc(100% - 46px);
    justify-content: space-between;
    margin: 13px 23px;
    margin-bottom: 33px;

    p {
      font-size: 15px;
      font-weight: 600;
      color: #4b4b4b;
    }

    img {
      cursor: pointer;
    }
  }

  .body {
    background-color: #f8f8f8;
    margin: 0 11px;
    border-radius: 24px;
    height: 515px;
  }
`;

const ListContainer = styled.div`
  background-color: #f8f8f8;
  width: 394px;
  border-radius: 25px;
  overflow-y: scroll;
  height: calc(100% - 34px);
  padding: 17px;

  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const Container = styled.div`
  margin: 0px 11px;
  display: flex;
  flex-direction: column;
  align-items: end;
  height: 471px;
`;

const Warning = styled.div`
  background-color: #ffd2d7;
  border-radius: 15px;
  height: 74px;
  width: 352px;
  padding: 0 38px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
  position: relative;
  margin-top: 13px;

  p {
    font-size: 11px;
    color: #4b4b4b;
    font-weight: 400;
  }
  .title-text {
    font-size: 15px;
    font-weight: 600;
  }
  img {
    position: absolute;
    right: 14px;
    top: 13px;
    cursor: pointer;
  }
`;
