import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { commonState } from 'recoil/store';

const SideBarContainer = styled.div<{ commonState: boolean }>`
  position: fixed;
  top: 56px;
  left: 0;
  width: 340px;
  height: calc(100vh - 56px);
  z-index: 1;

  display: ${(props) => (props.commonState ? 'flex' : 'none')};
  flex-direction: column;

  @media screen and (max-width: 1040px) {
    display: none;
  }
`;

const SideBar = ({ children }: { children?: React.ReactNode }) => {
  const commonDisplay = useRecoilValue(commonState);

  return (
    <SideBarContainer commonState={commonDisplay}>{children}</SideBarContainer>
  );
};

export default SideBar;
