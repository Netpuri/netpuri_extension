import React from 'react';
import alert from '../../assets/img/alert.svg';
import background from '../../assets/img/background.svg';
import styled from 'styled-components';

const Newtab = () => {
  return (
    <Alert>
      <Background
        src={background}
        className="App-background"
        alt="background"
      />
      <Wrapper>
        <img src={alert} className="App-logo" alt="logo" />
        <div>
          <p className="title-text">경고</p>
          <p className="sub-text">
            해당 사이트는 높은 확률로 바이러스 설치를 유도하며 <br />
            트래킹 위험이 감지됩니다. 접속에 유의해주세요.
          </p>
          <p className="desc-text">
            yna.co.krd의 공격자가 소프트웨어를 설치하거나 개인정보(예: 비밀번호,
            전화번호, 신용카드)를
            <br />
            공개하는 등의 위험한 행동을 하도록 사용자를 속일 수 있습니다
          </p>
        </div>
      </Wrapper>
      <Footer>
        <p
          onClick={() => {
            window.open(
              'https://safebrowsing.google.com/safebrowsing/report_error/?hl=ko',
              '_blank'
            );
          }}
        >
          잘못 차단된 사이트 신고
        </p>
        <div>
          <button
            onClick={() => {
              // 이전 페이지로 돌아가기
              window.close();
            }}
          >
            무시하기
          </button>
          <button
            className="back"
            onClick={() => {
              window.history.back();
            }}
          >
            이전 페이지로 돌아가기
          </button>
        </div>
      </Footer>
    </Alert>
  );
};

export default Newtab;

const Alert = styled.div`
  position: relative;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 60px;

  width: 100dvw;
  display: flex;
  align-items: center;
  justify-content: space-around;

  p {
    font-size: 20px;
    font-weight: 400;
    color: #edf4ff;
    cursor: pointer;
  }

  div {
    display: flex;
    gap: 18px;
    button {
      border: none;
      border-radius: 15px;
      height: 49px;
      padding: 0 30px;
      padding-top: 4px;
      font-size: 20px;
      font-weight: 400;
      cursor: pointer;
      color: #2273ff;
      background-color: #b3d0ff;
    }
    .back {
      color: white;
      background-color: #2273ff;
    }
  }
`;

const Background = styled.img`
  position: absolute;
  width: 100dvw;
  height: 100dvh;
  z-index: -1;
  object-fit: cover;
`;

const Wrapper = styled.div`
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  color: white;

  .title-text {
    font-size: 60px;
    font-weight: bold;
    margin: 0;
  }

  .sub-text {
    font-size: 28px;
    font-weight: medium;
  }

  .desc-text {
    font-size: 18px;
    font-weight: light;
    line-height: 1.7;
  }
`;
