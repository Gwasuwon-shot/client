import { useNavigate } from "react-router-dom";
import { accountNumber, bankName, moneyAmount, paymentOrder } from "../../atom/tuitionPayment/tuitionPayment";

import { useRecoilValue } from "recoil";
import styled from "styled-components";

interface scheduleListProps {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
}

export default function Footer() {
  const navigate = useNavigate();
  const payment = useRecoilValue<string>(paymentOrder);
  const amount = useRecoilValue<number>(moneyAmount);
  const bank = useRecoilValue(bankName);
  const number = useRecoilValue(accountNumber);

  const isFooterGreen = number !== "" && bank !== "" && amount !== 0 && payment !== "";

  return (
    <FooterWrapper>
      <FooterButtonWrapper $isFooterGreen={isFooterGreen} onClick={() => navigate("/lesson-connect")}>
        <FooterButton $isFooterGreen={isFooterGreen}> 다음 </FooterButton>
      </FooterButtonWrapper>
    </FooterWrapper>
  );
}

interface isFooterGreenProps {
  $isFooterGreen: boolean;
}

const FooterWrapper = styled.div`
  height: 9rem;
`;

const FooterButtonWrapper = styled.footer<isFooterGreenProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: fixed;
  bottom: 0;

  width: 32rem;
  height: 6.3rem;
  padding: 0.8rem;

  ${({ theme, $isFooterGreen }) =>
    $isFooterGreen ? `background-color: ${theme.colors.green5};` : `background-color: ${theme.colors.grey50};`}
`;

const FooterButton = styled.button<isFooterGreenProps>`
  display: flex;

  ${({ theme }) => theme.fonts.body02};
  ${({ theme, $isFooterGreen }) =>
    $isFooterGreen ? `color: ${theme.colors.grey0};` : `color: ${theme.colors.grey200};`}
`;
