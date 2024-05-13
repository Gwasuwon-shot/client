import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";
import { lessonCodeAndPaymentId } from "../../atom/tuitionPayment/tuitionPayment";
import RoundBottomMiniButton from "../common/RoundBottomMiniButton";
import ToastModal from "../common/ToastModal";

interface PrepaymentModalProp {
  setPreyPaymentModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PrepaymentModal(props: PrepaymentModalProp) {
  const { setPreyPaymentModal } = props;
  const navigate = useNavigate();

  const codeAndId = useRecoilValue(lessonCodeAndPaymentId);

  function handleMoveToRegisterPayment() {
    setPreyPaymentModal(false);

    if (codeAndId) {
      navigate(`/register-payment/${codeAndId?.lessonidx}`, {
        state: { paymentIdx: codeAndId?.paymentRecordIdx, count: 1 },
      });
    }
  }

  function handleCloseModal() {
    setPreyPaymentModal(false);
  }

  return (
    <ToastModal>
      <PrepaymentTitle>선불 수업비를 받으셨나요?</PrepaymentTitle>
      <PrepaymentSub>수업비 입금 정보를 입력해주세요! </PrepaymentSub>
      <ButtonWrapper>
        <RoundBottomMiniButton isGreen={false} onClick={handleCloseModal}>
          다음에 입력할게요
        </RoundBottomMiniButton>
        <RoundBottomMiniButton isGreen={true} onClick={handleMoveToRegisterPayment}>
          입력하러 가기
        </RoundBottomMiniButton>
      </ButtonWrapper>
    </ToastModal>
  );
}

const PrepaymentTitle = styled.h1`
  margin-top: 5rem;
  ${({ theme }) => theme.fonts.title02}
`;

const PrepaymentSub = styled.h2`
  margin-top: 1.6rem;
  ${({ theme }) => theme.fonts.body02}
`;

const ButtonWrapper = styled.section`
  display: flex;
  justify-content: space-between;

  width: 29rem;

  margin-top: 4rem;
`;
