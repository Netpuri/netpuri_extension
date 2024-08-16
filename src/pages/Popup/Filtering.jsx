import React from 'react';
import { useState } from 'react';
import {
  Container,
  FilterContainer,
  FilterItemContainer,
  FilterSelectContainer,
  FishingContainer,
  Statistics,
  Switch,
  Toggle,
} from './Popup.styled';
import history from '../../assets/img/history.svg';
import Button from './Button';

const socialTypes = ['혐오', '정치', '광고', '비방'];
const illegalTypes = ['음란', '폭력', '도박', '불법'];
const mentalTypes = ['우울'];

const Filtering = ({ onClick }) => {
  const [siteFilterOn, setSiteFilterOn] = useState(false);
  const handleToggle = () => {
    setSiteFilterOn((prev) => !prev);
  };
  return (
    <FilterSelectContainer>
      <Container>
        <FilterContainer>
          <p className="title-text">필터링</p>
          <div className="filter">
            <FilterItem
              title="사회적 유해"
              desc="혐오 발언과 정치적 선전 및 조작 검열"
              types={socialTypes}
              category="social"
            />
            <FilterItem
              title="불법 및 위험"
              desc="법적으로 금지되거나 위험한 콘텐츠 검열"
              types={illegalTypes}
              category="illegal"
            />
            <FilterItem
              title="정신적 위험"
              desc="정신 건강에 악영향을 미칠 수 있는 콘텐츠 검열"
              types={mentalTypes}
              category="mental"
            />
          </div>
        </FilterContainer>
        <FishingContainer>
          <p>피싱 사이트 감지</p>
          <Switch isOn={siteFilterOn} onClick={handleToggle}>
            <Toggle isOn={siteFilterOn} />
          </Switch>
        </FishingContainer>
      </Container>
      <Statistics>
        <p>통계</p>
        <img src={history} alt="history" onClick={() => onClick()} />
      </Statistics>
    </FilterSelectContainer>
  );
};

const FilterItem = ({ title, desc, types, category }) => {
  return (
    <FilterItemContainer>
      <div className="item-header">
        <p className="title-text">{title}</p>
        <p className="sub-text">{desc}</p>
      </div>
      <div className="buttons">
        {types.map((type) => (
          <Button key={type} text={type} category={category} />
        ))}
      </div>
    </FilterItemContainer>
  );
};

export default Filtering;
