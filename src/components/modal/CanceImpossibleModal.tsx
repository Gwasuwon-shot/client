import styled from "styled-components";
import BasicSingleModal from "../common/BasicSingleModal";

interface CanceImpossibleModalProp {
  handleCloseCancelImpossibleModal(): void;
}

export default function CancelImpossibleModal(props: CanceImpossibleModalProp) {
  const { handleCloseCancelImpossibleModal } = props;

  return (
    <BasicSingleModal buttonName="확인" handleClickSingleButton={handleCloseCancelImpossibleModal}>
      <CancleImpossibleTitle>
        이미 취소한 수업의 출결은
        <br />
        변경할 수 없습니다
      </CancleImpossibleTitle>
    </BasicSingleModal>
  );
}

const CancleImpossibleTitle = styled.h1`
  display: flex;
  justify-content: center;
  text-align: center;

  ${({ theme }) => theme.fonts.body02};
`;
