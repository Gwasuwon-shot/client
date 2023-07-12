import { ReactNode } from "react";
import useModal from "../../hooks/useModal";
import styled from "styled-components";

interface BasicDoubleModalProps {
  children: ReactNode;
  leftButtonName: string;
  rightButtonName: string;
  handleClickLeftButton: (e: React.MouseEvent<HTMLElement>) => void;
  handleClickRightButton: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function BasicDoubleModal(props: BasicDoubleModalProps) {
  const { children, leftButtonName, rightButtonName, handleClickLeftButton, handleClickRightButton } = props;
  const { modalRef, closeModal } = useModal();

  return (
    <ModalWrapper ref={modalRef}>
      <Modal>
        <ModalContents>{children}</ModalContents>
        <Button type="button" onClick={handleClickLeftButton}>
          {buttonName}
        </Button>
      </Modal>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  z-index: 2;

  width: 32rem;
  height: 100vh;

  background-color: rgb(33 37 41 / 60%);

  cursor: pointer;
`;

const ModalContents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 11.8rem;
`;

const Modal = styled.aside`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 26.4rem;
  height: 16.4rem;
  border-radius: 8px;

  background-color: ${({ theme }) => theme.colors.white};
`;

const Button = styled.button`
  width: 100%;
  height: 4.6rem;
  padding: 1.4rem 3.2rem 1.4rem 3.3rem;

  border-radius: 0 0 8px 8px;

  background-color: ${({ theme }) => theme.colors.green5};
  color: ${({ theme }) => theme.colors.white};

  ${({ theme }) => theme.fonts.title02};
`;
