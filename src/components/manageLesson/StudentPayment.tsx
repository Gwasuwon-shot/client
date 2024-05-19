import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import {
  GreyFruitPaymentIc,
  RedFruitPaymentIc,
  RegisterPaymentManageLessonIc,
  SendPaymentAlarmManageLessonIc,
} from "../../assets";
import useModal from "../../hooks/useModal";

interface StudentPaymentProps {
  idx: number;
  date: string;
  amount: number;
  status: boolean;
  count: number;
  setPayMentAlarmOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function StudentPayment(props: StudentPaymentProps) {
  const { idx, date, amount, status, count, setPayMentAlarmOpen } = props;
  const { showModal } = useModal();
  const navigate = useNavigate();
  const { manageLessonId } = useParams();

  function handleMoveToRegisterPayment() {
    navigate(`/register-payment/${manageLessonId}`, { state: { paymentIdx: idx, count: count } });
  }

  function handleShowDoubleCheckModal() {
    setPayMentAlarmOpen(true);
    showModal();
  }

  return (
    <StudentPaymentBox>
      {status ? <RedFruitPaymentIcon /> : <GreyFruitPaymentIcon />}
      <NumberWrapper>
        <FruitCount>{count}번째 결실</FruitCount>
        <Date>
          {new window.Date(date).getMonth() + 1}월 {new window.Date(date).getDate()}일
        </Date>
      </NumberWrapper>
      <Payment>
        {status ? (
          <Amount>{amount.toLocaleString()}</Amount>
        ) : (
          <>
            <SendPaymentAlarmManageLessonIcon onClick={handleShowDoubleCheckModal} />
            <RegisterPaymentManageLessonIcon onClick={handleMoveToRegisterPayment} />
          </>
        )}
      </Payment>
    </StudentPaymentBox>
  );
}

const RedFruitPaymentIcon = styled(RedFruitPaymentIc)`
  width: 4.4rem;
`;

const GreyFruitPaymentIcon = styled(GreyFruitPaymentIc)`
  width: 4.4rem;
`;

const Payment = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 15rem;
  padding-right: 0.5rem;
`;

const NumberWrapper = styled.div`
  margin-left: 1.6rem;
`;

const StudentPaymentBox = styled.article`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 29.2rem;
  padding: 0.8rem 0 0.8rem 0.6rem;
  margin-bottom: 2rem;
`;

const Date = styled.p`
  color: ${({ theme }) => theme.colors.grey600};
  ${({ theme }) => theme.fonts.body05};
`;

const FruitCount = styled.p`
  margin-bottom: 0.2rem;

  color: ${({ theme }) => theme.colors.grey900};
  ${({ theme }) => theme.fonts.body02};
`;

const SendPaymentAlarmManageLessonIcon = styled(SendPaymentAlarmManageLessonIc)`
  width: 5.5rem;
  height: 2.9rem;
  margin-right: 1rem;

  cursor: pointer;
`;

const RegisterPaymentManageLessonIcon = styled(RegisterPaymentManageLessonIc)`
  width: 5.5rem;
  height: 2.9rem;
  cursor: pointer;
`;

const Amount = styled.p`
  color: ${({ theme }) => theme.colors.grey600};
  ${({ theme }) => theme.fonts.body01};
`;
