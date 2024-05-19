import { useRecoilState } from "recoil";
import styled from "styled-components";
import { attendanceStatus } from "../../atom/attendanceCheck/attendanceStatus";
import { isModalOpen } from "../../atom/common/isModalOpen";
import BasicSingleModal from "../common/BasicSingleModal";

interface FutureImpossibleModalProp {
  handleCloseModal: () => void;
  handleCloseDoubleCheckModal: () => void;
}

export default function FutureImpossibleModal(props: FutureImpossibleModalProp) {
  const { handleCloseModal, handleCloseDoubleCheckModal } = props;
  const [attendanceData, setAttendanceData] = useRecoilState(attendanceStatus);
  const [openModal, setOpenModal] = useRecoilState<boolean>(isModalOpen);

  function handleModalApprove() {
    handleCloseModal();
    handleCloseDoubleCheckModal();
    setOpenModal(false);
    setAttendanceData({ idx: 0, status: "" });
  }

  return (
    <ModalWrapper>
      <BasicSingleModal buttonName="확인" handleClickSingleButton={handleModalApprove} isFuture>
        <CancleImpossibleTitle>
          앞선 회차의 출결 체크를
          <br />
          완료해주세요
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
