import React from "react";
import styled from "styled-components";
import BasicDoubleModal from "../common/BasicDoubleModal";

interface AccountDeleteModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsCheckingDeleteAccount: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AccountDeleteModal(props: AccountDeleteModalProps) {
  const { setOpenModal, setIsCheckingDeleteAccount } = props;

  function handleBacktoMypage() {
    setOpenModal(false);
    setIsCheckingDeleteAccount(false);
  }

  function handleDelteAccount() {
    //계정 삭제 로직
  }

  return (
    <>
      <BasicDoubleModal
        leftButtonName="취소"
        rightButtonName="확인"
        handleClickLeftButton={handleBacktoMypage}
        handleClickRightButton={handleDelteAccount}>
        <AskingSureToDelete>계정을 삭제하시겠어요?</AskingSureToDelete>
      </BasicDoubleModal>
    </>
  );
}

const AskingSureToDelete = styled.h1`
  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.body02};
`;
