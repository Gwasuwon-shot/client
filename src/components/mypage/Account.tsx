import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { isModalOpen } from "../../atom/common/isModalOpen";
import AccountDeleteModal from "./AccountDeleteModal";
import LogoutModal from "./LogoutModal";

export default function Account() {
  const [openModal, setOpenModal] = useRecoilState<boolean>(isModalOpen);
  const [isCheckingLogout, setIsCheckingLogout] = useState(false);
  const [isCheckingDeleteAccount, setIsCheckingDeleteAccount] = useState(false);

  function handleLogout() {
    setOpenModal(true);
    setIsCheckingLogout(true);
  }

  function handleDeleteAccount() {
    setOpenModal(true);
    setIsCheckingDeleteAccount(true);
  }

  return (
    <>
      <Wrapper>
        <TitleWrapper>
          <TitleText>계정</TitleText>
        </TitleWrapper>
        <ContentWrapper>
          <ContentText onClick={handleLogout}>로그아웃</ContentText>
          {openModal && isCheckingLogout && (
            <LogoutModalSection $isCheckingLogout={isCheckingLogout}>
              <LogoutModal setOpenModal={setOpenModal} setIsCheckingLogout={setIsCheckingLogout} />
            </LogoutModalSection>
          )}
          {/* <ContentText onClick={handleDeleteAccount}>삭제</ContentText> */}
          {openModal && isCheckingDeleteAccount && (
            <DeleteAccountModalSection $isCheckingDeleteAccount={isCheckingDeleteAccount}>
              <AccountDeleteModal setOpenModal={setOpenModal} setIsCheckingDeleteAccount={setIsCheckingDeleteAccount} />
            </DeleteAccountModalSection>
          )}
        </ContentWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 32rem;
`;

const TitleWrapper = styled.header`
  display: flex;
  align-items: center;

  width: 100%;
  height: 2.6rem;

  background-color: ${({ theme }) => theme.colors.grey20};
`;

const TitleText = styled.h1`
  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey600};

  margin-left: 1.4rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  margin-bottom: 8rem;
`;

const ContentText = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.4rem;
  height: 6rem;
  ${({ theme }) => theme.fonts.body02};
  color: ${({ theme }) => theme.colors.grey900};
  cursor: pointer;
`;

const LogoutModalSection = styled.section<{ $isCheckingLogout: boolean }>`
  position: absolute;
  top: 0;
`;

const DeleteAccountModalSection = styled.section<{ $isCheckingDeleteAccount: boolean }>`
  position: absolute;
  top: 0;
`;
