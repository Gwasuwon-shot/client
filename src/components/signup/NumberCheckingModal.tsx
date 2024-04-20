import styled from "styled-components";
import BasicSingleModal from "../common/BasicSingleModal";

interface EmailDuplicatedModalProps {
  handleCloseModal(): void;
  modalMessage: string;
}

export default function NumberCheckingModal(props: EmailDuplicatedModalProps) {
  const { handleCloseModal, modalMessage } = props;
  return (
    <BasicSingleModal
      buttonName="확인"
      handleClickSingleButton={handleCloseModal}
    >
      <EmailIsDuplicated>{modalMessage}</EmailIsDuplicated>
    </BasicSingleModal>
  );
}
const EmailIsDuplicated = styled.h1`
  display: flex;
  justify-content: center;
  text-align: center;

  ${({ theme }) => theme.fonts.body02};
`;
