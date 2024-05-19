import styled from "styled-components";
import ToastModal from "../../common/ToastModal";
import { ExclamnationMarkIc } from "../../../assets";

interface cannotEditModalType {
  setCannotEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CannotEditModal(props: cannotEditModalType) {
  const { setCannotEditModalOpen } = props;

  function ModalClose() {
    setCannotEditModalOpen(false);
  }

  return (
    <>
      <ModalWrapper>
        <ToastModal>
          <ModalHeader>서비스 준비중 안내</ModalHeader>
          <WarningIc></WarningIc>
          <WarningMessage>
            <p>현재 이미 출석체크가 완료된 수업은</p>
            <p>일정 변경이 불가능해요</p>
          </WarningMessage>
          <UpdateMessage>빠른 시일 안에 업데이트하도록 하겠습니다</UpdateMessage>
          <ConfirmButton onClick={ModalClose}>확인</ConfirmButton>
        </ToastModal>
      </ModalWrapper>
    </>
  );
}

export default CannotEditModal;

const ModalWrapper = styled.div`
  position: absolute;
  height: 43.4rem;
  background-color: red;
  margin: -57rem 50rem 0 -27rem;
`;

const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => theme.fonts.title02};
  margin-bottom: 3.8rem;
`;

const WarningIc = styled(ExclamnationMarkIc)`
  width: 10rem;
  height: 10rem;
  margin-bottom: 3.8rem;
`;

const WarningMessage = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => theme.fonts.body02};
  width: 19.9rem;
  height: 3.2rem;
  margin-bottom: 1.5rem;
`;

const UpdateMessage = styled.p`
  display: flex;
  ${({ theme }) => theme.fonts.body04};
  color: ${({ theme }) => theme.colors.grey400};
  margin-bottom: 4.9rem;
`;

const ConfirmButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 29.2rem;
  height: 5rem;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.green5};
  color: ${({ theme }) => theme.colors.grey0};
  ${({ theme }) => theme.fonts.title02};
`;
