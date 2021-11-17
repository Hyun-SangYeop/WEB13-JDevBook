import React from 'react';
import styled from 'styled-components';

import palette from 'theme/palette';
import style from 'theme/style';

const GroupSelectTitleWrap = styled.div`
  width: 216px;
  margin-left: 16px;

  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  font-size: ${style.font.title};
`;
const Description = styled.div`
  margin: ${style.margin.normal} 0;
  font-size: ${style.font.normal};
`;

const GroupSelectTitle = () => {
  return (
    <GroupSelectTitleWrap>
      <Title>그룹 찾기</Title>
      <Description>원하는 그룹을 선택해 보세요 😀</Description>
    </GroupSelectTitleWrap>
  );
};

export default GroupSelectTitle;