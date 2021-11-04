import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mainLogo from '../../images/main-logo.png';
import styled, { css, keyframes } from 'styled-components';
import iconSearch from '../../images/icon-search.svg';
import { MdArrowBack } from 'react-icons/md';
import { useRecoilState } from 'recoil';
import { modalVisibleStates } from '../../recoil/modal';
import { UserCard } from 'components';
import { User } from './UserCard';

const FlexBox = styled.div`
  display: flex;
  align-items: center;
`;

const ModalHeader = styled(FlexBox)`
  display: flex;
  justify-content: space-between;

  svg {
    color: #656565;
  }
  margin-right: 8px;
`;

const UserSearchBarContainer = styled.div`
  width: 240px;
  height: 40px;
  background: #f0f2f5;
  border-radius: 24px;
  margin-left: 16px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
  box-sizing: border-box;

  img {
    width: 22px;
    height: 22px;
  }

  input {
    flex: 1;
    outline: none;
    background: none;
    border: none;
    margin-left: 4px;
    font-size: 1rem;

    &::placeholder {
      font-size: 0.875rem;
    }
  }
`;

const ExtendSearchBarAnimation = keyframes`
  0% {
    width: 240px;
  }

  100% {
    width: 100%;
  }
`;

const SearchBarContainerModal = styled(UserSearchBarContainer)`
  margin-left: 8px;
  width: 100%;
  animation: ${ExtendSearchBarAnimation} 0.5s ease-in-out;

  &::before {
    content: '';
    width: 22px;
    height: 22px;
    background-image: url(${iconSearch});
    background-size: 22px 22px;
    transition: width 0.2s ease-in-out;
  }

  &:focus-within::before {
    background-image: none;
    width: 0px;
    height: 0px;
  }
`;

const UserSearchModalContainer = styled.div`
  width: 320px;
  max-height: 600px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  background: white;
  border-radius: 12px;
  position: fixed;
  top: 0;
  left: 0;
  padding: 8px;
  box-sizing: border-box;

  svg {
    font-size: 22px;
  }
`;

const HoverRound = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: #eeeeee;
    border-radius: 100%;
  }
`;

const SearchModalBody = styled.div`
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
  max-height: calc(600px - 56px);
  box-sizing: border-box;

  overflow-y: scroll;

  /* Hide Scrollbar */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  /* Chrome Safari Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  & > p {
    text-align: center;
    color: #888888;
  }
`;

const UserSearchBar: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(modalVisibleStates);
  return (
    <>
      <Link to="/home">
        <img src={mainLogo} />
      </Link>
      <UserSearchBarContainer
        onClick={() => setModalState({ ...modalState, searchUser: true })}
      >
        <img src={iconSearch} />
        <input type="text" placeholder="Search User" readOnly />
      </UserSearchBarContainer>
    </>
  );
};

const UserSearchModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(modalVisibleStates);
  const [input, setInput] = useState('');
  const [results, setResults] = useState<{
    isProgress: boolean;
    users: User[];
  }>({ isProgress: false, users: [] });

  const modal = React.useRef<HTMLDivElement>(null);
  const inputBox = React.useRef<HTMLInputElement>(null);

  const closeModal = (e: any, force?: boolean) => {
    if (!force && modal.current?.contains(e.target)) {
      return;
    }
    setModalState({ ...modalState, searchUser: false });
  };

  const onChangeInput = (e: any) => {
    setInput(e.target.value);
    setResults({ isProgress: true, users: [] });
  };

  useEffect(() => {
    document.addEventListener('click', closeModal);
    inputBox.current?.focus();

    return () => {
      document.removeEventListener('click', closeModal);
    };
  }, []);

  useEffect(() => {
    const fetchJob = setTimeout(() => {
      fetchSearchUser(input).then((response: User[]) =>
        setResults({ isProgress: false, users: response })
      );
    }, 750);

    return () => clearTimeout(fetchJob);
  }, [input]);

  return (
    <UserSearchModalContainer ref={modal}>
      <ModalHeader>
        <HoverRound
          onClick={(e) => {
            e.stopPropagation();
            closeModal(e, true);
          }}
        >
          <MdArrowBack />
        </HoverRound>
        <SearchBarContainerModal>
          <input
            type="text"
            placeholder="Search User"
            value={input}
            onChange={onChangeInput}
            ref={inputBox}
          />
        </SearchBarContainerModal>
      </ModalHeader>
      <SearchModalBody>
        {results.isProgress ? (
          <p>Searching...</p>
        ) : results.users.length === 0 ? (
          <p>No Result</p>
        ) : (
          results.users.map((result) => (
            <UserCard key={result.idx} user={result} />
          ))
        )}
      </SearchModalBody>
    </UserSearchModalContainer>
  );
};

export { UserSearchBar, UserSearchModal };

const testData: User[] = [
  { idx: 1, nickname: '유저1', profile: '' },
  { idx: 2, nickname: '유저2', profile: '' },
  { idx: 3, nickname: '유저3', profile: '' },
  { idx: 4, nickname: '유저4', profile: '' },
  { idx: 5, nickname: '유저5', profile: '' },
  { idx: 6, nickname: '유저6', profile: '' },
  { idx: 7, nickname: '유저7', profile: '' },
  { idx: 8, nickname: '유저8', profile: '' },
  { idx: 9, nickname: '유저9', profile: '' },
  { idx: 10, nickname: '유저10', profile: '' },
  { idx: 11, nickname: '유저11', profile: '' },
  { idx: 12, nickname: '유저12', profile: '' }
];

const fetchSearchUser = (keyword: string) => {
  return new Promise<User[]>((res, rej) => {
    setTimeout(() => {
      res(testData);
    }, 500);
  });
};