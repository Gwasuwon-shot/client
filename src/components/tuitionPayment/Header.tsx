import {
  accountNumber,
  bankName,
  moneyAmount,
  payingPersonName,
  paymentOrder,
} from "../../atom/tuitionPayment/tuitionPayment";

import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { RegisterLessonHeaderIc } from "../../assets";
import ProgressBar from "../common/ProgressBar";

export default function Header() {
  const setPersonName = useSetRecoilState<string>(payingPersonName);
  const setAccountNum = useSetRecoilState<string>(accountNumber);
  const setBank = useSetRecoilState<string>(bankName);
  const setMoney = useSetRecoilState<number>(moneyAmount);
  const setOrder = useSetRecoilState<string>(paymentOrder);

  const navigate = useNavigate();

  function handleMoveToBack() {
    setPersonName("");
    setAccountNum("");
    setBank("");
    setMoney(0);
    setOrder("");
    navigate(-1);
  }

  return (
    <HeaderWrapper>
      <RegisterLessonHeaderIc onClick={handleMoveToBack} />
      <ProgressBar progress={83} />
      <PaymentHeader>
        수업비 입금에 대한 <br /> 정보를 입력해주세요
      </PaymentHeader>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;

  margin-top: 2rem;
  margin-bottom: 2.2rem;
`;

const PaymentHeader = styled.h1`
  display: flex;

  margin-top: 2.2rem;
  margin-left: 1.6rem;

  ${({ theme }) => theme.fonts.title01};
  color: ${({ theme }) => theme.colors.grey900};
`;
