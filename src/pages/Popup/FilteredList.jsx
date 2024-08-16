import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import CommentItem from './CommentItem';

const FilteredList = () => {
  return (
    <Container>
      <Filter>
        <div className="top">
          <Button category={'total'} text={'전체'} />
          <Button category={'social'} text={'사회적 유해'} />
          <Button category={'illegal'} text={'불법 및 위험'} />
        </div>
        <Button category={'mental'} text={'정신적 위험'} />
      </Filter>
      <HistoryContainer>
        <CommentItem />
        <CommentItem />
        <CommentItem />
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
