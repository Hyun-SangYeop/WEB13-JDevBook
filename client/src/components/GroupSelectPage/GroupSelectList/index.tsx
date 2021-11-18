import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';

import { rightModalStates, groupListState } from 'recoil/store';
import fetchApi from 'api/fetch';

import GroupCard from 'components/GroupSelectPage/GroupSelectList/GroupCard';
import { IGroup } from 'types/group';

const firstAnimation = keyframes`
  0% {
    width: 130%;
  }
  100% {
    width: 130%;
  }
`;

const listAnimation = keyframes`
  0% {
    width: 100%;
  }
  100% {
    width: 130%;
  }
`;

const GroupSelectListContainer = styled.div<{
  modalState: boolean;
  fisrtFlag: boolean;
}>`
  width: ${(props) => (!props.fisrtFlag && props.modalState ? `100%` : `130%`)};
  box-sizing: border-box;
  padding-bottom: 40px;
  z-index: 1;

  display: flex;
  flex-flow: row wrap;
  ${(props) =>
    props.fisrtFlag || props.modalState
      ? css`
          animation: ${firstAnimation};
        `
      : css`
          animation: ${listAnimation} 0.5s;
        `};
`;

const GroupSelectList = () => {
  const rightModalState = useRecoilValue(rightModalStates).rightModalFlag;
  const [groupList, setGroupList] = useRecoilState(groupListState);
  const [fisrtFlag, setFirstFlag] = useState<boolean>(true);

  const fetchList = async () => {
    const groupList: IGroup[] = await fetchApi.getGroupList();
    setGroupList(groupList);
  };

  const firstEnd = (e: React.AnimationEvent) => {
    setFirstFlag(false);
  };

  useEffect(() => {
    if (groupList.length === 0) fetchList();
  }, []);

  return (
    <GroupSelectListContainer
      modalState={rightModalState}
      fisrtFlag={fisrtFlag}
      onAnimationEnd={firstEnd}
    >
      {groupList.map((group) => (
        <GroupCard key={group.idx} group={group} />
      ))}
    </GroupSelectListContainer>
  );
};

export default GroupSelectList;
