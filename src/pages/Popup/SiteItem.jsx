import React from 'react';
import styled from 'styled-components';
import Category from './Category';

const Siteitem = ({ onClick = () => {} }) => {
  return (
    <LinkItem>
      <div className="site-info">
        <img
          src="https://www.google.com/s2/favicons?domain=www.naver.com"
          alt="favicon"
        />
        <div onClick={onClick}>
          <p className="title-text">일본 데이터 e심 - Google 검색</p>
          <p>
            google.co.kr/search?q_src=google...google.co.kr/search?q_src=google...google.co.kr/search?q_src=google...
          </p>
        </div>
      </div>
      <div className="category">
        <Category text="바이러스" />
        <Category text="트래킹" />
      </div>
    </LinkItem>
  );
};

export default Siteitem;

const LinkItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  background-color: white;
  border-radius: 15px;
  padding: 0 11px;
  padding-top: 14px;
  padding-bottom: 16.38px;

  .site-info {
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: #f0f0f0;
    padding: 10px 16px;
    border-radius: 15px;
    img {
      width: 38px;
      height: 38px;
      border-radius: 30px;
      object-fit: cover;
    }
    div {
      display: flex;
      flex-direction: column;
      gap: 8px;
      p {
        font-size: 10px;
        color: #4b4b4b;
        font-weight: 500;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 290px;
      }
      .title-text {
        font-size: 15px;
      }
    }
    transition: transform 0.2s ease;
    cursor: pointer;
    &:hover {
      transform: scale(0.98);
    }
  }

  .category {
    display: flex;
    gap: 6.31px;
  }
`;
