import styled from "styled-components";
import BasicSingleModal from "../common/BasicSingleModal";

interface ParentsDisabledAlarmModalProp {
  handleCloseModal(): void;
  errMsg?: string;
}

export default function ParentsDisabledAlarmModal(props: ParentsDisabledAlarmModalProp) {
  const { handleCloseModal, errMsg } = props;

  return (
    <BasicSingleModal buttonName="확인" handleClickSingleButton={handleCloseModal}>
      <CancelImpossibleTitle>{errMsg}</CancelImpossibleTitle>
    </BasicSingleModal>
  );
}

const CancelImpossibleTitle = styled.h1`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 50%;

  ${({ theme }) => theme.fonts.body02};
`;
