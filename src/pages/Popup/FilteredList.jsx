import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import CommentItem from './CommentItem';

const FilteredList = () => {
  const [hazardousTexts, setHazardousTexts] = useState([]);
  const [filter, setFilter] = useState({
    total: true,
    social: true,
    illegal: true,
    mental: true,
  });

  const handleFilter = (category) => {
    if (category === 'total') {
      if (filter.total) {
        setFilter({
          total: false,
          social: false,
          illegal: false,
          mental: false,
        });
      } else {
        setFilter({
          total: true,
          social: true,
          illegal: true,
          mental: true,
        });
      }
    } else {
      const newFilter = {
        ...filter,
        [category]: !filter[category],
      };

      const allCategoriesSelected =
        newFilter.social && newFilter.illegal && newFilter.mental;

      setFilter({
        ...newFilter,
        total: allCategoriesSelected,
      });
    }
  };

  useEffect(() => {
    // Chrome storage에서 데이터 가져오기
    chrome.storage.local.get('hazardous_texts', (data) => {
      if (chrome.runtime.lastError) {
        console.error(
          'Error accessing storage:',
          chrome.runtime.lastError.message
        );
      } else {
        let texts = data.hazardous_texts || [];
        // state가 'new'인 경우 'old'로 변경
        setHazardousTexts(texts);
        const updatedTexts = texts.map((text) => {
          if (text.state === 'new') {
            return { ...text, state: 'old' };
          }
          return text;
        });
        // 업데이트된 데이터를 다시 storage에 저장
        chrome.storage.local.set({ hazardous_texts: updatedTexts }, () => {
          if (chrome.runtime.lastError) {
            console.error(
              'Error saving to storage:',
              chrome.runtime.lastError.message
            );
          }
        });
      }
    });
  }, []);

  // 필터링된 텍스트를 반환하는 함수
  const getFilteredTexts = () => {
    return hazardousTexts.filter((text) => {
      if (filter.total) return true; // '전체'가 선택된 경우 모든 텍스트 표시
      if (filter.social && text.type === '사회적 유해l') return true;
      if (filter.illegal && text.type === '불법 및 위험') return true;
      if (filter.mental && text.type === '정신적 위험') return true;
      return false;
    });
  };

  return (
    <Container>
      <Filter>
        <div className="top">
          <Button
            category={'total'}
            text={'전체'}
            onClick={() => handleFilter('total')}
            isClicked={filter.total}
          />
          <Button
            category={'social'}
            text={'사회적 유해'}
            onClick={() => handleFilter('social')}
            isClicked={filter.social}
          />
          <Button
            category={'illegal'}
            text={'불법 및 위험'}
            onClick={() => handleFilter('illegal')}
            isClicked={filter.illegal}
          />
        </div>
        <Button
          category={'mental'}
          text={'정신적 위험'}
          onClick={() => handleFilter('mental')}
          isClicked={filter.mental}
        />
      </Filter>
      <HistoryContainer>
        {getFilteredTexts().map((text) => (
          <CommentItem
            key={text.original_text}
            status={text.state}
            time={text.detectTime}
            comment={text.original_text}
            title={text.siteTitle}
            link={text.siteUrl}
            img={text.faviconUrl}
          />
        ))}
      </HistoryContainer>
    </Container>
  );
};

export default FilteredList;

const HistoryContainer = styled.div`
  padding: 17px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  overflow-y: scroll;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  margin: 0 11px;
  border-radius: 25px;
  margin-top: 13px;
  height: 472px;
`;

const Filter = styled.div`
  background-color: #dae8ff;
  padding: 21px 27px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 9px;
  .top {
    display: flex;
    gap: 13px;
  }
`;
