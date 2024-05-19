import styled from "styled-components";
import useModal from "../../hooks/useModal";
import BasicSingleModal from "../common/BasicSingleModal";

export default function CreateImpossibleModal() {
  const { unShowModal } = useModal();

  function handleModalApprove() {
    unShowModal();
  }

  return (
    <ModalWrapper>
      <BasicSingleModal buttonName="확인" handleClickSingleButton={handleModalApprove} isFuture>
        <CancleImpossibleTitle>
          수업 시작시간보다 종료시간이 <br /> 늦어야합니다.
        </CancleImpossibleTitle>
      </BasicSingleModal>
    </ModalWrapper>
  );
}

const CancleImpossibleTitle = styled.h1`
  display: flex;
  justify-content: center;
  text-align: center;

  ${({ theme }) => theme.fonts.body02};
`;

const ModalWrapper = styled.aside`
  position: fixed;
  z-index: 7;
`;
