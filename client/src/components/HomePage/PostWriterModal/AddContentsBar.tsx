import React from 'react';
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';

import { modalStateStore } from 'recoil/common';
import { iconPhoto } from 'images/icons';
import useModalHandler from 'hooks/useModalHandler';
import { ModalHandler } from 'types/common';

const AddContentsBarWrap = styled.div`
  width: 95%;
  height: 60px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.36) 0px 1px 4px;

  display: flex;
  align-items: center;
  color: ${(props) => props.theme.black};
  p {
    width: 50%;
    box-sizing: border-box;
    padding-left: 20px;

    font-weight: bold;
  }
`;

const AddContentsBtnWrap = styled.div`
  display: flex;
`;

const ContentsBtn = styled.div<{ modalState: boolean }>`
  width: 48px;
  height: 48px;

  border-radius: 50%;
  background-color: ${(props) => (props.modalState ? props.theme.lightgray : props.theme.white)};

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.lightgray};
  }

  &:active {
    background-color: ${(props) => props.theme.gray};
  }

  img {
    width: 70%;
    height: 70%;
  }
`;

const AddContentsBar = () => {
  const modalState = useRecoilValue(modalStateStore);
  const handleModal = useModalHandler();

  const imgUploadModalToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    handleModal(ModalHandler.TOGGLE_IMAGE_UPLOADER);
  };

  return (
    <AddContentsBarWrap>
      <p>게시물에 추가</p>
      <AddContentsBtnWrap>
        <ContentsBtn modalState={modalState.post.inPhoto} onClick={imgUploadModalToggle}>
          <img src={iconPhoto} className="no-drag" alt="사진 아이콘" />
        </ContentsBtn>
      </AddContentsBtnWrap>
    </AddContentsBarWrap>
  );
};

export default AddContentsBar;
