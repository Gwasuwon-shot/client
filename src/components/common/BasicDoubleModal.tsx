import { ReactNode, useEffect } from "react";
import styled from "styled-components";
import useModal from "../../hooks/useModal";

interface BasicDoubleModalProps {
  children: ReactNode;
  leftButtonName: string;
  rightButtonName: string;
  position?: string;
  handleClickLeftButton: (e: React.MouseEvent<HTMLElement>) => void;
  handleClickRightButton: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function BasicDoubleModal(props: BasicDoubleModalProps) {
  const { children, leftButtonName, rightButtonName, handleClickLeftButton, handleClickRightButton, position } = props;
  const { modalRef, openModal } = useModal();

  useEffect(() => {
    const body = document.body;
    if (openModal) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
    return () => {
      body.style.overflow = "auto";
    };
  }, [openModal]);

  return (
    <ModalWrapper ref={modalRef} $position={position}>
      <Modal>
        <ModalContents>{children}</ModalContents>
        <ButtonWrapper>
          <Button type="button" onClick={handleClickLeftButton} $isLeft={true}>
            {leftButtonName}
          </Button>
          <Button type="button" onClick={handleClickRightButton} $isLeft={false}>
            {rightButtonName}
          </Button>
        </ButtonWrapper>
      </Modal>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div<{ $position: string | undefined }>`
  position: ${({ $position }) => ($position ? $position : "absolute")};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 3;

  width: 32rem;
  height: 100vh;
  margin-top: -4rem;

  background-color: rgb(33 37 41 / 60%);

  cursor: pointer;
`;

const ModalContents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${({ theme }) => theme.fonts.body02};

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
  border-radius: 0.8rem;

  background-color: ${({ theme }) => theme.colors.white};
`;

const Button = styled.button<{ $isLeft: boolean }>`
  width: 50%;
  height: 100%;

  background-color: ${({ theme, $isLeft }) => ($isLeft ? theme.colors.green1 : theme.colors.green5)};
  color: ${({ theme, $isLeft }) => ($isLeft ? theme.colors.green5 : theme.colors.white)};

  ${({ theme }) => theme.fonts.title02};
`;

const ButtonWrapper = styled.section`
  overflow: hidden;

  width: 100%;
  height: 4.6rem;

  border-radius: 0 0 0.8rem 0.8rem;
`;
