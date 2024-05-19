import styled from "styled-components";
import BasicSingleModal from "../common/BasicSingleModal";

interface ParentsDisabledAlarmModalProp {
  handleCloseModal(): void;
}

export default function ParentsDisabledAlarmModal(props: ParentsDisabledAlarmModalProp) {
  const { handleCloseModal } = props;

  return (
    <BasicSingleModal buttonName="확인" handleClickSingleButton={handleCloseModal}>
      <CancleImpossibleTitle>
        푸쉬알림 상대가
        <br />
        알림을 허용하지 않았습니다
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
